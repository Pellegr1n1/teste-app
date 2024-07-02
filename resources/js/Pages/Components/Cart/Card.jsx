import React, { useState, useEffect } from "react";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { Card, Tooltip, Rate, message } from "antd";
const { Meta } = Card;
import styles from "./Card.module.css";

function CustomCard({ id, name, company, product, user, price, stock, src, onAddItem, onRemoveItem, initialQuantity, categoryColor, showModal, rating, ratingsCount }) {
    let situationStyle = stock > 0 ? "available" : "unavailable";
    let situation = stock > 0 ? "Em estoque" : "Fora de estoque";
    const [addItem, setAddItem] = useState(initialQuantity);
    const desc = ['Péssimo', 'Ruim', 'Normal', 'Bom', 'Excelente'];

    useEffect(() => {
        setAddItem(initialQuantity);
    }, [initialQuantity]);

    const handleAddItem = () => {
        if (addItem < stock) {
            setAddItem(addItem + 1);
            onAddItem(id);
        } else {
            message.error(`Você já adicionou o máximo disponível (${stock} unidades)`);
        }
    };

    const handleRemoveItem = () => {
        if (addItem > 0) {
            setAddItem(addItem - 1);
            onRemoveItem(id);
        }
    };

    const handleShowCompany = () => {
        showModal(product, user);
    };

    return (
        <Card
            cover={
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    <img alt={name} src={src} className={styles.img} style={{ marginBottom: '10px' }} />
                    <div style={{ display: 'flex' }}>
                        <Tooltip title={desc[rating - 1]}>
                            <Rate disabled value={rating} />
                        </Tooltip>
                        <span style={{ marginLeft: '10px' }}>({ratingsCount})</span>
                    </div>
                </div >

            }
            style={{ borderTop: `8px solid ${categoryColor}` }}
            className={stock > 0 ? styles.card : styles.noStock}
            actions={stock > 0 ? [
                <Tooltip title={"Adicionar ao carrinho"}> <PlusOutlined key="add" style={{ display: 'flex', justifyContent: 'center' }} onClick={handleAddItem} /></Tooltip>,
                <Tooltip title={"Remover do carrinho"}><MinusOutlined key="remove" style={{ display: 'flex', justifyContent: 'center' }} onClick={handleRemoveItem} /></Tooltip>,
            ] : null}
            bordered={false}
            hoverable
        >
            <Meta
                title={name}
                description={
                    <div>
                        <div className={styles.desc}>
                            <div>
                                <p>R$ {parseFloat(price).toFixed(2)}</p>
                                <p className={styles[situationStyle]}>{situation}</p>
                            </div>
                            <span>{addItem}</span>
                        </div>
                        <a onClick={handleShowCompany}>{company}</a>
                    </div>
                }
            />
        </Card>
    );
}

export default CustomCard;
