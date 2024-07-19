import React from 'react';
import { Modal, Button, Skeleton, List, Divider, Avatar, Image } from 'antd';

const ModalCompany = ({ isModalOpen, closeModal, products, product, address }) => {
    if (!product) {
        return null;
    }

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
            style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}
        >
            <div className='p-5' style={{ width: '100%' }}>
                <div className='flex items-center'>
                    <Avatar
                        size={100}
                        src={`storage/${product.user.image}`}
                        className='mr-5'
                    />
                    <div className='flex w-3/4 items-center'>
                        <div>
                            <p className='m-0 text-3xl'>{product.user.name}</p>
                            <p className='m-0'>{product.user.document}</p>
                        </div>
                        {address[0] && <div className='ml-20'>
                            <p className='m-0 font-bold'>Endereço</p>
                            <div className='flex'>
                                <div>
                                    <p className='m-0'>{address[0].street}, {address[0].number}</p>
                                    <p className='m-0'>{address[0].neighborhood}</p>
                                </div>
                                <div className='ml-10'>
                                    <p className='m-0'>{address[0].city} - {address[0].state}</p>
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
                <Divider />
                <List
                    pagination
                    dataSource={products}
                    renderItem={(item, index) => (
                        <List.Item
                            style={{
                                opacity: item.qtproduct === 0 ? 0.5 : 1,
                                pointerEvents: item.qtproduct === 0 ? 'none' : 'auto'
                            }}
                        >
                            <Skeleton avatar title={false} active loading={item.loading}>
                                <List.Item.Meta
                                    avatar={<Image width={50} src={`storage/${item.image}`} />}
                                    title={<p className='text-base'>{item.nmproduct}</p>}
                                    description={
                                        <div>
                                            <p>Empresa</p>
                                            <div className='flex'>
                                                <p className='mr-5'>R$ {parseFloat(item.price).toFixed(2)}</p>
                                                <p style={{ color: item.qtproduct > 0 ? 'green' : 'red' }}>{item.qtproduct > 0 ? "Em estoque" : "Fora de estoque"}</p>
                                            </div>
                                        </div>
                                    }
                                />
                                <div
                                    style={{
                                        width: 15,
                                        height: 15,
                                        backgroundColor: item.category.color,
                                        marginRight: 10,
                                        borderRadius: 15
                                    }}
                                />
                                {item.category.nmcategory}
                            </Skeleton>
                        </List.Item>
                    )}
                />
            </div>

        </Modal>
    );
};

export default ModalCompany;
