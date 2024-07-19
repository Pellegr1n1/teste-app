import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Form, Input, Button, message, Switch } from 'antd';
import InputMask from 'react-input-mask';

export default function Register() {
    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
        setIsChecked(!isChecked);
        setData('type', !isChecked ? 'company' : 'client');
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        document: '',
        type: 'client'
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = () => {
        post(route('register'), {
            onSuccess: () => {
                message.success('Registro realizado com sucesso!');
            },
            onError: (error) => {
                message.error('Erro ao realizar registro!');
                console.error('Erro ao realizar registro:' + error);
            }
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <Form onFinish={submit} layout="vertical" className="register-form">
                <Form.Item>
                    <div className='flex items-center'>
                        <Switch
                            checked={isChecked}
                            onChange={handleToggle}
                        />
                        {isChecked ?
                            <p className='ml-2'>Cadastrar pessoa jurídica/empresa</p>
                            :
                            <p className='ml-2'>Cadastrar pessoa física</p>
                        }
                    </div>
                </Form.Item>

                <Form.Item
                    label="Documento"
                    validateStatus={errors.document ? 'error' : ''}
                    help={errors.document}
                >
                    <InputMask
                        mask={isChecked ? "99.999.999/9999-99" : "999.999.999-99"}
                        placeholder={isChecked ? "CNPJ" : "CPF"}
                        value={data.document}
                        onChange={(e) => setData('document', e.target.value)}
                        required
                    >
                        {(inputProps) => <Input {...inputProps} style={{ borderRadius: '6px', borderColor: "#d9d9d9" }} />}
                    </InputMask>
                </Form.Item>

                <Form.Item
                    label="Nome"
                    validateStatus={errors.name ? 'error' : ''}
                    help={errors.name}
                >
                    <Input
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        autoComplete="name"
                        style={{ borderRadius: '6px', borderColor: "#d9d9d9" }}
                    />
                </Form.Item>

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
                        <Link
                            href={route('login')}
                            className="underline text-sm text-gray-500 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Já possui registro?
                        </Link>

                        <Button type="primary" htmlType="submit" loading={processing} className="h-[40px] w-[100px] ms-4">
                            Registrar
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </GuestLayout>
    );
}
