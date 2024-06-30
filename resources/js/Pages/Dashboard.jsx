import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Avatar, Image, List, Skeleton, Tooltip } from 'antd';
import ModalCompany from './Components/Company/ModalCompany';
import ModalProduct from './Components/Product/ModalProduct';
import styles from './Styles/Dashboard.module.css';

export default function Dashboard({ auth, products, topProducts }) {
    const [isModalProductOpen, setIsModalProductOpen] = useState(false);
    const [productToShow, setProductToShow] = useState(null);

    const colorCategory = (item) => {
        return (
            <div
                style={{
                    width: 15,
                    height: 15,
                    backgroundColor: item,
                    marginRight: 10,
                    borderRadius: 15
                }}
            />
        );
    }

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
                                            actions={[
                                                item.qtproduct === 0 ? <p className='ml-12 mr-3.5'>Produto esgotado</p> : (
                                                    <a key={`view-product-${index}`} onClick={() => {
                                                        setProductToShow(item);
                                                        setIsModalProductOpen(true);
                                                    }}>
                                                        Visualizar dados do produto
                                                    </a>
                                                )
                                            ]}
                                            style={{
                                                opacity: item.qtproduct === 0 ? 0.5 : 1,
                                                pointerEvents: item.qtproduct === 0 ? 'none' : 'auto'
                                            }}
                                        >
                                            <Skeleton avatar title={false} active loading={item.loading}>
                                                <List.Item.Meta
                                                    avatar={<Image width={50} src={`storage/${item.image}`} />}
                                                    title={<p className='text-base'>{item.nmproduct}</p>}
                                                    description={
                                                        <div>
                                                            <p>{item.user.name}</p>
                                                            <div className='flex'>
                                                                <p className='mr-5'>R$ {parseFloat(item.price).toFixed(2)}</p>
                                                                <p style={{ color: item.qtproduct > 0 ? 'green' : 'red' }}>{item.qtproduct > 0 ? "Em estoque" : "Fora de estoque"}</p>
                                                            </div>
                                                        </div>
                                                    }
                                                />
                                                {colorCategory(item.category.color)}
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
                        <h2 className="text-xl font-semibold text-black mb-4">Ranking de produtos mais comprados</h2>
                        <div className="p-4 sm:p-8 bg-white border border-gray-200 shadow-md md:rounded-lg flex">
                            {topProducts.length == 3 ? (
                                <div className="w-full flex">
                                    <div className="w-1/3">
                                        <p className='font-bold text-[#eab308]'>1° Lugar</p>
                                        <span className='flex items-center mb-3'><Tooltip title={topProducts[0].nmcategory}>{colorCategory(topProducts[0].nmcategory)}</Tooltip>{topProducts[0]?.nmproduct}</span>
                                        <p className='font-bold text-[#6c757d]'>2° Lugar</p>
                                        <span className='flex items-center mb-3'><Tooltip title={topProducts[1].nmcategory}>{colorCategory(topProducts[1].nmcategory)}</Tooltip>{topProducts[1]?.nmproduct}</span>
                                        <p className='font-bold text-[#bc6c25]'>3° Lugar</p>
                                        <span className='flex items-center mb-3'><Tooltip title={topProducts[1].nmcategory}>{colorCategory(topProducts[2].nmcategory)}</Tooltip>{topProducts[2]?.nmproduct}</span>
                                    </div>
                                    <div className="flex-1 flex justify-center items-end space-x-4">
                                        {/* Segundo lugar */}
                                        <div className='flex flex-col items-center'>
                                            <img style={{ width: '90px' }} className={`${styles.avatarContainer}`} src='https://cdn-icons-png.flaticon.com/128/522/522404.png' />
                                            <div className="bottom-0 bg-[#c0c0c0] w-36 h-20" style={{ height: '120px' }}>
                                                <div className={`flex w-full h-full items-center justify-center`}>
                                                    <Avatar size={64} src={`storage/${topProducts[1].image}`} className='bg-white' />
                                                </div>
                                            </div>
                                        </div>
                                        {/* Primeiro lugar */}
                                        <div className='flex flex-col items-center'>
                                            <img style={{ width: '120px' }} className={`${styles.avatarContainer}`} src='https://cdn-icons-png.flaticon.com/128/625/625398.png' />
                                            <div className="bottom-0 bg-yellow-500 w-36" style={{ height: '200px' }}>
                                                <div className={`flex w-full h-full items-center justify-center`}>
                                                    <Avatar size={64} src={`storage/${topProducts[0].image}`} className='bg-white' />
                                                </div>
                                            </div>
                                        </div>
                                        {/* Terceiro lugar */}
                                        <div className='flex flex-col items-center'>
                                            <img style={{ width: '60px' }} className={`${styles.avatarContainer}`} src='https://cdn-icons-png.flaticon.com/128/522/522405.png' />
                                            <div className="bottom-0 bg-[#cd7f32] w-36" style={{ height: '90px' }}>
                                                <div className={`flex w-full h-full items-center justify-center`}>
                                                    <Avatar size={64} src={`storage/${topProducts[2].image}`} className='bg-white' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-gray-600 dark:text-gray-600">Nenhum produto comprado até o momento.</p>
                            )}
                        </div>
                    </div>
                </div>
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
