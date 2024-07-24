
import AuthComponent from '../components/AuthComponent';
import Sidebar from '../components/Sidebar';
import Questions from '../components/Questions';


export default function Dashboard() {

  return (
    <>
        <div className="flex flex-col min-h-screen">
          <div className="flex flex-1">
            <Sidebar />
            <div className="flex-1 flex flex-col items-center justify-center">
              <Questions />
            </div>
          </div>
          <div className="fixed top-10 right-5">
            <AuthComponent />
          </div>
        </div>
    </>
  );
}


