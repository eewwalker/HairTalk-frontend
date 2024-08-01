import { fetchQuestions } from '@/src/lib/api';
import Question from './Question';
import {Question as QuestionType} from "@/src/types/types";
import AskQuestion from './AskQuestion';

export default async function Questions() {
    const questions: QuestionType[] = await fetchQuestions();

    return (
        <div className='flex flex-col w-full max-w-lg sm:max-w-xl md:max-w-2xl mx-auto'>
            <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl mx-auto mb-4">
        <AskQuestion/>
        </div>
        <div className="flex flex-col space-y-4">
         {questions.map(q => <Question key={q.id}question = {q}/>)}
         </div>
         </div>
    );
}



