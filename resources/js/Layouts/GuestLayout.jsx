import logo from '@/Assets/Images/logo-mc.png';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gradient-to-r from-[#65a8c5] to-[#035096] bg-gray-50">
            <div>
                <Link href="/">
                    <div className='flex items-center'>
                        <img id="logo" src={logo} width={60} />
                    </div>
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
