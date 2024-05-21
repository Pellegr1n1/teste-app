import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import { Table, Tag } from 'antd';
import styles from './Styles/Historic.module.css';
import historicData from '@/Utils/historicUtils'; 
import { FaRegEye } from "react-icons/fa";
import ModalHistoric from './Components/Historic/ModalHistoric';

export default function Historic({ auth }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const columns = [
        {
            title: 'Situação',
            dataIndex: 'situation',
            key: 'situation',
            render: (situation) => (
                <Tag color={situation === 'Realizada com sucesso' ? 'green' : 'red'}>{situation}</Tag>
            ),
            sorter: (a, b) => a.situation.localeCompare(b.situation),
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            render: (total) => `R$ ${total.toFixed(2)}`,
            sorter: (a, b) => a.total - b.total,
        },
        {
            title: 'Data',
            dataIndex: 'date',
            key: 'date'
        },
        {
            title: 'Visualizar',
            key: 'view',
            render: (_, item) => (
                <span onClick={() => setIsModalOpen(true)} className={styles.view}>
                    <FaRegEye size={20} />
                </span>
            ),
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <>
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Histórico</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Explore o seu histórico de compras e aproveite as promoções ao adicionar novos produtos ao seu carrinho.</p>
                </>
            }
        >
            <Head title="Histórico" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className={styles.historic}>
                        <Table columns={columns} dataSource={historicData} pagination />
                    </div>
                    <ModalHistoric isModalOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}