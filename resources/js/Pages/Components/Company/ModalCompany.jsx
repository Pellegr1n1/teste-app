import React from 'react';
import { Modal, Button, Skeleton, List, Divider, Avatar, Rate, Image } from 'antd';
import { AntDesignOutlined  } from '@ant-design/icons';

const ModalCompany = ({ isModalOpen, closeModal, products, product }) => {
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
                            <p className='m-0 text-3xl'>{product.user.name}</p>
                            <p className='m-0'>{product.user.document}</p>
                        </div>
                        <div className='ml-20'>
                            <p className='m-0 font-bold'>Endereço</p>
                            <div className='flex'>
                                <div>
                                    <p className='m-0'>{product.address.street}, {product.address.number}</p>
                                    <p className='m-0'>{product.address.neighborhood}</p>
                                </div>
                                <div className='ml-10'>
                                    <p className='m-0'>{product.address.city} - {product.address.state}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Rate disabled defaultValue={3} />
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
