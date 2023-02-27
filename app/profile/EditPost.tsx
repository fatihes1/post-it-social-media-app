'use client'

import Image from "next/image";
import React, {useState} from "react";
import Toggle from "@/app/profile/Toggle";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

type EditPostProps = {
    id: string;
    avatar: string;
    name: string;
    title: string;
    comments?: {
        id: string;
        postId: string;
        userId: string;
    }[]
};

const EditPost = ({avatar, name, title, comments, id}: EditPostProps) => {
    const [toggle, setToggle] = useState(false);

    let deleteToastId: string;
    const queryClient = useQueryClient();
    const { mutate } = useMutation(
        async (id: string) => await axios.delete('/api/posts/deletePost/', {data: id}),
        {
            onError: (error) => {
                toast.error('Error deleting post!', { id: deleteToastId });
            },
            onSuccess: (data) => {
                toast.success('Post has been deleted!', { id: deleteToastId });
                queryClient.invalidateQueries(['auth-posts']);
            }

        }
    )
    const deletePostHandler = async () => {
        deleteToastId = toast.loading('Deleting post...', { id: deleteToastId });
        await mutate(id);
    };

    const deleteButtonHandler = () => {
        setToggle(true);
    };



    return (
        <React.Fragment>
            <div className="bg-white my-8 p-8 rounded-lg">
                <div className="flex gap-2 items-center">
                    <Image width={32} height={32} src={avatar} alt={'avatar'} className="rounded-full"/>
                    <h3 className="font-bold text-gray-700">{name}</h3>
                </div>
                <div className="my-8">
                    <p className="break-all">{title}</p>
                </div>
                <div className="flex items-center gap-4">
                    <p className="text-sm font-bold text-gray-700">{comments?.length} Comments</p>
                    <button onClick={deleteButtonHandler} className="text-sm font-bold text-red-500">Delete</button>
                </div>
            </div>
            {toggle && <Toggle onDeletePost={deletePostHandler} onToggle={setToggle}/>}
        </React.Fragment>
    )
};

export default EditPost;