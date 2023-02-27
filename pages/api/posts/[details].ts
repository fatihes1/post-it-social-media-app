import prisma from "../../../prisma/client";
import {NextApiRequest, NextApiResponse} from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        try {
            const result = await prisma.post.findUnique({
                where: {
                    id: req.query.details as string,
                },
                include: {
                    user: true,
                    comments: {
                        orderBy: {
                            createdAt: 'desc',
                        },
                        include: {
                            user: true
                        }
                    },
                }
            })
            res.status(200).json(result);
        } catch (err) {
            res.status(403).json({message: 'Something went wrong.'});
        }

    }
}
