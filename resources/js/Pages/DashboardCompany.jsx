import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Slider from 'react-slick';
import CustomCard from './Components/Cart/Card';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ModalCompany from './Components/Company/ModalCompany';

export default function DashboardCompany({ auth, products }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showCompanyModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Painel de Produtos</h2>}
        >
            <Head title="DashboardCompany" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Bem-vindo(a), {auth.user.name}!
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">Aqui está o resumo do que está acontecendo na sua empresa hoje:</p>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-black mb-4">Produtos Cadastrados</h2>
                        <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <Slider {...settings}>
                                {products.slice().map((product) => {
                                    const storedItems = JSON.parse(localStorage.getItem("cart")) || {};
                                    const initialQuantity = storedItems[product.id] || 0;
                                    return (
                                        <CustomCard
                                            key={product.id}
                                            id={product.id}
                                            name={product.nmproduct}
                                            price={product.price}
                                            stock={product.qtproduct}
                                            src={`storage/${product.image}`}
                                            initialQuantity={initialQuantity}
                                            onAddItem={() => { }}
                                            onRemoveItem={() => { }}
                                            showModal={showCompanyModal}
                                        />
                                    );
                                })}
                            </Slider>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-black mb-4">Top 3 produtos mais vendido</h2>
                        <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <p className="text-gray-600 dark:text-gray-300">Nenhum produto.</p>
                        </div>
                    </div>
                </div>
                <ModalCompany
                    isModalOpen={isModalOpen}
                    closeModal={closeModal}
                    products={products}
                />
            </div>
        </AuthenticatedLayout>
    );
}