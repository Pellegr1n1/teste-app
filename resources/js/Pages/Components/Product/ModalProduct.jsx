import React from 'react';
import { Button, Divider, Image, Modal, message } from 'antd';

const ModalProduct = ({ isModalOpen, closeModal, product }) => {
    console.log(product)
    const handleAddItem = (id) => {
        const storedItems = JSON.parse(localStorage.getItem("cart")) || {};
        storedItems[id] = (storedItems[id] || 0) + 1;
        localStorage.setItem("cart", JSON.stringify(storedItems));
        message.success(`${product.nmproduct} adicionado ao carrinho!`);
    };

    const handleRemoveItem = (id) => {
        const storedItems = JSON.parse(localStorage.getItem("cart")) || {};
        if (storedItems[id] > 0) {
            storedItems[id] -= 1;
            localStorage.setItem("cart", JSON.stringify(storedItems));
            message.success(`${product.nmproduct} removido do carrinho!`);
        }
    };

    return (
        <Modal
            open={isModalOpen}
            onCancel={closeModal}
            footer={[]}
            centered
            destroyOnClose
            width={600}
        >
            <div>
                <div className='flex'>
                    <div>
                        <Image
                            width={200}
                            src={`storage/${product.image}`}
                        />
                        <p className='text-center'>{product.user.name}</p>
                    </div>
                    <div className='w-full'>
                        <p className='text-2xl font-bold text-center'>{product.nmproduct}</p>
                        <Divider className='mt-3' />
                        <p className='mt-5'>Preço: R$ {parseFloat(product.price).toFixed(2)}</p>
                        <p style={{ color: product.qtproduct > 0 ? 'green' : 'red' }}>{product.qtproduct > 0 ? "Em estoque" : "Fora de estoque"}</p>
                        <div className='mt-8'>
                            <Button className='mr-5' onClick={() => handleAddItem(product.id)}>
                                Adicionar no carrinho
                            </Button>
                            <Button danger onClick={() => handleRemoveItem(product.id)}>
                                Remover do carrinho
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ModalProduct;
