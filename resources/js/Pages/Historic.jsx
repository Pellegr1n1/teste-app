import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Table, Tooltip, Modal, Rate } from 'antd';
import { jsPDF } from "jspdf";
import styles from './Styles/Historic.module.css';
import { FaEye, FaDownload, FaStar, FaExclamationCircle } from "react-icons/fa";
import ModalHistoric from './Components/Historic/ModalHistoric';

export default function Historic({ auth, orders, unavaliatedOrders }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [rateModalOpen, setRateModalOpen] = useState(false);
    const [selectedRateOrder, setSelectedRateOrder] = useState(null);

    const desc = ['Péssimo', 'Ruim', 'Normal', 'Bom', 'Excelente'];

    const { post, setData } = useForm({
        idorder: null,
        value: 0
    });

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

    const openRateModal = (order) => {
        setSelectedRateOrder(order);
        setRateModalOpen(true);
    };

    const avaliableOrder = () => {
        post(route('avaliable.create'));
        setRateModalOpen(false);
        setSelectedRateOrder(null);
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
            title: 'Avaliação',
            dataIndex: 'avaliables',
            align: 'center',
            key: 'avaliables',
            render: (avaliables, order) => (
                unavaliatedOrders.includes(order.id) ? (
                    <Tooltip title='Avaliação pendente'>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <FaExclamationCircle color='red' />
                        </div>
                    </Tooltip>
                ) : (
                    <Tooltip title={desc[avaliables[0].value - 1]
                    }>
                        <Rate disabled value={avaliables.length > 0 ? parseFloat(avaliables[0].value) : 0} />
                    </Tooltip>
                )
            ),
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
                        <span onClick={() => generatePDF(order)} style={{ marginRight: '15px' }} className={styles.view}>
                            <FaDownload size={16} color='#01344a' />
                        </span>
                    </Tooltip>
                    {unavaliatedOrders.includes(order.id) && (
                        <Tooltip title='Avaliar'>
                            <span onClick={() => openRateModal(order)} className={styles.view}>
                                <FaStar size={18} color='#01344a' />
                            </span>
                        </Tooltip>
                    )}
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
                    <Modal
                        title="Avaliação do Pedido"
                        visible={rateModalOpen}
                        onOk={avaliableOrder} // Chama a função ao pressionar OK
                        onCancel={() => setRateModalOpen(false)}
                    >
                        {selectedRateOrder && (
                            <div style={{ textAlign: 'center' }}>
                                <p style={{ fontSize: '16px', fontWeight: 400 }}>Avalie seu pedido ID: {selectedRateOrder.id}</p>
                                <Rate
                                    tooltips={desc}
                                    defaultValue={1}
                                    onChange={(value) => {
                                        setData({
                                            idorder: selectedRateOrder.id,
                                            value: value < 1 ? 1 : value
                                        });
                                    }}
                                />
                            </div>
                        )}

                    </Modal>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}