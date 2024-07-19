import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Avatar, Image, List, Popover, Skeleton, Tooltip } from 'antd';
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

    const contentTopProduct = (item) => {
        return (
            <>
                <p><span className='font-bold'>Empresa:</span> {item.name}</p>
                <div className='flex items-center'>
                    <p className='mr-1'><span className='font-bold'>Categoria:</span> {item.nmcategory}</p>

                    {colorCategory(item.color)}
                </div>
                <p><span className='font-bold'>Quantidade de produtos vendidos:</span> {parseInt(item.total_sold)}</p>
            </>
        )
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Painel</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white border border-gray-200 overflow-hidden shadow-md md:rounded-lg p-6">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Bem-vindo(a), {auth.user.name}!
                        </h1>
                        <p className="text-gray-600">Aqui está o resumo do que está acontecendo na sua loja hoje:</p>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-black mb-4">Produtos mais vendidos</h2>
                        <div className="p-4 sm:p-8 bg-white border border-gray-200 shadow-md md:rounded-lg">
                            {products && products.length > 0 ?
                                <List
                                    pagination={{
                                        pageSize: 5,
                                        showSizeChanger: false
                                    }}
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
                            {topProducts && topProducts.length == 3 ? (
                                <div className="w-full flex">
                                    <div className="w-1/3">
                                        <p className='font-bold text-[#eab308]'>1° Lugar</p>
                                        <span className='flex items-center mb-3'><Tooltip title={topProducts[0].nmcategory}>{colorCategory(topProducts[0].color)}</Tooltip>{`${topProducts[0]?.nmproduct} - ${topProducts[2]?.name}`}</span>
                                        <p className='font-bold text-[#6c757d]'>2° Lugar</p>
                                        <span className='flex items-center mb-3'><Tooltip title={topProducts[1].nmcategory}>{colorCategory(topProducts[1].color)}</Tooltip>{`${topProducts[1]?.nmproduct} - ${topProducts[2]?.name}`}</span>
                                        <p className='font-bold text-[#bc6c25]'>3° Lugar</p>
                                        <span className='flex items-center mb-3'><Tooltip title={topProducts[2].nmcategory}>{colorCategory(topProducts[2].color)}</Tooltip>{`${topProducts[2]?.nmproduct} - ${topProducts[2]?.name}`}</span>
                                    </div>
                                    <div className="flex-1 flex justify-center items-end space-x-4">
                                        {/* Segundo lugar */}
                                        <div className='flex flex-col items-center'>
                                            <img style={{ width: '90px' }} className={`${styles.avatarContainer}`} src='https://cdn-icons-png.flaticon.com/128/522/522404.png' />

                                            <Popover content={contentTopProduct(topProducts[1])} title={topProducts[1]?.nmproduct} trigger="hover" placement="leftBottom">
                                                <div className='flex flex-col items-center'>
                                                    <div className='w-40 h-[20px] bg-[#c0c0c0]' style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 10px 15px -3px rgba(0, 0, 0, 0.3)', zIndex: '10' }} />
                                                    <div className="bottom-0 bg-[#c0c0c0] w-36 h-20" style={{ height: '120px' }}>
                                                        <div className={`flex w-full h-full items-center justify-center`}>
                                                            <Avatar size={64} src={`storage/${topProducts[1].image}`} className='bg-white' />
                                                        </div>
                                                    </div>
                                                    <div className='w-[180px] h-[20px] bg-[#c0c0c0]' style={{ boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)' }} />
                                                </div>
                                            </Popover>
                                        </div>
                                        {/* Primeiro lugar */}
                                        <div className='flex flex-col items-center'>
                                            <img style={{ width: '120px' }} className={`${styles.avatarContainer}`} src='https://cdn-icons-png.flaticon.com/128/625/625398.png' />

                                            <Popover content={contentTopProduct(topProducts[0])} title={topProducts[0]?.nmproduct} trigger="hover" placement="top">
                                                <div className='flex flex-col items-center'>
                                                    <div className='w-40 h-[20px] bg-yellow-500' style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 10px 15px -3px rgba(0, 0, 0, 0.3)', zIndex: '10' }} />
                                                    <div className="bottom-0 bg-yellow-500 w-36" style={{ height: '200px' }}>
                                                        <div className={`flex w-full h-full items-center justify-center`}>
                                                            <Avatar size={64} src={`storage/${topProducts[0].image}`} className='bg-white' />
                                                        </div>
                                                    </div>
                                                    <div className='w-[180px] h-[20px] bg-yellow-500' style={{ boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)' }} />
                                                </div>
                                            </Popover>
                                        </div>
                                        {/* Terceiro lugar */}
                                        <div className='flex flex-col items-center'>
                                            <img style={{ width: '60px' }} className={`${styles.avatarContainer}`} src='https://cdn-icons-png.flaticon.com/128/522/522405.png' />

                                            <Popover content={contentTopProduct(topProducts[2])} title={topProducts[2]?.nmproduct} trigger="hover" placement="rightBottom">
                                                <div className='flex flex-col items-center'>
                                                    <div className='w-40 h-[20px] bg-[#cd7f32]' style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 10px 15px -3px rgba(0, 0, 0, 0.3)', zIndex: '10' }} />
                                                    <div className="bottom-0 bg-[#cd7f32] w-36" style={{ height: '90px' }}>
                                                        <div className={`flex w-full h-full items-center justify-center`}>
                                                            <Avatar size={64} src={`storage/${topProducts[2].image}`} className='bg-white' />
                                                        </div>
                                                    </div>
                                                    <div className='w-[180px] h-[20px] bg-[#cd7f32]' style={{ boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)' }} />
                                                </div>
                                            </Popover>
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
                        auth={auth}
                    />
                )}
            </div>
        </AuthenticatedLayout>
    );
}
