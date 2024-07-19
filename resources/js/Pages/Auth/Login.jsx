import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Form, Input, Button, Checkbox, message } from 'antd';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = () => {
        post(route('login'), {
            onSuccess: () => {
                message.success('Login realizado com sucesso!');
            },
            onError: (error) => {
                message.error('Erro ao realizar login!');
                console.error('Erro ao realizar login:' + error);
            }
        });
    };

    return (
        <GuestLayout>
            <Head title="Login" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <Form onFinish={submit} layout="vertical" className="login-form">
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
                        autoComplete="current-password"
                        style={{ borderRadius: '6px', height: '42px', borderColor: "#d9d9d9" }}
                    />
                </Form.Item>

                <Form.Item>
                    <Checkbox
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                    >
                        Lembrar-se de mim
                    </Checkbox>
                </Form.Item>

                <Form.Item>
                    <div className="flex items-center justify-end">
                        <Link
                            href={route('register')}
                            className="underline text-sm text-gray-500 mr-5 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Registrar-se
                        </Link>
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="underline text-sm text-gray-500 mr-5 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Esqueceu a senha?
                            </Link>
                        )}
                        <Button type="primary" htmlType="submit" loading={processing} className="h-[40px] w-[100px]">
                            Login
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </GuestLayout>
    );
}
