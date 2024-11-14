
'use client';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";
import { questionSchema, QuestionSchema } from "@/src/lib/schemas/questionSchema";
import { createNewQuestion } from '@/src/lib/api';
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import OverlayComponent from "@/src/components/OverlayComponent";
import TagInput from '@/src/components/TagInput';
import {useSession} from 'next-auth/react';

const AskForm = () => {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    // const [tags, setTags] = useState<string[]>([]);
    const {data: session} = useSession();

    const router = useRouter();
    const { register, handleSubmit, control, formState: { errors, isDirty, isSubmitting } } = useForm<QuestionSchema>({
        resolver: zodResolver(questionSchema),
        mode: 'onTouched',
        defaultValues: {
            title: '',
            content: '',
            tags: []
        }
    });

    const onSubmit = async (data: QuestionSchema) => {
        console.log('Form data:', data);
        console.log('Tags value:', data.tags);
        console.log('Type of tags:', typeof data.tags);
        try{
            const {title, content, tags} = data;

            if (!(session?.user.id) ) {
                throw new Error('User not authenticated');
            }
            const newQuestion = await createNewQuestion(session?.user.id, title, content, tags)
            console.log('Question created:', newQuestion);

            router.push('/');

        }catch(error){
            console.error('Error creating question', error);
        }
    };

    const toggleOverlay = () => {
        setIsOverlayOpen(!isOverlayOpen);
    };

    return (
        <div className="relative">
            <div className={`fixed top-10 right-5 ${isOverlayOpen ? 'hidden' : ''}`}>
                <Button onClick={toggleOverlay} className="bg-inherit rounded-full hover:opacity-0"></Button>
            </div>
            {isOverlayOpen && <OverlayComponent onClose={toggleOverlay} />}

            <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-1 xl:min-h-[800px]">
                <div className="flex items-center justify-center py-12">
                    <div className="mx-auto grid w-[350px] gap-6">
                        <div className="grid gap-2 text-center">
                            <h1 className="text-5xl font-bold text-[#66ffec]">ask a question</h1>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid gap-4">
                                <div className="grid gap-2 text-[#66ffec]">
                                    <Label htmlFor="title">title</Label>
                                    <Input
                                        className="text-[#0c6999]"
                                        required
                                        autoComplete="title"
                                        {...register('title')}
                                        placeholder='e.g., how to fix brassy highlights?'
                                    />
                                    {errors.title?.message && <p>{errors.title?.message}</p>}
                                </div>
                                <div className="grid gap-2 text-[#66ffec]">
                                    <div className="flex items-center">
                                        <Label htmlFor="content">content</Label>
                                    </div>
                                    <Textarea
                                        className="text-[#0c6999]"
                                        id="content"
                                        required
                                        autoComplete="current-content"
                                        {...register('content')}
                                        placeholder='provide details about your hair question...'
                                    />
                                    {errors.content?.message && <p>{errors.content?.message}</p>}
                                </div>
                                <div className="grid gap-2 text-[#66ffec]">
                                    <Label htmlFor="tags">tags</Label>
                                    <Controller
                                        name="tags"
                                        control={control}
                                        render={({ field }) => {
                                            console.log('Field value in Controller:', field.value); // Debug log
                                            return (
                                                <TagInput
                                                    tags={field.value}
                                                    setTags={field.onChange}
                                                />
                                            );
                                        }}
                                    />
                                    {errors.tags?.message && <p>{errors.tags?.message}</p>}
                                </div>
                                <Button
                                    disabled={isSubmitting || !isDirty}
                                    type="submit"
                                    className="w-full hover:bg-[#2584b3] hover:text-[#66ffec] rounded-full bg-[#c1f5fe] text-[#0c6999]">
                                    post
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AskForm;
