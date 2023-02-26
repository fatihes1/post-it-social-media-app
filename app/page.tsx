'use client'

import AddPost from "@/app/components/AddPost";
import axios from "axios";
import { useQuery } from '@tanstack/react-query'
import Post from "@/app/components/Post";
import {PostType} from "@/app/types/Post";
// Fetch all post
const allPosts = async () => {
    const response = await axios.get("/api/posts/getPosts")
    return response.data
}

export default function Home() {

    const { data, error, isLoading } = useQuery<PostType[]>({
            queryFn: allPosts,
            queryKey: ['posts']});

    if(error) return error
    if(isLoading) return 'Loading...'
    // if(data) console.log(data)


    // @ts-ignore
    return (
        <main>
            <AddPost />
            {
                data && data?.map((post) => (
                    <Post
                        key={post.id}
                        id={post.id}
                        name={post.user.name}
                        avatar={post.user.image}
                        postTitle={post.title}
                        // @ts-ignore
                        comments={post.comments}
                    />
                ))
            }
        </main>
    )
}
