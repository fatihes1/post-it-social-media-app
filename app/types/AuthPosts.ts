export type AuthPostsType = {
    email: string;
    id: string;
    name: string;
    image: string;
    posts: {
        id: string;
        createdAt: string;
        updatedAt: string;
        title: string;
        comments?: {
            id: string;
            createdAt: string;
            updatedAt: string;
            postId: string;
            userId: string;
        }[]
    }[],

}