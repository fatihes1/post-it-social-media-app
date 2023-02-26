'use client'
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthPostsType } from "@/app/types/AuthPosts";
import EditPost from "@/app/profile/EditPost";
const fetchAuthPosts = async () => {
    const response = await axios.get("/api/posts/authPosts");
    return response.data;
};


const MyPosts = () => {
    const { data, isLoading } = useQuery<AuthPostsType>({
        queryFn: fetchAuthPosts,
        queryKey: ['auth-posts'],
    });

    if(isLoading) return (<div>Loading...</div>)
    // console.log(data);

    return (
        <div className="">
            {
                data && data?.posts?.map((post) => (
                    <EditPost key={post.id} id={post.id} avatar={data.image} name={data.name} title={post.title} comments={post.comments}  />
                ))
            }
        </div>
    )
};


export default MyPosts;