import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FormAddressModalCart from '../Components/Cart/FormAddressModalCart';

export default function addressCompany({ auth, address }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Perfil</h2>}
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white border border-gray-200 overflow-hidden shadow-md md:rounded-lg p-6">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-900">Endereço da Empresa</h2>

                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Certifique-se de que o endereço da empresa esteja completo e atualizado para facilitar a comunicação e entregas.
                        </p>
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <FormAddressModalCart address={address[0]} closeModal={() => {}} className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}