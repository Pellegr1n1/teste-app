import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useEffect, useState } from "react";
import styles from "./Styles/Cart.module.css";
import CustomCard from "./Components/Cart/Card";
import { Space, Pagination, FloatButton, Tooltip, List } from "antd";
import { ShoppingCartOutlined, InfoCircleOutlined } from "@ant-design/icons";
import ModalCart from "./Components/Cart/ModalCart";
import ModalCompany from './Components/Company/ModalCompany';
import ModalInfoColor from './Components/Cart/ModalInfoColor';

export default function Cart({ auth, products, address, categories }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenInfoColor, setIsModalInfoColor] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [isModalOpenCompany, setIsModalOpenCompany] = useState(false);

    useEffect(() => {
        updateCart();
    }, []);

    const updateCart = () => {
        const storedItems = JSON.parse(localStorage.getItem("cart")) || {};
        let total = 0;
        const items = [];
        for (const id in storedItems) {
            total += storedItems[id];
            if (storedItems[id] > 0) {
                const product = products.find(p => p.id.toString() === id);
                if (product) {
                    items.push({ ...product, quantity: storedItems[id] });
                }
            }
        }
        setTotalItems(total);
        setCartItems(items);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleAddItem = (id) => {
        const storedItems = JSON.parse(localStorage.getItem("cart")) || {};
        storedItems[id] = (storedItems[id] || 0) + 1;
        localStorage.setItem("cart", JSON.stringify(storedItems));
        updateCart();
    };

    const handleRemoveItem = (id) => {
        const storedItems = JSON.parse(localStorage.getItem("cart")) || {};
        if (storedItems[id] > 0) {
            storedItems[id] -= 1;
            localStorage.setItem("cart", JSON.stringify(storedItems));
            updateCart();
        }
    };

    const showCompanyModal = () => {
        setIsModalOpenCompany(true);
    };

    const closeModal = () => {
        setIsModalOpenCompany(false);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <>
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Carrinho</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Adicione produtos ao seu carrinho e aproveite nossas promoções</p>
                </>
            }
        >
            <Head title="Carrinho" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Space size={[32, 16]} wrap className={styles.cardContainer}>
                        {products.slice((currentPage - 1) * 12, currentPage * 12).map((product) => {
                            const storedItems = JSON.parse(localStorage.getItem("cart")) || {};
                            const initialQuantity = storedItems[product.id] || 0;
                            return (
                                <CustomCard
                                    key={product.id}
                                    categoryColor={product.category.color}
                                    id={product.id}
                                    name={product.nmproduct}
                                    price={product.price}
                                    stock={product.qtproduct}
                                    src={`storage/${product.image}`}
                                    initialQuantity={initialQuantity}
                                    onAddItem={() => handleAddItem(product.id)}
                                    onRemoveItem={() => handleRemoveItem(product.id)}
                                    showModal={showCompanyModal}
                                />
                            );
                        })}
                    </Space>
                    <Pagination
                        className={styles.pagination}
                        current={currentPage}
                        pageSize={12}
                        total={products.length}
                        onChange={handlePageChange}
                        showSizeChanger={false}
                    />
                    <Tooltip
                        title={
                            <List
                                dataSource={cartItems}
                                renderItem={item => (
                                    <List.Item style={{ color: 'white' }}>
                                        {item.nmproduct} - {item.quantity}
                                    </List.Item>
                                )}
                            />
                        }
                    >
                        <FloatButton.Group
                            shape="circle"
                            style={{
                                right: 30,
                            }}
                        >
                            <FloatButton 
                                icon={<InfoCircleOutlined />}
                                onClick={() => setIsModalInfoColor(true)}
                            />
                            <FloatButton
                                icon={<ShoppingCartOutlined />}
                                badge={{
                                    count: totalItems,
                                }}
                                onClick={() => setIsModalOpen(true)}
                            />
                        </FloatButton.Group>
                    </Tooltip>
                    <ModalCart
                        isModalOpen={isModalOpen}
                        closeModal={() => setIsModalOpen(false)}
                        listAddress={address}
                        cartItems={cartItems}
                    />
                    <ModalCompany
                        isModalOpen={isModalOpenCompany}
                        closeModal={closeModal}
                        products={products}
                        handleAddItem={handleAddItem}
                        handleRemoveItem={handleRemoveItem}
                    />
                    <ModalInfoColor
                        isModalOpen={isModalOpenInfoColor}
                        closeModal={() => setIsModalInfoColor(false)}
                        categories={categories}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
