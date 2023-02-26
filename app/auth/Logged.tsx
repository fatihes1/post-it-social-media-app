'use client'
import Image from "next/image";
import { signOut } from "next-auth/react";
import Link from "next/link";

type User = {
    image: string;
}

const Logged = ({image}: User) => {
    const signOutClickHandler = async () => {
        await signOut();
    };
    return (
        <li className="flex gap-8 items-center">
            <button onClick={signOutClickHandler} className="bg-gray-700 text-white text-sm py-2 px-6 rounded-lg">Sign Out</button>
            <Link href={'/profile'}>
                <Image width={62} height={62} src={image} alt={'Profile'} className={'rounded-full cursor-pointer'} />
            </Link>
        </li>
    )
};

export default Logged;