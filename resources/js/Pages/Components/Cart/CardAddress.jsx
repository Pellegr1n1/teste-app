import React, { useState } from "react";
import { Card, Button, Modal } from 'antd';
import ModalRegisterAddress from "./ModalRegisterAddress";
import location from "@/Assets/Images/location.png";
import confirm from "@/Assets/Images/confirm.png";
import { CaretRightOutlined, CaretLeftOutlined } from '@ant-design/icons';
import { Divider } from "antd";
import styles from "./CardAddress.module.css";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { useForm } from '@inertiajs/react';

export default function CardAddress({ list, disabledButton, selectIndex }) {
    const [pageIndex, setPageIndex] = useState(0);
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
    const [showRegisterAddress, setShowRegisterAddress] = useState(false);
    const addressesPerPage = 2;
    const totalPages = Math.ceil(list.length / addressesPerPage);
    const startAddressIndex = pageIndex * addressesPerPage;
    const endAddressIndex = Math.min(startAddressIndex + addressesPerPage, list.length);
    const [addressSelect, setAddressSelect] = useState({});

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
        setSelectedAddressIndex(index === selectedAddressIndex ? null : index);
        selectIndex(index === selectedAddressIndex ? null : index);
        disabledButton(false);
    };

    const handleEditClick = (e, address) => {
        e.stopPropagation();
        setShowRegisterAddress(true);
        setAddressSelect(address);
    };

    const handleDeleteClick = (e, id) => {
        e.stopPropagation();
        Modal.confirm({
            title: "Confirmar exclusão",
            content: "Tem certeza que deseja excluir este endereço?",
            okText: "Sim",
            cancelText: "Cancelar",
            onOk() {
                disabledButton(true);
                destroy(route('address.destroy', { id: id }))
            },
        });
    };

    const handleAddNewAddress = () => {
        setShowRegisterAddress(true);
        setAddressSelect({});
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
                                    <a onClick={(e) => handleEditClick(e, addr)}>
                                        <FaEdit className={styles.edit} />
                                    </a>
                                    <a onClick={(e) => handleDeleteClick(e, addr.id)}>
                                        <FaRegTrashCan className={styles.remove} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
            {list.length < 4 && (
                <>
                    <Button style={{ width: '100%', height: '40px' }} onClick={handleAddNewAddress}>Cadastrar Novo Endereço</Button>
                    <ModalRegisterAddress address={addressSelect} isModalOpen={showRegisterAddress} closeModal={() => setShowRegisterAddress(false)} />
                </>
            )}
        </div>
    )
}
