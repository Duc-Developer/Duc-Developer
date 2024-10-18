
import React from 'react'
import Image from 'next/image';
import { blogger_v3 } from 'googleapis'

import { classNames } from '@/lib/utils';

import { FaEdit, FaEye } from "react-icons/fa";

import { IMAGE_SRC_DEFAULT, POST_STATUS, PostStatus } from '@/constants';

const Tag = ({ status, className }: { status?: PostStatus | string | null; className?: string; }) => {
    switch (status) {
        case POST_STATUS.DRAFT:
            return <p className={classNames("text-xs bg-neutral5", className)}>Draft</p>;
        case POST_STATUS.LIVE:
            return <p className={classNames("text-xs bg-green5", className)}>Live</p>;
        case POST_STATUS.SOFT_TRASHED:
            return <p className={classNames("text-xs bg-red5", className)}>Trashed</p>;
        case POST_STATUS.SCHEDULE:
            return <p className={classNames("text-xs bg-blue", className)}>Scheduled</p>;
        default:
            return <p className={classNames("text-xs text-neutral bg-darkNeutral", className)}>Unknown</p>;
    }
};

type Props = {
    data: blogger_v3.Schema$Post[];
    className?: string;
    onEdit?: (post?: blogger_v3.Schema$Post) => void;
    onView?: (post?: blogger_v3.Schema$Post) => void;
};
const PostList = ({ data, className, onEdit, onView }: Props) => {
    return (
        <div className={classNames("flex flex-col", className)}>
            {data.map((post) => (
                <div
                    key={post.id}
                    className="relative flex mb-4 p-4 border rounded shadow items-center gap-2 cursor-pointer group"
                >
                    <Tag status={post.status} className='absolute top-1 left-1 px-2 py-1' />
                    <div className='min-w-24 min-h-16 basis-1/4'>
                        <Image
                            src={post.images?.[0]?.url as string}
                            overrideSrc={IMAGE_SRC_DEFAULT}
                            alt={post.title ?? 'Post Image'}
                            className="mb-2"
                            width={120}
                            height={60}
                        />
                    </div>
                    <p className="text-sm font-bold mb-2 grow">{post.title}</p>
                    <div className={classNames(
                        "absolute inset-0 bg-darkNeutral bg-opacity-50",
                        "flex items-center justify-center gap-2",
                        "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    )}>
                        <button
                            className="bg-blue-500 text-neutral px-4 py-2 rounded active:scale-90"
                            onClick={() => onEdit && onEdit(post)}
                        >
                            <FaEdit size={24} color='#ffffff' />
                        </button>
                        <button
                            className="bg-green-500 text-neutral px-4 py-2 rounded active:scale-90"
                            onClick={() => onView && onView(post)}
                        >
                            <FaEye size={24} color='#ffffff' />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PostList