import { Button } from "./ui/button";
import { Overlay } from "@/types";
import '@/styles/overlay.css';
import Link from "next/link";


const OverlayComponent: React.FC<Overlay> = ({onClose }) => {

    return(
        <div className="overlay p-7 flex flex-col">
            <Button onClick={onClose} variant='outline' size='icon' className="bg-inherit rounded-full hover:bg-[#c1f5fe]">X</Button>
            <Link href='/signup' className="text-7xl m-3">SIGNUP</Link>
            <Link href='/login'className="text-7xl m-3">LOGIN</Link>
            <Link href='/logout'className="text-7xl m-3">LOGOUT</Link>
        </div>
    )
}

export default OverlayComponent;