
import React from 'react'
import Image from 'next/image';
import { classNames } from '@/lib/utils';
import { blogger_v3 } from 'googleapis'

type Props = { data: blogger_v3.Schema$Post[]; className?: string; onEdit?: (post?: blogger_v3.Schema$Post) => void };
const PostList = ({ data, className, onEdit }: Props) => {
    return (
        <div className={classNames("flex flex-col", className)}>
            {data.map((post) => (
                <div
                    key={post.id}
                    className="flex mb-4 p-4 border rounded shadow items-center gap-2 cursor-pointer"
                    onClick={() => {
                        onEdit && onEdit(post);
                    }}>
                    {post.images && post.images.length > 0 && (
                        <div>
                            <Image
                                src={post.images?.[0]?.url as string}
                                alt={post.title ?? 'Post Image'}
                                className="mb-2"
                                width={160}
                                height={40}
                            />
                        </div>
                    )}
                    <p className="text-sm font-bold mb-2 grow">{post.title}</p>
                </div>
            ))}
        </div>
    )
}

export default PostList