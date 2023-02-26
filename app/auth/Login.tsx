'use client'

import { signIn } from "next-auth/react";


export default function Login() {
    const signInClickHandler = async () => {
        await signIn();
    }
    return (
        <li className="list-none">
            <button className="text-sm bg-gray-700 text-white py-3 px-6 rounded-xl disabled:opacity-25" onClick={signInClickHandler}>
                Sign In
            </button>
        </li>
    )
}