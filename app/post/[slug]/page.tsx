'use client'

import Post from '@/app/components/Post'
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {SinglePostType} from "@/app/types/SinglePost";
import AddComment from "@/app/components/AddComment";
import React from "react";
import Image from "next/image";

const fetchPostDetail = async (slug: string) => {
    const {data} = await axios.get(`/api/posts/${slug}`);
    return data;
};

type URL = {
    params: {
        slug: string
    }
}


const PostDetail = (url: URL) => {
    const {data, isLoading} = useQuery<SinglePostType>({
        queryFn: () => fetchPostDetail(url?.params.slug),
        queryKey: ['detail-post'],
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (data) {
        console.log(data)
    }

    return (
        <div>
            <Post id={data?.id || ''} name={data!.user.name} avatar={data!.user.image} postTitle={data!.title}
                  comments={data!.comments}/>
            <AddComment id={data?.id}/>
            {
                data?.comments.map((comment) => (
                    <div key={comment.id} className="my-6 bg-white p-8 rounded-md">
                        <div className="flex items-center gap-2">
                            <Image
                                width={24}
                                height={24}
                                src={comment.user?.image}
                                alt='avatar'
                                className={'rounded-full'}
                            />
                            <h3 className="font-bold">{comment?.user?.name}</h3>
                            <h2 className="text-sm">{comment.createdAt}</h2>
                        </div>
                        <div className={'py-4'}>
                            {comment.message}
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default PostDetail;