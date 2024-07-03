import Login  from '@/components/Login';
import Sidebar from '@/components/Sidebar';
import Questions from '@/components/Questions';

export default function Dashboard() {
  return (
    <>
      <div className="grid min-h-screen w-full">
        <div className="flex items-stretch w-full">
          <div className="flex-grow">
            <Sidebar />
          </div>
          <div className="flex-initial justify-end relative">
            <Login/>
          </div>
        </div>
      </div>
      <div className="col-span-4 md:col-span-1">
        <Questions />
      </div>
    </>
  );
}


