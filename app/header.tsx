import { Bars3Icon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import DarkModeButton from './DarkModeButton';
import NavLinks from './navlinks';
import SearchBox from './searchbox';

function Header() {
    return (
        <header>
            <div className='grid grid-cols-3 p-10 items-center'>
                <Bars3Icon className='h-8 w-8 cursor-pointer' />
                <Link href="/" prefetch={false}>
                    <h1 className='font-serif text-4xl text-center'>News<span className='underline decoration-6 decoration-orange-400'>App</span></h1>
                </Link>
                <div className='flex items-center justify-center space-x-2'>
                    {/* DarkMode Button */}
                    <DarkModeButton />
                    <button className='hidden md:inline bg-slate-900 text-white px-4 lg:px-8 py-2 lg:py-4 rounded-full dark:bg-state-800'>Subscribe Now</button>
                </div>
            </div>
            {/* NavLinks */}
            <NavLinks />

            {/* SearchBox */}
            <SearchBox />
        </header>
    )
}

export default Header;
