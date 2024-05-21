import React, { useState } from "react";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { Card } from "antd";
const { Meta } = Card;
import styles from "./Card.module.css";

function CustomCard({ name, price, stock, src }) {
    let situation = stock === "Em estoque" ? "available" : "unavailable";
    const [addItem, setAddItem] = useState(0);

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
            className={stock !== "Fora de estoque" ? styles.card : styles.noStock}
            actions={stock !== "Fora de estoque" ? [
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
                            <p className={styles[situation]}>{stock}</p>
                        </div>
                        <span>{addItem}</span>
                    </div>
                }
            />
        </Card>
    );
}

export default CustomCard;