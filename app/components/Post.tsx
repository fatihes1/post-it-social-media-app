'use client'

import Image from "next/image";
import Link from "next/link";

interface PostProps {
    id: string;
    avatar: string;
    name: string;
    postTitle: string;
    comments: {
        id: string;
        message: string;
        postId: string;
        userId: string;
        createdAt: string;
        title: string;
        user: {
            id: string;
            name: string;
            image: string;
            email: string;
        }
    }[];
}


const Post = ({ id, avatar, name, postTitle, comments }: PostProps) => {
    return (
        <div className="bg-white my-8 p-8 rounded-lg">
            <div className="flex items-center gap-2">
                <Image
                    className="rounded-full"
                    width={32}
                    height={32}
                    src={avatar}
                    alt="avatar"
                />
                <h3 className="font-bold text-gray-700">{name}</h3>
            </div>
            <div className="my-8">
                <p className="break-alle">{postTitle}</p>
            </div>
            <div className="flex gap-4 cursor-pointer items-center">
               <Link href={`/post/${id}`}>
                   <p className="text-sm font-bold text-gray-700">{comments.length} Comments</p>
               </Link>
            </div>
        </div>
    )
};


export default Post;