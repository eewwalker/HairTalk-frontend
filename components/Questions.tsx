import { fetchQuestions } from "@/lib/api";
import { Link } from "lucide-react";
import { Question } from "@/types";

export default async function Questions() {
    const questions = await fetchQuestions();
    return (
        <>
            <ul>
                {questions.map(q => <div key={q.id}>{q.content}</div>)}
            </ul>
        </>
    );
}