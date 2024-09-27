"use client";

import { useState } from 'react';
import {useRouter} from 'next/navigation';
import Question from './Question';
import AskQuestion from './AskQuestion';
import {Question as QuestionType, PaginatedResponse} from "@\/types";
import Pagination from './Pagination';

export default function Questions({initialData}: {initialData:PaginatedResponse<QuestionType>}) {
   const [questions, setQuestions] = useState(initialData.items);
   const [currentPage, setCurrentPage] = useState(initialData.currentPage);
   const [totalPages, setTotalPages] = useState(initialData.pages);
   const router = useRouter();


   const handlePageChange = (newPage:number)=> {
        setCurrentPage(newPage);
        router.push(`/?page=${newPage}`);
   }

    return (
        <div className='flex flex-col w-full max-w-lg sm:max-w-xl md:max-w-2xl mx-auto'>
            <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl mx-auto mb-4">
        <AskQuestion/>
        </div>
        <div className="flex flex-col space-y-4">
         {questions.map(q => <Question key={q.id}question = {q}/>)}
         </div>
         <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
         </div>
    );
}



