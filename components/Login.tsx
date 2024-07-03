"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Scissors } from "lucide-react";
import OverlayComponent from '@/components/OverlayComponent';


export default function Login() {
  const [showOverlay, setShowOverlay] = useState(false);

  function loginRegister() {
    setShowOverlay(true);
  }

  function handleClose() {
    setShowOverlay(false);
  }
  return (
    <div>
      <Button variant='outline' size='icon' className="bg-inherit rounded-full hover:bg-[#c1f5fe]" onClick={loginRegister}>
        <Scissors className='text-[#ff99dd]' />
      </Button>
      {showOverlay && <OverlayComponent onClose={handleClose}/>}

    </div>
  );
}