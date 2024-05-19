import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { React } from "react";
import CategoryForm from "./Components/Category/CategoryForm";
import { Table, Space, Modal } from "antd";
import { FaRegEdit } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import styles from "./Styles/Category.module.css";
import listCategory from '@/Utils/categoryUtils';

export default function Category({ auth }) {

    const showEdit = () => {
        alert('Editando os dados no forms!')
    };

    const handleDelete = () => {
        Modal.confirm({
            title: "Confirmar exclusão",
            content: "Tem certeza que deseja excluir este produto?",
            okText: "Sim",
            cancelText: "Cancelar",
            onOk() {
                // Lógica para exclusão do produto
                console.log("Produto excluído");
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
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Taxa",
            dataIndex: "tax",
            key: "tax",
        },
        {
            title: "Ações",
            key: "action",
            render: () => (
                <Space size={30}>
                    <a onClick={showEdit}>
                        <FaRegEdit className={styles.iconEdit} size={20} />
                    </a>
                    <a onClick={handleDelete}>
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
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Categoria</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Cadastre categorias para serem utilizadas nos produtos</p>
                </>
            }         >
            <Head title="Categoria" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <CategoryForm />
                    </div>
                    <div className={"mt-10"}>
                        <Table columns={columns} dataSource={listCategory} pagination />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}