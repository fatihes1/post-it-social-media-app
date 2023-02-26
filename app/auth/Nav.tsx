import Link from "next/link";
import Login from "@/app/auth/Login";
import Logged from "@/app/auth/Logged";
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

const Nav = async () => {
    const session = await getServerSession(authOptions);
    await console.log("In Nav", session);
    return (
        <nav className="flex justify-between items-center py-8">
            <Link href={'/'}>
                <h1 className="font-bold text-2xl">Send it.</h1>
            </Link>
            <ul className="flex items-center gap-6">
                {!session?.user && <Login />}
                {session?.user && <Logged image={session.user?.image ||''} />}
            </ul>
        </nav>
    )
};


export default Nav;