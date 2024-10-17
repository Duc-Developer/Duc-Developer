import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import { showToast } from '@/components/common/toast';
const RichEditor = dynamic(() => import('@/components/rich-editor'), { ssr: false });

import Input from '@/components/common/input/input';
import Button from '@/components/common/button';
import { FcGoogle } from "react-icons/fc";

import { ClassicEditor, EventInfo } from 'ckeditor5';
import { insertPost } from '@/services/posts';
import { blogger_v3 } from 'googleapis';
import { requestConsentPage } from '@/services/admin';
import { CONTACTS } from '@/constants';

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const editorRef = useRef<any>(null);

    const [form, setForm] = useState<blogger_v3.Schema$Post>({
        title: '',
        content: ''
    });

    const handleLogin = async () => {
        try {
            const { url } = await requestConsentPage();
            if (url) {
                window.open(url, '_self');
            }
            setIsAuthenticated(true);
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
        </div>;
    }

    return <div className='p-4 h-full flex flex-col gap-4'>
        <Input placeholder='Title' className='w-full' onChange={handleChangeTitle} />
        <RichEditor ref={editorRef} onChange={handleChangeEditor} />
        <Button className='bg-purple w-28 mx-auto' onClick={handleSubmit}>Submit</Button>
    </div>;
}

export default Admin;