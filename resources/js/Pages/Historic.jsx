import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { Table, Tooltip } from 'antd';
import { jsPDF } from "jspdf";
import styles from './Styles/Historic.module.css';
import { FaEye, FaDownload } from "react-icons/fa";
import ModalHistoric from './Components/Historic/ModalHistoric';

export default function Historic({ auth, orders }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        console.log(orders);
    }, [orders]);

    const generatePDF = (order) => {
        const doc = new jsPDF();
        doc.setFontSize(12);

        doc.text("Cupom Fiscal", 20, 20);
        doc.text(`ID do Pedido: ${order.id}`, 20, 30);
        doc.text(`Data do Pedido: ${new Date(order.created_at).toLocaleDateString()}`, 20, 40);
        doc.text(`Taxa: R$ ${parseFloat(order.tax).toFixed(2)}`, 20, 50);
        doc.text(`Total a pagar: R$ ${parseFloat(order.total).toFixed(2)}`, 20, 60);
        doc.text("Produtos:", 20, 70);

        order.items.forEach((item, index) => {
            doc.text(
                `${item.nmproduct} - ${item.qtproduct} x R$ ${parseFloat(item.price).toFixed(2)} = R$ ${(item.price * item.qtproduct).toFixed(2)}`,
                20,
                80 + (index * 10)
            );
        });

        doc.text(`Total: R$ ${parseFloat(order.total).toFixed(2)}`, 20, 90 + (order.items.length * 10) + 10);
        doc.save("cupom_fiscal.pdf");
    };

    const viewOrderItems = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            align: 'center',
            key: 'id',
        },
        {
            title: 'Total',
            dataIndex: 'total',
            align: 'center',
            key: 'total',
            render: (total) => `R$ ${parseFloat(total).toFixed(2)}`,
            sorter: (a, b) => parseFloat(a.total) - parseFloat(b.total),
        },
        {
            title: 'Tax',
            dataIndex: 'tax',
            align: 'center',
            key: 'tax',
            render: (tax) => `R$ ${parseFloat(tax).toFixed(2)}`,
        },
        {
            title: 'Data',
            dataIndex: 'created_at',
            align: 'center',
            key: 'created_at',
            render: (date) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Ações',
            align: 'center',
            key: 'actions',
            render: (_, order) => (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Tooltip title='Visualizar Produtos'>
                        <span onClick={() => viewOrderItems(order)} style={{ marginRight: '15px' }} className={styles.view}>
                            <FaEye size={20} color='#01344a' />
                        </span>
                    </Tooltip>
                    <Tooltip title='Baixar Cupom Fiscal'>
                        <span onClick={() => generatePDF(order)} className={styles.view}>
                            <FaDownload size={16} color='#01344a' />
                        </span>
                    </Tooltip>
                </div>
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
                        <Table columns={columns} dataSource={orders} pagination />
                    </div>
                    <ModalHistoric
                        isModalOpen={isModalOpen}
                        closeModal={() => setIsModalOpen(false)}
                        order={selectedOrder}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
