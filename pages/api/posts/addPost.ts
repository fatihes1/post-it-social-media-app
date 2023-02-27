import {NextApiRequest, NextApiResponse} from 'next';

import {getServerSession} from "next-auth/next";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import prisma from '../../../prisma/client'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
            res.status(401).json({message: 'Please sign in to add a post.'});
        }

        const title: string = req.body.title;

        // Get user
        const prismaUser = await prisma.user.findUnique({
            where: {
                email: session?.user?.email as string
            },
        });

        // Check Title
        if(title.length > 300) return res.status(403).json({message: 'Title is too long.'});
        if(title.length < 1) return res.status(403).json({message: 'Title is too short.'});

        // Create Post
        try {
            const result = await prisma.post.create({
                // @ts-ignore
                data: {
                    title,
                    userId: prismaUser?.id,
                },
            })

            res.status(200).json(result);
        } catch (err) {
            res.status(403).json({message: 'Something went wrong.'});
        }

    }
}
