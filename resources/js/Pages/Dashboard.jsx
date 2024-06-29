import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Image, List, Skeleton } from 'antd';
import ModalCompany from './Components/Company/ModalCompany';
import ModalProduct from './Components/Product/ModalProduct';

export default function Dashboard({ auth, products }) {
    const [isModalCompanyOpen, setIsModalCompanyOpen] = useState(false);
    const [isModalProductOpen, setIsModalProductOpen] = useState(false);
    const [productToShow, setProductToShow] = useState(null);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Painel</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white border border-gray-200 overflow-hidden shadow-md md:rounded-lg p-6">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-900">
                            Bem-vindo(a), {auth.user.name}!
                        </h1>
                        <p className="text-gray-600 dark:text-gray-500">Aqui está o resumo do que está acontecendo na sua loja hoje:</p>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-black mb-4">Produtos mais vendidos</h2>
                        <div className="p-4 sm:p-8 bg-white border border-gray-200 shadow-md md:rounded-lg">
                            {products && products.length > 0 ?
                                <List
                                    pagination
                                    dataSource={products}
                                    renderItem={(item, index) => (
                                        <List.Item
                                            actions={[<a key={`view-product-${index}`} onClick={() => {
                                                setProductToShow(item);
                                                setIsModalProductOpen(true);
                                            }}>Visualizar dados do produto</a>]}
                                        >
                                            <Skeleton avatar title={false} active loading={item.loading}>
                                                <List.Item.Meta
                                                    avatar={<Image width={50} src={`storage/${item.image}`} />}
                                                    title={<a className='text-base'>{item.nmproduct}</a>}
                                                    description={
                                                        <div>
                                                            <p>Empresa</p>
                                                            <div className='flex'>
                                                                <p className='mr-5'>R$ {parseFloat(item.price).toFixed(2)}</p>
                                                                <p style={{ color: item.qtproduct > 0 ? 'green' : 'red' }}>{item.qtproduct > 0 ? "Em estoque" : "Fora de estoque"}</p>
                                                            </div>
                                                        </div>
                                                    }
                                                />
                                                <div
                                                    style={{
                                                        width: 15,
                                                        height: 15,
                                                        backgroundColor: item.category.color,
                                                        marginRight: 10,
                                                        borderRadius: 15
                                                    }} 
                                                />
                                                {item.category.nmcategory}
                                            </Skeleton>
                                        </List.Item>
                                    )}
                                />
                                :
                                <p className="text-gray-600 dark:text-gray-600">Nenhum produto disponível.</p>
                            }
                        </div>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-black mb-4">Pedidos Recentes</h2>
                        <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <p className="text-gray-600 dark:text-gray-300">Nenhum pedido recente disponível.</p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-black mb-4">Categorias Principais</h2>
                        <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <p className="text-gray-600 dark:text-gray-300">Nenhuma categoria principal disponível.</p>
                        </div>
                    </div>
                </div>
                <ModalCompany
                    isModalOpen={isModalCompanyOpen}
                    closeModal={() => setIsModalCompanyOpen(false)}
                    products={products}
                />
                {isModalProductOpen && (
                    <ModalProduct
                        isModalOpen={isModalProductOpen}
                        closeModal={() => {
                            setIsModalProductOpen(false);
                            setProductToShow(null);
                        }}
                        product={productToShow}
                    />
                )}
            </div>
        </AuthenticatedLayout>
    );
}
