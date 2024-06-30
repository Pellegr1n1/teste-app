import React, { useState, useEffect } from "react";
import { Modal, Table, Steps, Button } from "antd";
import styles from "./ModalCart.module.css";
import CardAddress from "./CardAddress";
import { useForm } from '@inertiajs/react';

const ModalCart = ({ isModalOpen, closeModal, cartItems, listAddress }) => {
    const [disabledButton, setDisabledButton] = useState(false);

    const { post, data, setData, } = useForm({
        total: 0,
        products: cartItems
    });

    useEffect(() => {
        const updatedCartItems = cartItems.map(item => ({
            ...item,
            qtproduct: item.quantity
        }));

        const total = updatedCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

        setData({
            total: total.toFixed(2),
            products: updatedCartItems
        });
        if (cartItems.length === 0) {
            setDisabledButton(true);
        } else {
            setDisabledButton(false);
        }
    }, [cartItems]);


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
                <CardAddress list={listAddress} disabledButton={setDisabledButton} />
            </>
        );
    };

    const payloadGenerate = () => {
        post(route('payload.create'));
    }

    const tab3 = () => {
        return (
            <div className={styles.teste}>
                <b>Informações</b>
                <p style={{ color: '#2E4369' }}>Total a pagar: R$ {data.total}</p>
                <p style={{ fontSize: '16px' }}>Por favor, note que aceitamos apenas pagamentos via PIX. Deseja finalizar sua a compra?</p>
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
    ];

    const [current, setCurrent] = useState(0);
    const next = () => {
        if (data.total < 0) {
            setDisabledButton(true);
        } else if (listAddress.length === 0) {
            setDisabledButton(true);
        } else {
            setDisabledButton(false);
        }
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
        setDisabledButton(false);
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
                    <Button type="primary" disabled={disabledButton} onClick={() => next()}>
                        Próximo
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button
                        type="primary"
                        onClick={() => {
                            payloadGenerate();
                        }}
                    >
                        Finalizar
                    </Button>
                )}
                {current != 2 && (
                    <Button style={{ margin: "0 8px" }} disabled={current != 0 ? false : true} onClick={() => prev()}>
                        Anterior
                    </Button>
                )}
                {current === 2 && (
                    <Button style={{ margin: "0 8px" }} onClick={() => {
                        setCurrent(0);
                        closeModal();
                    }}>
                        Cancelar
                    </Button>
                )}
            </div>
        </Modal>
    );
};

export default ModalCart;
