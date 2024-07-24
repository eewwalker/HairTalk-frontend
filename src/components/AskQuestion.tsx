"use client";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/toast";

export default function AskQuestion() {
const [user, setUser] = useState({});
const {data: session} = useSession();
const router = useRouter();
const { toast } = useToast()

    const handleSubmit = () => {
        if (session?.user) {
            setUser({
                id: session.user.id,
                username: session?.user?.username,
                location: session.user.location
            });
        } else {
            toast({
                description: "You must be logged in to ask a question."
              });
            router.push('/login');
        }
    }
    return (
        <Button
            className='bg-inherit text-[#f5f1ef] mb-3'
            variant="outline"
            onClick={handleSubmit}>
            ask question
        </Button>
    );
}