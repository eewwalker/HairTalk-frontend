
"use client";
import Link from "next/link";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { useForm } from "react-hook-form";
import { QuestionSchema, questionSchema } from "@/src/lib/schemas/questionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createNewQuestion } from "@/src/lib/api";
import { useRouter } from "next/navigation";

const QuestionForm = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<QuestionSchema>({
        resolver: zodResolver(questionSchema),
        mode: 'onTouched'
    });

    const onSubmit = async (data: QuestionSchema) => {
        const {title, content} = data;
        const userId = getUserId(); // Replace 'getUserId()' with the actual method to get the user ID
        const resp = await createNewQuestion(userId, title, content);
        console.log('resp', resp)
        router.push('/');
    };

    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-1 xl:min-h-[800px]">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-5xl font-bold text-[#66ffec]">ask a question!</h1>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-4">
                            <div className="grid gap-2 text-[#66ffec]">
                                <Label htmlFor="title">title</Label>
                                <Input
                                    className="text-[#0c6999]"
                                    autoComplete="title"
                                    id="title"
                                    type="text"
                                    {...register('title')}
                                />
                                {errors.title?.message && <p>{errors.title?.message}</p>}
                            </div>
                            <div className="grid gap-2 text-[#66ffec]">
                                <div className="flex items-center">
                                    <Label htmlFor="content">content</Label>
                                </div>
                                <Input
                                    id="content"
                                    type="content"
                                    {...register('content')}
                                    autoComplete="new-content"
                                />
                                {errors.content?.message && <p>{errors.content?.message}</p>}
                            </div>
                            {/* <div className="grid gap-2 text-[#66ffec]">
                                <Label htmlFor="location">location</Label>
                                <Input
                                    className="text-[#0c6999]"
                                    autoComplete="location"
                                    id="location"
                                    type="text"
                                    {...register('location')}
                                />
                                {errors.location?.message && <p>{errors.location?.message}</p>}
                            </div> */}
                            <Button
                                type="submit"
                                className="w-full hover:bg-[#2584b3] hover:text-[#66ffec] rounded-full bg-[#c1f5fe] text-[#0c6999]">
                                sign up
                            </Button>
                        </div>
                    </form>
                    <div className="mt-4 text-center text-sm text-[#66ffec]">
                        already have an account?{" "}
                        <Link href="/login" className="text-decoration-none">
                            login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default QuestionForm;