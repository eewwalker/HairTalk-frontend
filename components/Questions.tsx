import { fetchQuestions } from "@/src/lib/api";

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