// "use client";
import { Question as QuestionType } from "@/types";
// import {useSession} from "next-auth/react"
import Link from "next/link";

type Props = {
    question: QuestionType;
};


export default function Question({ question }: Props) {
    console.log('question', question)
    console.log(question.tags, 'tagsss')
    // const {data: session} = useSession();
    const dateString = question.created_at.toString();
    return (
        <div className="border p-4 rounded-md shadow-sm mb-4 w-full max-w-lg sm:max-w-xl md:max-w-2xl">
            <div className="text-[#C1F5FE] text-sm mb-2">
                {dateString}
            </div>
            <div className="text-[#f5f1ef] text-lg mb-1">
                <Link href={`/questions/${question.id}/${question.title}`}> {question.title}</Link>
            </div>
            <div className="text-[#f5f1ef] text-sm mb-1">
                {question.content}
            </div>
            <div className="flex items-center text-sm text-[#ff99dd] space-x-2">
                <span>0 votes</span>
                <span>0 answers</span>
            </div>
            {question.tags.length > 0 &&
                <div className="flex space-x-2 mt-2 flex-wrap">
                    {question.tags.map((t, i) =>  <span key={i} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md">{t}</span>)}
                </div>
            }
            <div>
                <div className="">
                    Something about the user that is posting the question
                </div>
            </div>
        </div>
    );
}