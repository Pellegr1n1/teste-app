import React, { useState, useEffect } from "react";
import { Card, Button, Modal } from 'antd';
import ModalRegisterAddress from "./ModalRegisterAddress";
import location from "@/Assets/Images/location.png";
import confirm from "@/Assets/Images/confirm.png";
import { CaretRightOutlined, CaretLeftOutlined } from '@ant-design/icons';
import { Divider } from "antd";
import styles from "./CardAddress.module.css";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from '@inertiajs/react';

export default function CardAddress({ list }) {
    const [pageIndex, setPageIndex] = useState(0);
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
    const [showRegisterAddress, setShowRegisterAddress] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const addressesPerPage = 2;
    const totalPages = Math.ceil(list.length / addressesPerPage);
    const startAddressIndex = pageIndex * addressesPerPage;
    const endAddressIndex = Math.min(startAddressIndex + addressesPerPage, list.length);

    const {
        delete: destroy,
        put
    } = useForm();

    const nextAddress = (e) => {
        e.stopPropagation();
        setPageIndex((prevIndex) => Math.min(prevIndex + 1, totalPages - 1));
    };

    const prevAddress = (e) => {
        e.stopPropagation();
        setPageIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const selectAddress = (index) => {
        setSelectedAddressIndex(index);
    };

    const handleEditClick = (id) => {

    };

    const handleDeleteClick = (id) => {
        Modal.confirm({
            title: "Confirmar exclusão",
            content: "Tem certeza que deseja excluir este endereço?",
            okText: "Sim",
            cancelText: "Cancelar",
            onOk() {
                destroy(route('address.destroy', { id: id }))
            },
        });
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <Button onClick={prevAddress} disabled={pageIndex === 0} shape="circle" icon={<CaretLeftOutlined />} style={{ fontSize: '20px', width: '40px', height: '40px' }} />
                <h3>{`${pageIndex + 1} / ${totalPages}`}</h3>
                <Button onClick={nextAddress} disabled={pageIndex === totalPages - 1} shape="circle" icon={<CaretRightOutlined />} style={{ fontSize: '20px', width: '40px', height: '40px' }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {list.slice(startAddressIndex, endAddressIndex).map((addr, index) => (
                    <Card
                        key={index}
                        style={{
                            width: 450,
                            marginBottom: '20px',
                            cursor: 'pointer',
                            backgroundColor: selectedAddressIndex === startAddressIndex + index ? '#befac4' : 'inherit',
                            border: selectedAddressIndex === startAddressIndex + index ? '2px solid #75b226' : '1px solid #EFEFEF'
                        }}
                        bordered
                        onClick={() => selectAddress(startAddressIndex + index)}
                    >
                        <div className={styles.cardAddress}>
                            <div className={styles.textAddress}>
                                <p className={styles.street}>{addr.street}</p>
                                <p>CEP: {addr.cep}</p>
                                <p>{addr.street}, {addr.number}</p>
                                <p>Bairro: {addr.neighborhood}</p>
                                <p>Cidade: {addr.city}, {addr.state}</p>
                            </div>
                            <Divider type="vertical" style={{ height: '150px' }} />
                            <div>
                                <img src={selectedAddressIndex === startAddressIndex + index ? confirm : location} alt="Card Location" />
                                <div className={styles.actions}>
                                    <a onClick={() => handleEditClick(addr.id)}>
                                        <FaEdit color="grey" className={styles.edit} />
                                    </a>
                                    <a onClick={() => handleDeleteClick(addr.id)}>
                                        <FaRegTrashCan color="grey" className={styles.remove} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
            {list.length < 4 && (
                <>
                    <PrimaryButton style={{ width: '100%' }} onClick={() => setShowRegisterAddress(true)}>Cadastrar Novo Endereço</PrimaryButton>
                    <ModalRegisterAddress isModalOpen={showRegisterAddress} closeModal={() => setShowRegisterAddress(false)} />
                </>
            )}
        </div>
    )
}
