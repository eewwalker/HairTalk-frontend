"use client";
import {Question as QuestionType} from "@/types";
import {useSession} from "next-auth/react"

type Props = {
    question: QuestionType
}


export default function Question({question}: Props) {
    const {data: session} = useSession();
    const dateString = question.created_at.toString();
    return (
        <div className="border p-4 rounded-md shadow-sm mb-4 w-full max-w-2xl">
            <div className="text-[#C1F5FE] text-sm mb-2">
                {dateString}
            </div>
            <div className="text-[#f5f1ef] text-md mb-1">
                {question.content}
            </div>
            <div className="flex items-center text-sm text-[#ff99dd] space-x-2">
                <span>0 votes</span>
                <span>0 answers</span>
            </div>
            <div className="flex space-x-2 mt-2">
                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md">tag1</span>
                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md">tag2</span>
                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md">tag3</span>
            </div>
            <div>
                <span>
                    {question.user_id}
                </span>
            </div>
        </div>
    )
}