import {NextApiRequest, NextApiResponse} from 'next';

import {getServerSession} from "next-auth/next";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import prisma from '../../../prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'DELETE') {
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
            res.status(401).json({message: 'Please sign in .'});
        }
        try {
            const postId = req.body;
            const result = await prisma.post.delete({
                where: {
                    id: postId
                },
            })
            res.status(200).json(result);
        } catch (err) {
            res.status(403).json({message: 'Something went wrong.'});
        }

    }
}
