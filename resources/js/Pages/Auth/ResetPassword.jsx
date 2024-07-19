import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { Form, Input, Button, message } from 'antd';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = () => {
        post(route('password.store'), {
            onSuccess: () => {
                message.success('Senha redefinida com sucesso!');
            },
            onError: (error) => {
                message.error('Erro ao redefinir senha!');
                console.error('Erro ao redefinir senha:' + error);
            }
        });
    };

    return (
        <GuestLayout>
            <Head title="Redefinir Senha" />

            <Form onFinish={submit} layout="vertical" className="reset-password-form">
                <Form.Item
                    label="Email"
                    validateStatus={errors.email ? 'error' : ''}
                    help={errors.email}
                >
                    <Input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                        style={{ borderRadius: '6px', borderColor: "#d9d9d9" }}
                    />
                </Form.Item>

                <Form.Item
                    label="Senha"
                    validateStatus={errors.password ? 'error' : ''}
                    help={errors.password}
                >
                    <Input.Password
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        required
                        autoComplete="new-password"
                        style={{ borderRadius: '6px', height: '42px', borderColor: "#d9d9d9" }}
                    />
                </Form.Item>

                <Form.Item
                    label="Confirmar Senha"
                    validateStatus={errors.password_confirmation ? 'error' : ''}
                    help={errors.password_confirmation}
                >
                    <Input.Password
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                        autoComplete="new-password"
                        style={{ borderRadius: '6px', height: '42px', borderColor: "#d9d9d9" }}
                    />
                </Form.Item>

                <Form.Item>
                    <div className="flex items-center justify-end">
                        <Button type="primary" htmlType="submit" loading={processing} className="ms-4">
                            Redefinir Senha
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </GuestLayout>
    );
}
