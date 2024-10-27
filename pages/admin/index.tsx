import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';

import { showToast } from '@/components/common/toast';
const RichEditor = dynamic(() => import('@/components/rich-editor'), { ssr: false });

import Input from '@/components/common/input/input';
import Button from '@/components/common/button';
import { IoEyeSharp } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaRegSave } from "react-icons/fa";
import { FaCloudArrowUp } from "react-icons/fa6";

import { ClassicEditor, EventInfo } from 'ckeditor5';
import { insertPost, publishPost, searchPosts, updatePost } from '@/services/posts';
import { blogger_v3 } from 'googleapis';
import { getInfo, loginWithGoogleConsent } from '@/services/admin';
import { CONTACTS, POST_STATUS } from '@/constants';
import Autocomplete from '@/components/common/input/autocomplete';
import PostList from '@/components/admin/post-list';
import { IoIosCreate } from "react-icons/io";
import { FaListAlt } from "react-icons/fa";

import Drawer from '@/components/common/drawer';
import PostContent from '@/components/blogs/post-content';
import CustomModal from '@/components/common/modal';
import Turnstile from '@/components/turnstile';

import { SlugConverter } from '@/utilities';
import { getCategories } from '@/services/categories';
import { useTranslation } from '@/hooks/useTranslation';

import { ResponseData as PostResponses } from "@/pages/api/posts";
import { ResponseData as InfoResponse } from "@/pages/api/admin/info";
import { ResponseData as InsertPostResponses } from "@/pages/api/posts/insert";
import { ResponseData as UpdatePostResponses } from "@/pages/api/posts/update";
import { ResponseData as PublishPostResponses } from "@/pages/api/posts/publish";

type WriterResponse = InsertPostResponses | UpdatePostResponses | PublishPostResponses;
type WriterVariables = blogger_v3.Schema$Post & { mode: 'INSERT' | 'UPDATE' | 'PUBLISH' };

const reCaptchaKey = process.env.CLOUDFLARE_RE_CAPTCHA_KEY ?? '';
const authorId = process.env.AUTHOR_ID ?? '';
const initialForm: blogger_v3.Schema$Post = {
    title: '',
    content: '',
    labels: [],
    author: {
        id: authorId,
    },
};
const Admin = () => {
    const { t: adminTrans } = useTranslation('admin');
    const { t: commonTrans } = useTranslation('common');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const editorRef = useRef<any>(null);
    const [reCaptchaToken, setReCaptchaToken] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const [form, setForm] = useState<blogger_v3.Schema$Post>(initialForm);

    let mounted = true;
    useEffect(() => {
        return () => {
            mounted = false;
        };
    }, []);

    /** get all post and calculate label */
    const {
        data: postResponses,
        error: errorFetchPosts,
        isFetching: fetchingPosts,
        refetch: refetchPosts
    } = useQuery<PostResponses>({
        queryKey: ['posts'],
        queryFn: () => searchPosts({
            fetchImages: true,
            fetchBodies: true,
            view: 'ADMIN',
            maxResults: 500,
            status: ['LIVE', 'DRAFT'],
        }),
        enabled: isAuthenticated,
    });
    useEffect(() => {
        if (errorFetchPosts) {
            showToast({ message: 'Failed to fetch posts', status: 'error' });
        }
    }, [errorFetchPosts]);
    const allPosts = postResponses?.posts ?? [];

    const { data: categories = [] } = useQuery<string[]>({
        queryKey: ['categories'],
        queryFn: async () => {
            const data = await getCategories();
            return data.data?.map(category => category.value) ?? [];
        },
        enabled: isAuthenticated,
    });

    /** check token info */
    const { data: tokenInfo, isFetched: fetchedTokenInfo } = useQuery<InfoResponse>({
        queryKey: ['token_info'],
        queryFn: getInfo,
        enabled: typeof window !== 'undefined' && !!localStorage.getItem('access_token'),
    });

    useEffect(() => {
        const { expiry_date } = tokenInfo?.data ?? {};
        setIsAuthenticated(expiry_date > new Date().getTime());
    }, [fetchedTokenInfo]);

    const authenticatorOptions: UseMutationOptions<
        { success: boolean; url: string; message: string },
        Error,
        { captcha?: string | null }
    > = {
        mutationFn: loginWithGoogleConsent,
        onSuccess: (data) => {
            const { url, success } = data ?? {};
            if (!success) return;
            window.open(url, '_self');
        },
        onError: (error) => {
            showToast({ message: error?.message ?? 'Failed to login', status: 'error' });
        },
    };
    const authenticator = useMutation(authenticatorOptions);

    const handleChangeEditor = (event: EventInfo<string, unknown>, editor: ClassicEditor) => {
        const data = editor.getData();
        setForm((prevForm) => ({
            ...prevForm,
            content: data,
        }));
    };

    const handleChangeTitle = (text: string) => setForm({ ...form, title: text });


    const writer = useMutation<WriterResponse, Error, WriterVariables>(
        {
            mutationFn: async (variables) => {
                const mode = variables.mode;
                const body = { ...variables, updated: new Date().toISOString() };
                let request = insertPost;
                if (mode === 'PUBLISH') {
                    request = publishPost;
                    body.status = 'LIVE';
                } else if (mode === 'UPDATE') {
                    request = updatePost;
                }
                const data = await request(body);
                return data;
            },
            onSuccess: ({ data }) => {
                const message = data?.title ?? 'This post';
                const dataStatus = data?.status;
                if (dataStatus === 'LIVE') {
                    refetchPosts({ cancelRefetch: !mounted });
                }
                showToast({ message: message, status: 'success' });
            },
            onError: () => {
                showToast({ message: 'Failed to draft', status: 'error' });
            },
        }
    );

    const handleReCaptchaChange = (token: string | null) => {
        setReCaptchaToken(token);
    };

    if (!isAuthenticated) {
        return <>
            <Turnstile siteKey={reCaptchaKey} onVerify={handleReCaptchaChange} />
            <div className='w-full h-full flex justify-center items-center'>
                <div className='w-96 h-fit min-w-fit p-6 bg-astronaut-gradient rounded'>
                    <h4 className='text-white100 text-center text-nowrap'>{adminTrans('login_title')}</h4>
                    <h6 className='text-white100 text-center'>{adminTrans('login_description')}</h6>
                    <div className="flex mt-2 gap-4 items-center justify-center">
                        {CONTACTS
                            .map(({ link, name, icon: Icon }) => {
                                return <Link
                                    href={link}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    key={name}
                                    className="hover:scale-110 transition"
                                >
                                    <Icon className="h-6 w-6 text-white fill-current hover:fill-accent100" />
                                </Link>
                            })}
                    </div>
                    <Button
                        className='bg-black100 mt-8 w-fit gap-2 items-center mx-auto flex'
                        disabled={authenticator?.isPending}
                        onClick={() => {
                            authenticator.mutate({ captcha: reCaptchaToken });
                        }}>
                        <FcGoogle size={32} />  <p className='text-nowrap'>{commonTrans('sign_in_with', { platform: 'Google' })}</p>
                    </Button>
                </div>
            </div>
        </>;
    }

    return <>
        <div className='p-4 w-full h-full flex gap-4 text-black100'>
            <div className='grow flex flex-col gap-4 mt-4' style={{ maxWidth: '74%' }}>
                <div className='flex gap-4'>
                    <Input value={form.title} placeholder='Title' className='grow' onChange={handleChangeTitle} />
                    <Button
                        className='bg-primary100 w-fit flex gap-2 items-center justify-center'
                        onClick={() => setDrawerOpen(!drawerOpen)}
                    >
                        <FaListAlt color='#fff' size={28} />
                    </Button>
                </div>
                <RichEditor editorRef={editorRef} onChange={handleChangeEditor} />
            </div>
            <div className='basis-3/12 flex flex-col gap-4 items-center bg-white100 rounded p-4'>
                <div className='w-full flex items-center justify-center flex-wrap gap-4'>
                    <Button
                        className='bg-green200 text-black100 w-32 flex gap-2 items-center justify-center'
                        onClick={() => {
                            setForm(initialForm);
                            editorRef.current?.setData('');
                        }}
                    >
                        <IoIosCreate color='#000' />New
                    </Button>
                    <Button
                        className='bg-yellow text-black100 w-32 flex gap-2 items-center justify-center'
                        onClick={() => setIsModalOpen(true)}
                        disabled={!form.title}
                    >
                        <IoEyeSharp color='#000' />Preview
                    </Button>
                    <Button
                        className='bg-black100 text-white100 w-32 flex gap-2 items-center justify-center'
                        onClick={() => writer.mutate({ ...form, mode: form?.id ? 'UPDATE' : 'INSERT' })}
                        disabled={!form.title || form?.status === 'LIVE'}
                    >
                        <FaCloudArrowUp color='#fff' />Draft
                    </Button>
                    <Button
                        className='bg-primary100 basis-full flex gap-2 items-center justify-center'
                        onClick={() => writer.mutate({ ...form, mode: form?.status === 'LIVE' ? 'UPDATE' : 'PUBLISH' })}
                        disabled={!form.title}
                    >
                        <FaRegSave color='#fff' />Submit
                    </Button>
                </div>
                <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)}>
                    {
                        fetchingPosts
                            ? <p>Loading...</p>
                            : <div className='w-full h-[calc(100vh_-_8rem)] overflow-auto'>
                                <PostList
                                    data={allPosts}
                                    onEdit={(post) => {
                                        if (!post) return;
                                        setForm(post);
                                        editorRef.current?.setData(post.content ?? '');
                                        setDrawerOpen(false);
                                    }}
                                    onView={(post) => {
                                        if (!post) return;
                                        const slug = SlugConverter.toPostSlug(post.url);
                                        if (slug && post?.status === POST_STATUS.LIVE) {
                                            window.open(`${process.env.DOMAIN}/blogs/${slug}`, '_blank');
                                        } else if (post.url) {
                                            showToast({ message: 'This post is not live yet', status: 'warning' });
                                        }
                                    }}
                                />
                            </div>
                    }
                </Drawer>
                <hr className='w-full border border-gray-300' />
                <Autocomplete
                    placeholder='Add labels...'
                    suggestions={categories}
                    onSelected={(values) => setForm({ ...form, labels: values })}
                    defaultValue={form.labels}
                />
            </div>
            <CustomModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                overlayClassName='bg-black100 p-4 z-[1000] fixed top-0 left-0 w-screen h-screen'
            >
                <PostContent data={form} isPreview />
            </CustomModal>
        </div>
    </>;
}

export default Admin;