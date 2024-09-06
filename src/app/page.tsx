
import Sidebar from '../components/Sidebar';
import Questions from '../components/Questions';

/** Home component renders Sidebar, Questions, AuthComponent
 * Props: none
 * State: none
 */
export default function Home() {

  return (
    <>
      <div className="min-h-screen grid lg:grid-cols-3 gap-8">
        <div>
          <Sidebar />
        </div>
          <div>
            <Questions />
          </div>
      </div>
    </>
  );
}


