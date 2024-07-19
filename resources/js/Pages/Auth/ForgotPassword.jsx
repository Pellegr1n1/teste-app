import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Form, Input, Button, message } from 'antd';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = () => {
        post(route('password.email'), {
            onSuccess: () => {
                message.success('Um email de redefinição foi enviado para você!');
            },
            onError: (error) => {
                message.error('Erro ao enviar email de redefinição!');
                console.error('Erro ao enviar email de redefinição:' + error);
            }
        });
    };

    return (
        <GuestLayout>
            <Head title="Esqueci minha senha" />

            <div className="mb-4 text-sm text-gray-600">
                Esqueceu sua senha? Sem problemas. Basta nos informar seu endereço de e-mail e enviaremos por e-mail um link de redefinição de senha que permitirá que você escolha uma nova.
            </div>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <Form onFinish={submit} layout="vertical" className="forgot-password-form">
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

                <Form.Item>
                    <div className="flex items-center justify-end">
                        <Link
                            href={route('login')}
                            className="underline text-sm text-gray-500 mr-5 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Voltar para login?
                        </Link>
                        <Button type="primary" htmlType="submit" loading={processing} className="h-[40px] w-[120px] ms-4">
                            Redefinir Senha
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </GuestLayout>
    );
}
