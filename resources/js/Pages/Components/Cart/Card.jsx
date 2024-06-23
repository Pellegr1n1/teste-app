import React, { useState, useEffect } from "react";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { Card } from "antd";
const { Meta } = Card;
import styles from "./Card.module.css";

function CustomCard({ id, name, price, stock, src, updateCart }) {
    let situationStyle = stock > 0 ? "available" : "unavailable";
    let situation = stock > 0 ? "Em estoque" : "Fora de estoque";
    const [addItem, setAddItem] = useState(0);

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem("cart")) || {};
        if (storedItems[id]) {
            setAddItem(storedItems[id]);
        }
    }, [id]);

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem("cart")) || {};
        storedItems[id] = addItem;
        localStorage.setItem("cart", JSON.stringify(storedItems));
        updateCart();
    }, [addItem, id]);

    const handleAddItem = () => {
        setAddItem(addItem + 1);
    };

    const handleRemoveItem = () => {
        if (addItem > 0) {
            setAddItem(addItem - 1);
        }
    };

    return (
        <Card
            cover={<img alt={name} src={src} className={styles.img} />}
            className={stock > 0 ? styles.card : styles.noStock}
            actions={stock > 0 ? [
                <PlusOutlined key="add" onClick={handleAddItem} />,
                <MinusOutlined key="remove" onClick={handleRemoveItem} />,
            ] : null}
            bordered={false}
            hoverable
        >
            <Meta
                title={name}
                description={
                    <div className={styles.desc}>
                        <div>
                            <p>R$ {parseFloat(price).toFixed(2)}</p>
                            <p className={styles[situationStyle]}>{situation}</p>
                        </div>
                        <span>{addItem}</span>
                    </div>
                }
            />
        </Card>
    );
}

export default CustomCard;
