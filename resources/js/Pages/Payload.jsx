import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { QRCode, Button, message, Spin } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { useForm } from '@inertiajs/react';

const Payload = ({ payload, auth, total, products }) => {
    const [processingPayment, setProcessingPayment] = useState(false);

    const { post } = useForm({
        total: total,
        tax: 10,
        products: products
    });

    const copyToClipboard = () => {
        navigator.clipboard.writeText(payload);
        message.success('Código copiado para a área de transferência.');
    };

    const simulatePaymentProcessing = () => {
        setProcessingPayment(true);
        setTimeout(() => {
            setProcessingPayment(false);
            message.success('Pagamento verificado com sucesso. Aguarde você será redirecionado!').then(() => {
                localStorage.clear();
                post(route('orders.create'));
            });
        }, 1000);
    };

    return (
        <AuthenticatedLayout
            user={auth}
            header={
                <>
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Pagamento</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400"> Realize o pagamento através do QR Code ou copie e cole o código.</p>
                </>
            }
        >
            <Head title="Pagamento" />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2 style={{ marginTop: '20px' }}>Valor total da compra R$ {total}</h2>
                <QRCode bgColor='#FFF' value={payload} style={{ margin: '20px auto' }} size={250} />
                <Button
                    type="primary"
                    icon={<CopyOutlined />}
                    style={{ margin: '10px', width: '250px' }}
                    onClick={copyToClipboard}
                >
                    Copiar Código
                </Button>
                <Button
                    style={{ width: '250px', marginTop: '10px' }}
                    onClick={simulatePaymentProcessing}
                    disabled={processingPayment}
                >
                    {processingPayment ? (
                        <Spin />
                    ) : (
                        'Realizei o Pagamento'
                    )}
                </Button>
            </div>
        </AuthenticatedLayout>
    );
};

export default Payload;
