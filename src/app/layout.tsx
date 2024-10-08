import { ReactNode } from 'react';
import "@/src/styles/globals.css";
import { Provider } from "@/src/app/providers";
import { getSession } from 'next-auth/react';
import AuthComponent from '../components/AuthComponent';
import {Toaster} from "@/components/ui/toaster"

export const metadata = {
  title: "Hair Talk",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }: { children: ReactNode; }) {
  const session = getSession();
  return (
    <html lang="en">
      <body className='relative'>
        <Provider session={session}>
          <div className="absolute top-5 right-5 p-1">
            <AuthComponent/>
          </div>
            {children}
            <Toaster/>
        </Provider>
      </body>
    </html>
  );
}
