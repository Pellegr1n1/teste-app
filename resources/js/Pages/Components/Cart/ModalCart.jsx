import React, { useState, useEffect } from "react";
import { Modal, Table, Steps, Button, QRCode } from "antd";
import { jsPDF } from "jspdf";
import styles from "./ModalCart.module.css";
import CardAddress from "./CardAddress";
import { useForm } from '@inertiajs/react';

const ModalCart = ({ isModalOpen, closeModal, cartItems, listAddress }) => {
    const [text, setText] = useState("https://ant.design/");
    const [totalAmount, setTotalAmount] = useState(0);

    const { post, data, setData, } = useForm({
        total: ''
    });

    useEffect(() => {
        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setData('total', total.toFixed(2));
        setTotalAmount(total);
    }, [cartItems]);


    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(12);
        doc.text("Cupom Fiscal", 20, 20);
        doc.text(`Total a pagar: R$ ${totalAmount.toFixed(2)}`, 20, 30);
        doc.text("Produtos:", 20, 40);

        cartItems.forEach((item, index) => {
            doc.text(
                `${item.nmproduct} - ${item.quantity} x R$ ${parseFloat(item.price).toFixed(2)} = R$ ${(item.price * item.quantity).toFixed(2)}`,
                20,
                50 + (index * 10)
            );
        });

        doc.text(`Total: R$ ${totalAmount.toFixed(2)}`, 20, 50 + (cartItems.length * 10) + 10);
        doc.save("cupom_fiscal.pdf");
    };


    const columns = [
        {
            title: "Produto",
            dataIndex: "product",
            key: "product",
        },
        {
            title: "Preço",
            dataIndex: "price",
            key: "price",
            render: (price) => `R$ ${parseFloat(price).toFixed(2)}`,
        },
        {
            title: "Quantidade",
            dataIndex: "qtd",
            key: "qtd",
        },
        {
            title: "Total",
            dataIndex: "total",
            key: "total",
            render: (total) => `R$ ${parseFloat(total).toFixed(2)}`,
        },
    ];

    const tab1 = () => {
        return (
            <Table
                dataSource={cartItems.map(item => ({
                    key: item.id,
                    product: item.nmproduct,
                    price: item.price,
                    qtd: item.quantity,
                    total: item.price * item.quantity,
                }))}
                columns={columns}
                pagination={false}
            />
        );
    };

    const tab2 = () => {
        return (
            <>
                <CardAddress list={listAddress} />
            </>
        );
    };

    const tab3 = () => {
        const acceptPix = () => {
            post(route('payload.create'));
        }

        return (
            <div className={styles.teste}>
                <b>Informações</b>
                <p style={{ color: '#2E4369' }}>Total a pagar: R$ {totalAmount.toFixed(2)}</p>
                <p style={{ fontSize: '16px' }}>Por favor, note que aceitamos apenas pagamentos via PIX. Deseja continuar com a compra?</p>
                <div>
                    <Button onClick={() => acceptPix()} style={{ width: '100px', marginRight: '15px' }}>Sim</Button>
                    <Button style={{ width: '100px' }} danger>Cancelar</Button>
                </div>
            </div>
        );
    };


    const tab4 = () => {
        return (
            <div className={styles.receipt}>
                <Button type="primary" onClick={generatePDF}>Baixar Cupom Fiscal</Button>
            </div>
        );
    };

    const steps = [
        {
            title: "Produtos",
            content: tab1(),
        },
        {
            title: "Endereço",
            content: tab2(),
        },
        {
            title: "Pagamento",
            content: tab3(),
        },
        {
            title: "Cupom Fiscal",
            content: tab4(),
        },
    ];

    const [current, setCurrent] = useState(0);
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));

    return (
        <Modal
            open={isModalOpen}
            onCancel={closeModal}
            footer={null}
            centered
            destroyOnClose
            width={1000}
        >
            <Steps current={current} items={items} style={{ marginTop: "20px" }} />
            <div className={styles.content}>{steps[current].content}</div>
            <div style={{ marginTop: 24 }}>
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Próximo
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button
                        type="primary"
                        onClick={() => closeModal()}
                    >
                        Concluir
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                        Anterior
                    </Button>
                )}
            </div>
        </Modal>
    );
};

export default ModalCart;
