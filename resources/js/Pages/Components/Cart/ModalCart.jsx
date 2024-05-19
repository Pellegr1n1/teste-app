import React, { useState } from "react";
import { Modal, Table, Steps, Button, QRCode } from "antd";
import historicView from "@/Utils/historicViewUtils";
import styles from "./ModalCart.module.css";

const ModalHistoric = ({ isModalOpen, closeModal }) => {
    const [filteredHistoricView, setFilteredHistoricView] =
        useState(historicView);
    const [text, setText] = React.useState("https://ant.design/");

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
                dataSource={filteredHistoricView}
                columns={columns}
                pagination={false}
            />
        );
    };

    const tab2 = () => {
        return (
            <div className={styles.teste}>
                <h2>Informações</h2>
                <p>Total a pagar: R$ 20,00</p>
                <p>Impostos: R$ 5,00</p>
                <QRCode value={text || "-"} style={{ marginTop: '20px' }} />
                <p style={{ marginTop: '10px' }}>Você tem 5 minutos para realizar o pagamento</p>
            </div>
        );
    };

    const steps = [
        {
            title: "Produtos",
            content: tab1(),
        },
        {
            title: "Pagamento",
            content: tab2(),
        },
        {
            title: "Cupom Fiscal",
            content: "Cupom Fiscal",
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
            width={700}
        >
            <Steps current={current} items={items} style={{ marginTop: "20px" }} />
            <div className={styles.content}>{steps[current].content}</div>
            <div style={{ marginTop: 24 }}>
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button
                        type="primary"
                        onClick={() => closeModal()}
                    >
                        Done
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                        Previous
                    </Button>
                )}
            </div>
        </Modal>
    );
};

export default ModalHistoric;