import { fetchQuestions } from '@/src/lib/api';
import Question from './Question';
import {Question as QuestionType} from "@/types";
import AskQuestion from './AskQuestion';

export default async function Questions() {
    const questions: QuestionType[] = await fetchQuestions();

    return (
        <>
        <div className='flex flex-col w-full max-w-2xl mx-auto'>
        <AskQuestion/>
         {questions.map(q => <Question key={q.id}question = {q}/>)}
         </div>
        </>
    );
}



