import React from 'react';
import { Modal } from 'antd';
import FormAddressModalCart from './FormAddressModalCart';

const ModalRegisterAddress = ({ isModalOpen, closeModal, address }) => {
    return (
        <Modal
            title={Object.keys(address).length > 0 ? "Atualização de Endereço" : "Cadastro de Endereço"}
            open={isModalOpen}
            onCancel={closeModal}
            centered
            destroyOnClose
            footer={[
            ]}
            width={800}
        >
            <FormAddressModalCart closeModal={closeModal} address={address}/>
        </Modal>
    );
};

export default ModalRegisterAddress;
