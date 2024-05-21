import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useEffect, useState } from "react";
import styles from "./Styles/Cart.module.css";
import CustomCard from "./Components/Cart/Card";
import { Space, Pagination, FloatButton, Tooltip } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import ModalCart from "./Components/Cart/ModalCart";

export default function Cart({ auth, products }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 12;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex =
        currentPage === 1
            ? Math.min(pageSize, products.length)
            : currentPage * pageSize;

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const [listProducts, setListProducts] = useState([]);

    useEffect(() => {
        setListProducts(products);
        console.log(products);
    }, [products])

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <>
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Carrinho</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Adicione produtos ao seu carrinho, e aproveite nossas promoções</p>
                </>
            }
        >
            <Head title="Carrinho" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Space size={[32, 16]} wrap className={styles.cardContainer}>
                        {listProducts.slice(startIndex, endIndex).map((product) => (
                            <CustomCard
                                key={product.id}
                                name={product.nmproduct}
                                price={product.price}
                                stock={product.qtproduct}
                                src={`storage/${product.image}`}
                            />
                        ))}
                    </Space>
                    <Pagination
                        className={styles.pagination}
                        current={currentPage}
                        pageSize={pageSize}
                        total={products.length}
                        onChange={handlePageChange}
                        showSizeChanger={false}
                    />
                    <Tooltip title="Clique para abrir o carrinho">
                        <FloatButton
                            icon={<ShoppingCartOutlined />}
                            shape="square"
                            badge={{
                                count: 7,
                            }}
                            onClick={() => setIsModalOpen(true)}
                        />
                    </Tooltip>
                    <ModalCart
                        isModalOpen={isModalOpen}
                        closeModal={() => setIsModalOpen(false)}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}