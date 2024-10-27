import Sidebar from '../components/Sidebar';
import Questions from '../components/Questions';
import {fetchQuestions} from '@/src/lib/api';

/** Home component renders Sidebar, Questions
 * Props: none
 * State: none
 */
export default async function Home({
  searchParams
}: {
  searchParams: {page?:string}
}) {
  
  // await warning for typescript..w/o
  // Error: Route "/" used `searchParams.page`. `searchParams` should be awaited before using its properties.
  const page = Number((await searchParams).page) || 1;
  const questionData = await fetchQuestions(page);


  return (
      <div className="min-h-screen grid lg:grid-cols-3 gap-8">
        <div>
          <Sidebar />
        </div>
          <div>
            <Questions initialData={questionData}/>
          </div>
      </div>
  );
}


