import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import ReCAPTCHA from "react-google-recaptcha";

import { showToast } from '@/components/common/toast';
const RichEditor = dynamic(() => import('@/components/rich-editor'), { ssr: false });

import Input from '@/components/common/input/input';
import Button from '@/components/common/button';
import { IoEyeSharp } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaRegSave } from "react-icons/fa";
import { FaCloudArrowUp } from "react-icons/fa6";

import { ClassicEditor, EventInfo } from 'ckeditor5';
import { insertPost, searchPosts } from '@/services/posts';
import { blogger_v3 } from 'googleapis';
import { getInfo, requestConsentPage, verifyCaptcha } from '@/services/admin';
import { CONTACTS } from '@/constants';
import Autocomplete from '@/components/common/input/autocomplete';
import PostList from '@/components/admin/post-list';

const reCaptchaKey = process.env.GOOGLE_RE_CAPTCHA_KEY ?? '';
const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [allPosts, setAllPosts] = useState<blogger_v3.Schema$Post[]>([]);
    const editorRef = useRef<any>(null);
    const [reCaptchaToken, setReCaptchaToken] = useState<string | null>(null);

    const [form, setForm] = useState<blogger_v3.Schema$Post>({
        title: '',
        content: '',
        labels: []
    });

    const labelOptions = (posts: blogger_v3.Schema$Post[]) => {

        const results: string[] = [];
        posts.forEach(post => {
            if (post.labels) {
                results.push(...post.labels);
            }
        });
        return results.filter((value, index, self) => self.indexOf(value) === index);
    };

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const data = await searchPosts({
                fetchImages: true,
                fetchBodies: true,
                view: 'READER',
                maxResults: 500,
            });
            setAllPosts(data.posts ?? []);
        } catch (error) {
            showToast({ message: 'Failed to fetch posts', status: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const fetchInfo = async () => {
        try {
            const data = await getInfo();
            if (data?.data?.expiry_date > new Date().getTime()) {
                setIsAuthenticated(true);
            } else {
                throw new Error('Access token expired');
            }
        } catch (error) {
            setIsAuthenticated(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) fetchInfo();
    }, []);

    useEffect(() => {
        if (!isAuthenticated) return;
        fetchPosts();
    }, [isAuthenticated]);

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

    const handleSubmit = async () => {
        try {
            const data = await insertPost(form);
            showToast({ message: `drafted ${data.title}`, status: 'success' });
        } catch (error) {
            showToast({ message: 'Failed to submit', status: 'error' });
        }
    };

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
        <div className='grow flex flex-col gap-4 mt-4' style={{ maxWidth: '82%' }}>
            <Input value={form.title} placeholder='Title' className='w-full' onChange={handleChangeTitle} />
            <RichEditor editorRef={editorRef} onChange={handleChangeEditor} />
        </div>
        <div className='basis-2/12 flex flex-col gap-4 items-center bg-neutral rounded p-4'>
            <div className='w-full flex items-center justify-center flex-wrap gap-4'>
                <Button className='bg-yellow text-darkNeutral w-32 flex gap-2 items-center justify-center' onClick={console.log}>
                    <IoEyeSharp color='#000' />Preview
                </Button>
                <Button className='bg-purple w-32 flex gap-2 items-center justify-center' onClick={console.log}>
                    <FaCloudArrowUp color='#fff' />Save
                </Button>
                <Button className='bg-purple basis-full flex gap-2 items-center justify-center' onClick={handleSubmit}>
                    <FaRegSave color='#fff' />Submit
                </Button>
            </div>
            <Autocomplete
                placeholder='Add labels...'
                suggestions={labelOptions(allPosts)}
                onSelected={(values) => setForm({ ...form, labels: values })}
            />
            <hr className='w-full border border-gray-300' />
            {
                loading ? <p>Loading...</p> : <div className='w-full h-[300px] overflow-auto'>
                    <PostList data={allPosts} onEdit={(post) => {
                        if (!post) return;
                        setForm(post);
                        editorRef.current?.setData(post.content ?? '');
                    }} />
                </div>
            }
        </div>
    </div>;
}

export default Admin;