import { Login } from '@/components/Login';
import { buttonVariants } from "@/components/ui/button"
import Link from 'next/link';

export default function Home() {
  return (
<>
<h1 className="text-7xl">HAIR TALK</h1>
<Link href='/questions' className={buttonVariants({ variant: "outline" })}>Click here</Link>

<Login/>
</>
  );
}
