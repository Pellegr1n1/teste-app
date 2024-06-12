import React from 'react';
import { Modal,Row } from 'antd';

const ModalDelete = ({ isModalOpen, closeModal }) => {
    return (
        <Modal
            open={isModalOpen}
            onCancel={closeModal}
            title={"Excluir Registro"}
            okText={"Confirmar"}
            cancelText={"Cancelar"}
        >
            <Row align={'center'}>
                <h3>Tem certeza que deseja deletar este registro?</h3>
            </Row>
        </Modal>
    );
};

export default ModalDelete;
