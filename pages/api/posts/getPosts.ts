import {NextApiRequest, NextApiResponse} from 'next';

import prisma from '../../../prisma/client'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        // FETCH ALL POSTS
        try {
            const result = await prisma.post.findMany({
                include: {
                    user: true,
                    comments: true
                },
                orderBy: {
                    createdAt: 'desc'
                },
            })

            res.status(200).json(result);
        } catch (err) {
            res.status(403).json({message: 'Something went wrong.'});
        }

    }
}
