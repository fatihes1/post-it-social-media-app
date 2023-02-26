'use client'


import React, {useState} from "react"
import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";
import toast from "react-hot-toast";


const CreatePost = () => {
    const [title, setTitle] = useState("")
    const [isDisabled, setIsDisabled] = useState(false)
    const queryClient = useQueryClient();

    let toastPostId: string;

    // Create a post
    const {mutate} = useMutation(
        async (title: string) => await axios.post('api/posts/addPost', {title}),
        {
            onError: (error) => {
                // console.log(error)
                if (error instanceof AxiosError) {
                    toast.error(error?.response?.data.message, {id: toastPostId});
                }
                setIsDisabled(false);
            },
            onSuccess: (data) => {
                // console.log(data)
                toast.success('Post created successfully.', {id: toastPostId});
                queryClient.invalidateQueries(['posts']).then(() => {
                    // console.log('Posts invalidated')
                });
                setTitle("");
                setIsDisabled(false);
            },
        });

    const submitPostHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        toastPostId = toast.loading('Creating your post...', {id: toastPostId});
        setIsDisabled(true);
        // @ts-ignore
        await mutate(title);

    };

    return (
        <form onSubmit={submitPostHandler} className="bg-white my-8 p-8 rounded-md ">
            <div className="flex flex-col my-4">
        <textarea
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            name="title"
            placeholder="What's on your mind?"
            className="p-4 text-lg rounded-md my-2  bg-gray-200"
        />
            </div>
            <div className=" flex items-center justify-between gap-2">
                <p
                    className={`font-bold text-sm ${
                        title.length > 300 ? "text-red-700" : "text-gray-700"
                    } `}
                >{`${title.length}/300`}</p>
                <button
                    disabled={isDisabled}
                    className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
                    type="submit"
                >
                    Create post
                </button>
            </div>
        </form>
    )
};

export default CreatePost;