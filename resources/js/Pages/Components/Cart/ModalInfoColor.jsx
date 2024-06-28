import React from 'react';
import { Modal, List } from 'antd';

const ModalInfoColor = ({ isModalOpen, closeModal, categories }) => {
    return (
        <Modal
            title="Informações das Cores das Categorias"
            open={isModalOpen}
            onCancel={closeModal}
            centered
            destroyOnClose
            footer={null}
            width={400}
        >
            <List
                dataSource={categories}
                renderItem={category => (
                    <List.Item>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div
                                style={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: category.color,
                                    marginRight: 10,
                                    borderRadius: 20
                                }}
                            />
                            {category.nmcategory}
                        </div>
                    </List.Item>
                )}
            />
        </Modal>
    );
};

export default ModalInfoColor;
