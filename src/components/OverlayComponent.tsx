'use client';

import '@/src/styles/overlay.css';
import { Button } from "../../components/ui/button";
import { Overlay } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from 'next-auth/react';

const OverlayComponent: React.FC<Overlay> = ({ onClose }) => {
    const pathname = usePathname();
    const session = useSession();

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if ((event.target as HTMLDivElement).classList.contains('overlay-backdrop')) {
            onClose();
        }
    };

    return (
        <div className="overlay-backdrop" onClick={handleBackdropClick}>
            <div className="overlay p-7 flex flex-col">
                {session.data?.user ? <>
                    <Button onClick={onClose} variant='outline' size='icon' className="bg-inherit rounded-full text-[#efefef] hover:bg-[#66FFEC] hover:text-[#0E6899] ">X</Button>
                    {pathname !== '/' && <Link href='/' onClick={onClose} className="text-7xl m-3 text-[#efefef]">HOME</Link>}
                    <Link href='/' onClick={()=> signOut()} className="text-7xl m-3 text-[#efefef]">LOGOUT</Link>
                </>
                    :
                    <>
                        <Button onClick={onClose} variant='outline' size='icon' className="bg-inherit rounded-full text-[#efefef] hover:bg-[#66FFEC] hover:text-[#0E6899]">X</Button>
                        {pathname !== '/' && <Link href='/' onClick={onClose} className="text-7xl m-3 text-[#efefef]">HOME</Link>}
                        <Link href='/register' onClick={onClose} className="text-7xl m-3 text-[#efefef]">SIGNUP</Link>
                        <Link href='/login' onClick={onClose} className="text-7xl m-3 text-[#efefef]">LOGIN</Link>
                    </>
                }
            </div>
        </div>
    );
};

export default OverlayComponent;
