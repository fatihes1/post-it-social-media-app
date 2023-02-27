'use client'

import React, {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";
import toast from "react-hot-toast";


type AddCommentProps = {
    id?: string;
}

type Comment = {
    postId?: string;
    title?: string;
}

const AddComment = ({id}: AddCommentProps) => {
    const [title, setTitle] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);

    const queryClient = useQueryClient();
    let commentToastId: string ;

    const { mutate } = useMutation(
        async (data: Comment) =>  axios.post('/api/posts/addComment', {data}),
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries(['detail-post']);
                setTitle('');
                toast.success('Comment added successfully!', {id: commentToastId});
                setIsDisabled(false);
            },
            onError: (error) => {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data.message, {id: commentToastId});
                }
                setIsDisabled(false);
            },
        }
    );

    const submitCommentHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsDisabled(true);
        commentToastId = toast.loading('Adding comment...', { id : commentToastId });
        mutate({title, postId: id});
    }


    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }
    return (
        <form onSubmit={submitCommentHandler} className="my-8">
            <h3>Add a comment</h3>
            <div className="flex flex-col my-2">
                <input
                    onChange={inputChangeHandler}
                    value={title}
                    type="text"
                    name={'title'}
                    className="p-4 text-lg rounded-md my-2"
                />
            </div>
            <div className="flex items-center gap-2">
                <button
                    disabled={isDisabled}
                    className="bg-teal-600 text-white text-sm font-bold py-2 px-4 rounded-xl"
                    type={'submit'}
                >
                    Add Comment
                </button>
                <p
                    className={`font-bold ${title.length > 300 ? 'text-red-700' : 'text-gray-700'}`}
                >
                    {`${title.length}/300`}
                </p>
            </div>
        </form>
    )
};


export default AddComment;