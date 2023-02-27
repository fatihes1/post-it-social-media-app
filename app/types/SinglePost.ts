export type SinglePostType = {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    user: {
        id: string;
        name: string;
        email: string;
        image: string;
    },
    comments: {
        id: string;
        createdAt: string;
        updatedAt: string;
        postId: string;
        userId: string;
        title: string
        user: {
            id: string;
            name: string;
            email: string;
            image: string;
        }
    }[]
}