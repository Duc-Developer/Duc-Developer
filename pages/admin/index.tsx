import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import ReCAPTCHA from "react-google-recaptcha";
import { useMutation, useQuery } from '@tanstack/react-query';

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
import { getInfo, requestConsentPage, verifyCaptcha } from '@/services/admin';
import { CONTACTS, POST_STATUS } from '@/constants';
import Autocomplete from '@/components/common/input/autocomplete';
import PostList from '@/components/admin/post-list';
import { IoIosCreate } from "react-icons/io";

import { ResponseData as PostResponses } from "@/pages/api/posts";
import { ResponseData as InfoResponse } from "@/pages/api/admin/info";
import { ResponseData as InsertPostResponses } from "@/pages/api/posts/insert";
import { ResponseData as UpdatePostResponses } from "@/pages/api/posts/update";
import { ResponseData as PublishPostResponses } from "@/pages/api/posts/publish";
import PostContent from '@/components/blogs/post-content';
import CustomModal from '@/components/common/modal';
import { SlugConverter } from '@/utilities';
type WriterResponse = InsertPostResponses | UpdatePostResponses | PublishPostResponses;
type WriterVariables = blogger_v3.Schema$Post & { mode: 'INSERT' | 'UPDATE' | 'PUBLISH' };

const reCaptchaKey = process.env.GOOGLE_RE_CAPTCHA_KEY ?? '';
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
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const editorRef = useRef<any>(null);
    const [reCaptchaToken, setReCaptchaToken] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const labelOptions = (posts: blogger_v3.Schema$Post[]) => {
        const results: string[] = [];
        posts.forEach(post => {
            if (post.labels) {
                results.push(...post.labels);
            }
        });
        return results.filter((value, index, self) => self.indexOf(value) === index);
    };

    /** check token info */
    const { data: tokenInfo, isFetched: fetchedTokenInfo } = useQuery<InfoResponse>({
        queryKey: ['token_info'],
        queryFn: getInfo,
        enabled: typeof window !== 'undefined' && !!localStorage.getItem('access_token'),
    });

    useEffect(() => {
        if (tokenInfo?.data?.expiry_date > new Date().getTime()) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [fetchedTokenInfo]);

    const handleLogin = async () => {
        try {
            if (!reCaptchaToken) {
                alert('Please verify reCAPTCHA');
                return;
            }
            const { success } = await verifyCaptcha(reCaptchaToken);
            if (!success) throw new Error('Failed to verify reCAPTCHA');
            const { url } = await requestConsentPage();
            if (url) {
                window.open(url, '_self');
            } else {
                throw new Error('Failed to login');
            }
        } catch (error) {
            setIsAuthenticated(false);
            showToast({ message: 'Failed to login', status: 'error' });
        }
    };

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
        return <div className='w-full h-full flex justify-center items-center'>
            <div className='w-96 h-fit min-w-fit p-6 bg-astronaut-gradient rounded'>
                <h4 className='text-neutral text-center text-nowrap'>Tính năng này chỉ dành cho nhà phát triển</h4>
                <h6 className='text-neutral text-center'>Nếu bạn cần truy cập, vui lòng liên hệ với tôi</h6>
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
                                <Icon className="h-6 w-6 text-white fill-current hover:fill-purple" />
                            </Link>
                        })}
                </div>
                <Button className='bg-purple mt-8 w-fit gap-2 items-center mx-auto flex' onClick={handleLogin}>
                    <FcGoogle size={32} />  <p className='text-nowrap'>Đăng nhập</p>
                </Button>
            </div>
            <ReCAPTCHA
                sitekey={reCaptchaKey}
                onChange={handleReCaptchaChange}
                className='fixed bottom-2 right-2'
            />
        </div>;
    }

    return <div className='p-4 w-full h-full flex gap-4 text-darkNeutral'>
        <div className='grow flex flex-col gap-4 mt-4' style={{ maxWidth: '74%' }}>
            <Input value={form.title} placeholder='Title' className='w-full' onChange={handleChangeTitle} />
            <RichEditor editorRef={editorRef} onChange={handleChangeEditor} />
        </div>
        <div className='basis-3/12 flex flex-col gap-4 items-center bg-neutral rounded p-4'>
            <div className='w-full flex items-center justify-center flex-wrap gap-4'>
                <Button
                    className='bg-green5 text-darkNeutral w-32 flex gap-2 items-center justify-center'
                    onClick={() => {
                        setForm(initialForm);
                        editorRef.current?.setData('');
                    }}
                >
                    <IoIosCreate color='#000' />New
                </Button>
                <Button
                    className='bg-yellow text-darkNeutral w-32 flex gap-2 items-center justify-center'
                    onClick={() => setIsModalOpen(true)}
                    disabled={!form.title}
                >
                    <IoEyeSharp color='#000' />Preview
                </Button>
                <Button
                    className='bg-darkNeutral text-neutral w-32 flex gap-2 items-center justify-center'
                    onClick={() => writer.mutate({ ...form, mode: form?.id ? 'UPDATE' : 'INSERT' })}
                    disabled={!form.title || form?.status === 'LIVE'}
                >
                    <FaCloudArrowUp color='#fff' />Draft
                </Button>
                <Button
                    className='bg-purple basis-full flex gap-2 items-center justify-center'
                    onClick={() => writer.mutate({ ...form, mode: form?.status === 'LIVE' ? 'UPDATE' : 'PUBLISH' })}
                    disabled={!form.title}
                >
                    <FaRegSave color='#fff' />Submit
                </Button>
            </div>
            {
                fetchingPosts ? <p>Loading...</p> : <div className='w-full h-[300px] overflow-auto'>
                    <PostList
                        data={allPosts}
                        onEdit={(post) => {
                            if (!post) return;
                            setForm(post);
                            editorRef.current?.setData(post.content ?? '');
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
            <hr className='w-full border border-gray-300' />
            <Autocomplete
                placeholder='Add labels...'
                suggestions={labelOptions(allPosts)}
                onSelected={(values) => setForm({ ...form, labels: values })}
            />
        </div>
        <CustomModal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            overlayClassName='bg-darkNeutral p-4 z-[1000] fixed top-0 left-0 w-screen h-screen'
        >
            <PostContent data={form} isPreview />
        </CustomModal>
    </div>;
}

export default Admin;