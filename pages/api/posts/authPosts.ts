import {NextApiRequest, NextApiResponse} from 'next';

import {getServerSession} from "next-auth/next";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import prisma from '../../../prisma/client'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
            res.status(401).json({message: 'Please sign in .'});
        }

        try {
            const result = await prisma.user.findUnique(({
                where: {
                    email: session?.user?.email as string,
                },
                include: {
                    posts: {
                        orderBy: {
                            createdAt: 'desc',
                        },
                        include: {
                            comments: true
                        }
                    }
                }
            }))

            res.status(200).json(result);
        } catch (err) {
            res.status(403).json({message: 'Something went wrong.'});
        }

    }
}
