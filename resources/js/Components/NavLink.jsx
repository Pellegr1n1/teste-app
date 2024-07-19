import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none pr-[8px] pl-[8px] ' +
                (active
                    ? 'border-black focus:border-[#0b1569] text-white/80 bg-[#ced4da]/20 border-white'
                    : 'border-transparent text-white/80 hover:text-white hover:border-[#0b1569] focus:text-white focus:border-gray-300'
                ) +
                className
            }
        >
            {children}
        </Link>
    );
}
