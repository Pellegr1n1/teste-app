import { useRef, useState } from 'react';
import InputError from '@/Components/InputError';
import { Modal, Button, Form, message, Input } from 'antd';
import { useForm } from '@inertiajs/react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
                message.success('Conta deletada com sucesso.');
            },
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-900">Deletar Conta</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Depois que sua conta for excluída, todos os seus recursos e dados serão excluídos permanentemente. Antes
                    de excluir sua conta, baixe quaisquer dados ou informações que você deseja reter.
                </p>
            </header>

            <Button type='primary' onClick={confirmUserDeletion} className="h-[40px] w-[120px]" danger>
                Deletar Conta
            </Button>

            <Modal
                title="Tem certeza de que deseja excluir sua conta?"
                open={confirmingUserDeletion}
                onCancel={closeModal}
                footer={[]}
            >
                <Form layout="vertical" onSubmit={deleteUser}>
                    <Form.Item label="Senha" validateStatus={errors.password ? 'error' : ''} help={errors.password}>
                        <Input.Password
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            ref={passwordInput}
                            placeholder="Senha"
                            className='h-[42px]'
                        />
                    </Form.Item>
                    <Form.Item className='flex justify-end'>
                        <Button key="cancel" onClick={closeModal} className="h-[40px] w-[120px]">
                            Cancelar
                        </Button>
                        <Button key="delete" type="primary" onClick={deleteUser} loading={processing} danger className="h-[40px] w-[120px] ms-4">
                            Deletar Conta
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </section>
    );
}
