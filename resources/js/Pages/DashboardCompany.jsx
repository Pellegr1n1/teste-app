import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Image, List, Progress, Skeleton, Statistic } from 'antd';
import CountUp from 'react-countup';
import ModalProduct from './Components/Product/ModalProduct';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function DashboardCompany({ auth, products, stockInfo, totalRevenue, pieChartData }) {
    const [isModalProductOpen, setIsModalProductOpen] = useState(false);
    const [productToShow, setProductToShow] = useState(null);

    const formatter = (value) => <CountUp end={value} separator="," />;

    const colorCategory = (item) => (
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

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const formattedValue = payload[0].value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

            return (
                <div className="custom-tooltip">
                    <p>{`${label} X Total Vendido`}</p>
                    <p>{`Total Vendio: R$ ${formattedValue}`}</p>
                    <p>{`Quantidade vendido: ${payload[0].payload.total_sold}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Painel de Produtos</h2>}
        >
            <Head title="DashboardCompany" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Bem-vindo(a), {auth.user.name}!
                        </h1>
                        <p className="text-gray-600">Aqui está o resumo do que está acontecendo na sua empresa hoje:</p>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-black mb-4">Produtos disponíveis para os clientes</h2>
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
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
                                                                <p style={{ color: item.qtproduct > 0 ? 'green' : 'red' }}>{`${item.qtproduct > 0 ? "Em estoque" : "Fora de estoque"} - (${item.qtproduct} itens disponíveis)`}</p>
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
                        <h2 className="text-xl font-semibold text-black mb-4">Informações de Estoque</h2>
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <div className='flex mb-10'>
                                <Statistic title="Estoque Atual" value={stockInfo.currentStock} precision={2} formatter={formatter} />
                                <Statistic className='ml-20' title="Estoque inicial X Estoque vendido" value={stockInfo.initialStock} suffix={`/ ${stockInfo.totalSold}`} formatter={formatter} />
                            </div>

                            <h2>Estoque Vendido</h2>
                            <Progress percent={stockInfo.percentSold} />
                        </div>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-black mb-4">Receita</h2>
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <div>
                                <Statistic title="Receita Total" value={totalRevenue} precision={2} prefix="R$" />
                            </div>
                            <div className='mt-10'>
                                <h2>Total vendido por produto</h2>
                                <ResponsiveContainer width="100%" height={400}>
                                    <BarChart
                                        width={500}
                                        height={300}
                                        data={pieChartData}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Legend />
                                        <Bar dataKey="value" barSize={20} fill="#FE5721" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
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
