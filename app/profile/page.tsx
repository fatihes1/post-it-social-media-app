
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import {redirect} from "next/navigation";
import MyPosts from "@/app/profile/MyPosts";

const Profile = async () => {
    const session = await getServerSession(authOptions);
    console.log(session);
    if(!(session)) {
        redirect("/api/auth/signin");
    }
    return (
        <main>
            <h1 className="text-2xl font-bold">Welcome back {session?.user?.name} </h1>
            <MyPosts />
        </main>
    )
}

export default Profile