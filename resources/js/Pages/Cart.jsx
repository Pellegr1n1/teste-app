import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useEffect, useState } from "react";
import styles from "./Styles/Cart.module.css";
import CustomCard from "./Components/Cart/Card";
import { Space, Pagination, FloatButton, Tooltip, List, TreeSelect, Input, Button } from "antd";
import { ShoppingCartOutlined, InfoCircleOutlined, SearchOutlined } from "@ant-design/icons";
import ModalCart from "./Components/Cart/ModalCart";
import ModalCompany from './Components/Company/ModalCompany';
import ModalInfoColor from './Components/Cart/ModalInfoColor';

export default function Cart({ auth, products, address, categories, ratingsCount, addressAll }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenInfoColor, setIsModalInfoColor] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [isModalOpenCompany, setIsModalOpenCompany] = useState(false);
    const [listProduct, setListProduct] = useState([]);
    const [listCategory, setListCategory] = useState([]);
    const [productFilter, setProductFilter] = useState([]);
    const [filterProductTree, setFilterProductTree] = useState([]);
    const [tree, setTree] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [addressCompany, setAddressCompany] = useState(null);
    const [selectedCompanyProducts, setSelectedCompanyProducts] = useState([]);

    useEffect(() => {
        updateCart();
    }, []);

    useEffect(() => {
        setListCategory(categories);
    }, [categories]);

    useEffect(() => {
        setProductFilter(products);
        setListProduct(products);
    }, [products]);

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

    const handleRemoveAllItem = () => {
        localStorage.removeItem("cart");
        updateCart();
    }; 

    const showCompanyModal = (product, companyId) => {
        const relatedProducts = products.filter(product => product.iduser === companyId);
        const addressComp = addressAll.filter(address => address.iduser === companyId);
        
        setAddressCompany(addressComp);
        setSelectedCompanyProducts(relatedProducts);
        setSelectedProduct(product);
        setIsModalOpenCompany(true);
    };

    const closeModal = () => {
        setIsModalOpenCompany(false);
    };

    const filterBySearch = () => {
        if (tree) {
            if (searchValue === '') {
                setProductFilter(filterProductTree);
            } else {
                const regex = new RegExp(searchValue, 'i');
                const filterProducts = productFilter.filter((product) => regex.test(product.nmproduct));
                setProductFilter(filterProducts);
            }
        } else {
            const regex = new RegExp(searchValue, 'i');
            const filterProducts = listProduct.filter((product) => regex.test(product.nmproduct));
            setProductFilter(filterProducts);
        }
    };

    const treeFilter = (value) => {
        if (value) {
            setProductFilter(listProduct);
            const filteredProducts = listProduct.filter(product => product.idcategory === value);
            setProductFilter(filteredProducts);
            setFilterProductTree(filteredProducts);
            setTree(true);
        } else {
            setTree(false);
            setProductFilter(products);
        }
    };

    const treeData = listCategory.map((ctg) => ({
        value: ctg.id,
        title: (
            <span style={{ display: 'flex', alignItems: 'center' }}>
                <span
                    style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: `${ctg.color}`,
                        marginRight: '5px',
                    }}
                ></span>
                <span
                    style={{
                        fontWeight: '500',
                    }}
                >
                    {ctg.nmcategory}
                </span>
            </span>
        ),
    }));

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <>
                    <h2 className="font-semibold text-xl text-white leading-tight">Carrinho</h2>
                    <p className="text-sm text-white/80">Adicione produtos ao seu carrinho e aproveite nossas promoções</p>
                </>
            }
        >
            <Head title="Carrinho" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-20 py-5">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <Input
                            placeholder="Busque por produtos"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            style={{
                                width: 400,
                                marginRight: 8,
                                borderRadius: '6px',
                                borderColor: "#d9d9d9"
                            }}
                        />
                        <Button
                            type="primary"
                            size='large'
                            onClick={filterBySearch}
                            icon={<SearchOutlined />}
                        />
                    </div>
                    <TreeSelect
                        allowClear
                        placeholder={'Selecione uma categoria'}
                        treeLine
                        size='large'
                        onChange={treeFilter}
                        style={{
                            width: 300
                        }}
                        treeData={treeData}
                    />
                </div>
                <div className="py-10">
                    <Space size={[32, 16]} wrap className={styles.cardContainer}>
                        {productFilter.slice((currentPage - 1) * 12, currentPage * 12).map((product) => {
                            const storedItems = JSON.parse(localStorage.getItem("cart")) || {};
                            const initialQuantity = storedItems[product.id] || 0;
                            return (
                                <CustomCard
                                    key={product.id}
                                    ratingsCount={ratingsCount[product.id]}
                                    rating={product.rating}
                                    categoryColor={product.category.color}
                                    id={product.id}
                                    name={product.nmproduct}
                                    price={product.price}
                                    stock={product.qtproduct}
                                    src={`storage/${product.image}`}
                                    initialQuantity={initialQuantity}
                                    company={product.user.name}
                                    onAddItem={() => handleAddItem(product.id)}
                                    onRemoveItem={() => handleRemoveItem(product.id)}
                                    showModal={() => showCompanyModal(product, product.iduser)}
                                    product={product}
                                    user={product.iduser}
                                    isView={auth.user ? false : true}
                                />
                            );
                        })}
                    </Space>
                    <Pagination
                        className={styles.pagination}
                        current={currentPage}
                        pageSize={12}
                        total={productFilter.length}
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
                            {auth.user && <FloatButton
                                icon={<ShoppingCartOutlined />}
                                badge={{
                                    count: totalItems,
                                }}
                                onClick={() => setIsModalOpen(true)}
                            />}
                        </FloatButton.Group>
                    </Tooltip>
                    <ModalCart
                        isModalOpen={isModalOpen}
                        closeModal={() => setIsModalOpen(false)}
                        listAddress={address}
                        cartItems={cartItems}
                        removeItem={handleRemoveItem}
                        removeAllItem={handleRemoveAllItem}
                    />
                    <ModalCompany
                        isModalOpen={isModalOpenCompany}
                        closeModal={closeModal}
                        products={selectedCompanyProducts}
                        product={selectedProduct}
                        address={addressCompany}
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
