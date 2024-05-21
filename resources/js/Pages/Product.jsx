import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useEffect, useState } from "react";
import ProductForm from "./Components/Product/ProductForm";
import styles from "./Styles/Product.module.css";
import { Table, Space, Modal } from "antd";
import { FaRegEdit } from "react-icons/fa";
import { useForm } from '@inertiajs/react';
import { IoTrashOutline } from "react-icons/io5";

export default function Product({ auth, products, categories }) {
    const showEdit = () => {
        alert('Editando os dados no forms!')
    };

    const {
        delete: destroy,
        put
    } = useForm();

    const [listProducts, setListProducts] = useState([]);

    useEffect(() => {
        setListProducts(products);
    }, [products])

    const handleDelete = (id) => {
        Modal.confirm({
            title: "Confirmar exclusão",
            content: "Tem certeza que deseja excluir este produto?",
            okText: "Sim",
            cancelText: "Cancelar",
            onOk() {
                destroy(route('categories.destroy', { id: id }))
            },
        });
    };

    const columns = [
        {
            title: "Identificador",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Nome",
            dataIndex: "nmproduct",
            key: "id",
        },
        {
            title: "Preço",
            dataIndex: "price",
            key: "id",
        },
        {
            title: "Estoque",
            dataIndex: "qtproduct",
            key: "id",
        },
        {
            title: "Ações",
            key: "action",
            render: (record) => (
                <Space size={30}>
                    <a onClick={() => showEdit(record)}>
                        <FaRegEdit className={styles.iconEdit} size={20} />
                    </a>
                    <a onClick={() => handleDelete(record)}>
                        <IoTrashOutline className={styles.iconDelete} size={20} />
                    </a>
                </Space>
            ),
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <>
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Produto</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Cadastre produtos para serem anunciados no carrinho</p>
                </>
            }
        >
            <Head title="Produto" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <ProductForm auth={auth.user.id} categories={categories} />
                    </div>
                    <div className={"mt-10"}>
                        <Table columns={columns} dataSource={listProducts}  pagination={{ pageSize: 5 }} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}