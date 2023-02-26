export type PostType = {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    user: {
        name: string;
        image: string;
    }
    comments?: {
        id: string;
        createdAt: string;
        updatedAt: string;
        postId: string;
        userId: string;
    }[]
}