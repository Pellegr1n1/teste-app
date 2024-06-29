import React, { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { QRCode, Button, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

const Payload = ({ payload, auth, total }) => {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(payload);
        message.success('Código copiado para a área de transferência.');
    };

    useEffect(() => {
        localStorage.removeItem('cart');
    })

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
                <QRCode value={payload} style={{ margin: '20px auto' }} size={250} />
                <Button
                    type="primary"
                    icon={<CopyOutlined />}
                    style={{ marginTop: '10px' }}
                    onClick={copyToClipboard}
                >
                    Copiar Código
                </Button>
            </div>
        </AuthenticatedLayout>
    );
};

export default Payload;
