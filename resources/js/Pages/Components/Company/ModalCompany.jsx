import React, { useEffect } from 'react';
import { Avatar, Button, Divider, Modal, Space, Rate } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import CustomCard from '../Cart/Card';
import styles from '../../Styles/Cart.module.css'

const ModalCompany = ({ isModalOpen, closeModal, products }) => {

    useEffect(() => {
        updateCart();
    }, []);

    const updateCart = () => {
        const storedItems = JSON.parse(localStorage.getItem("cart")) || {};
        let total = 0;
        const items = [];
        for (const id in storedItems) {
            total += storedItems[id];
            if (storedItems[id] > 0) {
                const product = products.find(p => p.id.toString() === id);
                if (product) {
                    items.push({ ...product, quantity: storedItems[id] });
                }
            }
        }
    };

    const handleAddItem = (id) => {
        const storedItems = JSON.parse(localStorage.getItem("cart")) || {};
        storedItems[id] = (storedItems[id] || 0) + 1;
        localStorage.setItem("cart", JSON.stringify(storedItems));
        updateCart();
    };

    const handleRemoveItem = (id) => {
        const storedItems = JSON.parse(localStorage.getItem("cart")) || {};
        if (storedItems[id] > 0) {
            storedItems[id] -= 1;
            localStorage.setItem("cart", JSON.stringify(storedItems));
            updateCart();
        }
    };

    return (
        <Modal
            open={isModalOpen}
            onCancel={closeModal}
            footer={[
                <Button key="close" type="primary" onClick={closeModal}>
                    Fechar
                </Button>
            ]}
            centered
            destroyOnClose
            width={1400}
        >
            <div className='p-5' style={{ width: '100%' }}>
                <div className='flex items-center'>
                    <Avatar
                        size={100}
                        icon={<AntDesignOutlined />}
                        className='mr-5'
                    />
                    <div className='flex w-3/4 items-center'>
                        <div>
                            <p className='m-0 text-3xl'>Nome da Empresa - N&E</p>
                            <p className='m-0'>999.999.999-99</p>
                        </div>
                        <div className='ml-20'>
                            <p className='m-0 font-bold'>Endereço</p>
                            <div className='flex'>
                                <div>
                                    <p className='m-0'>Rua Tatuapé, 371</p>
                                    <p className='m-0'>Itaum</p>
                                </div>
                                <div className='ml-10'>
                                    <p className='m-0'>Joinville - SC</p>
                                </div>
                            </div>
                        </div>
                    </div>
                        <div>
                            <Rate disabled defaultValue={3}/>
                        </div>
                </div>
                <Divider />
                <Space size={[32, 16]} wrap className={styles.cardContainer}>
                    {products.map((product) => {
                        const storedItems = JSON.parse(localStorage.getItem("cart")) || {};
                        const initialQuantity = storedItems[product.id] || 0;
                        return (
                            <CustomCard
                                key={product.id}
                                categoryColor={product.category.color}
                                id={product.id}
                                name={product.nmproduct}
                                price={product.price}
                                stock={product.qtproduct}
                                src={`storage/${product.image}`}
                                initialQuantity={initialQuantity}
                                onAddItem={() => handleAddItem(product.id)}
                                onRemoveItem={() => handleRemoveItem(product.id)}
                                showModal={() => { }}
                            />
                        );
                    })}
                </Space>
            </div>
        </Modal>
    );
};

export default ModalCompany;
