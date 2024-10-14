"use client";
import { Button } from "../../components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";


export default function AskQuestion() {
    const session = useSession();

    const router = useRouter();
    const { toast } = useToast();

    const handleSubmit = () => {
        if (session.data?.user) {
            router.push('/ask');
        } else {
            toast({
                description: "You must be logged in to ask a question."
            });
            router.push('/login');
        }
    };
    return (

        <Button
            className='w-full bg-inherit text-[#f5f1ef] border border-[#f5f1ef]'
            variant="outline"
            onClick={handleSubmit}>
            ask question
        </Button>

    );
}