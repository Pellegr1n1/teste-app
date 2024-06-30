import React from 'react';
import { Modal, Table } from 'antd';

const ModalHistoric = ({ isModalOpen, closeModal, order }) => {
    const columns = [
        {
            title: 'Produto',
            dataIndex: 'nmproduct',
            key: 'nmproduct',
        },
        {
            title: 'Quantidade',
            dataIndex: 'qtproduct',
            key: 'qtproduct',
        },
        {
            title: 'Preço',
            dataIndex: 'price',
            key: 'price',
            render: (price) => `R$ ${parseFloat(price).toFixed(2)}`,
        },
    ];

    return (
        <Modal
            title="Itens do Pedido"
            visible={isModalOpen}
            onCancel={closeModal}
            footer={null}
        >
            {order && <Table columns={columns} dataSource={order.items} rowKey="id" />}
        </Modal>
    );
};

export default ModalHistoric;
