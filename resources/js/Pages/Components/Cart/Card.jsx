import React, { useState, useEffect } from "react";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { Card, Tooltip } from "antd";
const { Meta } = Card;
import styles from "./Card.module.css";

function CustomCard({ id, name, price, stock, src, onAddItem, onRemoveItem, initialQuantity, categoryColor, showModal }) {
    let situationStyle = stock > 0 ? "available" : "unavailable";
    let situation = stock > 0 ? "Em estoque" : "Fora de estoque";
    const [addItem, setAddItem] = useState(initialQuantity);
    const [showCompany, setShowCompany] = useState(false);

    useEffect(() => {
        setAddItem(initialQuantity);
    }, [initialQuantity]);

    const handleAddItem = () => {
        setAddItem(addItem + 1);
        onAddItem(id);
    };

    const handleRemoveItem = () => {
        if (addItem > 0) {
            setAddItem(addItem - 1);
            onRemoveItem(id);
        }
    };

    const handleShowCompany = () => {
        showModal();
    };

    return (
        <Card
            cover={<img alt={name} src={src} className={styles.img} />}
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
                        <a onClick={handleShowCompany}>Empresa</a>
                    </div>
                }
            />
        </Card>
    );
}

export default CustomCard;
