import React from 'react';
import { Modal, Button } from 'antd';
import FormAddressModalCart from './FormAddressModalCart';

const ModalRegisterAddress = ({ isModalOpen, closeModal }) => {
    return (
        <Modal
            title="Cadastro de Endereço"
            open={isModalOpen}
            onCancel={closeModal}
            centered
            destroyOnClose
            footer={[
                <Button key="cancel" onClick={closeModal}>
                    Cancelar
                </Button>
            ]}
        >
            <FormAddressModalCart />
        </Modal>
    );
};

export default ModalRegisterAddress;
