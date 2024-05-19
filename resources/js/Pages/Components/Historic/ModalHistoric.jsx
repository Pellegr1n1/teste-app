import React from 'react';
import { Modal, Table } from 'antd';
import historicView from '@/Utils/historicViewUtils';

const ModalHistoric = ({ isModalOpen, closeModal }) => {
    const columns = [
        {
            title: 'Produto',
            dataIndex: 'product',
            key: 'product',
        },
        {
            title: 'Preço',
            dataIndex: 'price',
            key: 'price',
            render: (price) => `R$ ${price.toFixed(2)}`,
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: 'Quantidade',
            dataIndex: 'qtd',
            key: 'qtd',
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            render: (total) => `R$ ${total.toFixed(2)}`,
            sorter: (a, b) => a.total - b.total,
        },
    ];

    return (
        <Modal
            title="Dados da Compra"
            open={isModalOpen}
            onCancel={closeModal}
            footer={<h1>THINGS & FOODS</h1>}
            centered
            destroyOnClose
            width={800}
        >
            <Table columns={columns} dataSource={historicView} pagination />
        </Modal>
    );
};

export default ModalHistoric;