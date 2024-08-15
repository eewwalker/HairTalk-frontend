
import Sidebar from '../components/Sidebar';
import Questions from '../components/Questions';

/** Home component renders Sidebar, Questions, AuthComponent
 * Props: none
 * State: none
 */
export default function Home() {

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 flex flex-col items-center justify-center">
            <Questions />
          </div>
        </div>
      </div>
    </>
  );
}


