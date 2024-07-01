import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { React, useState, useEffect } from "react";
import CategoryForm from "./Components/Category/CategoryForm";
import { Table, Space, Modal, ColorPicker, message } from "antd";
import { FaRegEdit } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import styles from "./Styles/TableActionIcon.module.css";
import { useForm } from '@inertiajs/react';

const Category = ({ auth, categories, category }) => {
    const [data, setData] = useState([]);

    const {
        delete: destroy,
        get
    } = useForm();

    useEffect(() => {
        setData(categories);
    }, [categories]);

    const handleEdit = (id) => {
        message.info('Você entrou em modo edição, para sair clique em cancelar!');
        get(route('categories.edit', { id: id }));
    };

    const handleDelete = (id) => {
        Modal.confirm({
            title: "Confirmar exclusão",
            content: "Tem certeza que deseja excluir esta categoria?",
            okText: "Sim",
            cancelText: "Cancelar",
            onOk() {
                destroy(route('categories.destroy', { id: id }), {
                    onSuccess: () => {
                        message.success('Categoria excluída com sucesso!');
                    },
                    onError: (error) => {
                        message.error('Erro ao excluir a categoria!');
                        console.error('Erro ao excluir a categoria!', error);
                    }
                });
            }

        })
    };

    const columns = [
        {
            width: '15%',
            title: "Cor",
            align: 'center',
            dataIndex: "color",
            key: "color",
            render: (_, record) => (
                <ColorPicker value={record.color} disabled />
            ),
        },
        {
            width: '35%',
            title: "Nome",
            align: 'center',
            dataIndex: "nmcategory",
            key: "nmcategory",
        },
        {
            width: '25%',
            title: "Taxa",
            align: 'center',
            dataIndex: "tax",
            key: "tax",
        },
        {
            width: '25%',
            title: "Ações",
            align: 'center',
            key: "action",
            render: (_, record) => (
                <Space size={30}>
                    <a onClick={() => handleEdit(record.id)}>
                        <FaRegEdit className={styles.iconEdit} size={20} />
                    </a>
                    <a onClick={() => handleDelete(record.id)}>
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
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <CategoryForm editCategory={category} auth={auth.user.id} />
                    </div>
                    <div className={"mt-10"}>
                        <Table columns={columns} dataSource={data} size='large' pagination={{ pageSize: 5 }} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Category;
