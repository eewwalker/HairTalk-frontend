import '@/src/styles/Sidebar.css';
import Link from 'next/link'


const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link href='/' >
      <div className='sm:text-9xl logo text-8xl'>HAIR </div>
      <div className='sm:text-9xl logo text-8xl ml-8'>TALK</div>
      </Link>
    </div>
  )
}
export default Sidebar