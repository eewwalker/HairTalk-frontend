
'use client';
import { Button } from "./ui/button";
import { Overlay } from "@/types";
import '@/src/styles/overlay.css';
import Link from "next/link";
import { usePathname } from "next/navigation";

const OverlayComponent: React.FC<Overlay> = ({ onClose }) => {
    const pathname = usePathname();

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if ((event.target as HTMLDivElement).classList.contains('overlay-backdrop')) {
            onClose();
        }
    };

    return (
        <div className="overlay-backdrop" onClick={handleBackdropClick}>
            <div className="overlay p-7 flex flex-col">
                <Button onClick={onClose} variant='outline' size='icon' className="bg-inherit rounded-full hover:bg-[#c1f5fe]">X</Button>
                {pathname !== '/' && <Link href='/' onClick={onClose} className="text-7xl m-3">HOME</Link>}
                <Link href='/register' onClick={onClose} className="text-7xl m-3">SIGNUP</Link>
                <Link href='/login' onClick={onClose} className="text-7xl m-3">LOGIN</Link>
                <Link href='/logout' onClick={onClose} className="text-7xl m-3">LOGOUT</Link>
            </div>
        </div>
    );
};

export default OverlayComponent;
