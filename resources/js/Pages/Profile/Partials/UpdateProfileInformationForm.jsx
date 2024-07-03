import { Form, Input, Button, Typography, Alert } from 'antd';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

const { Title, Paragraph, Text } = Typography;

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = () => {
        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-900">Informações de Perfil</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Atualize as informações de perfil e endereço de e-mail da sua contas.
                </p>
            </header>

            <Form onFinish={submit} layout="vertical" className="mt-6 space-y-6">
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
                        style={{ borderRadius: '6px', backgroundColor: "#f3f4f6", borderColor: "#d9d9d9" }}
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
                        style={{ borderRadius: '6px', backgroundColor: "#f3f4f6", borderColor: "#d9d9d9" }}
                    />
                </Form.Item>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <Text type="warning">
                            Seu endereço de e-mail não foi verificado.{' '}
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline"
                            >
                                Clique aqui para reenviar o e-mail de verificação.
                            </Link>
                        </Text>

                        {status === 'verification-link-sent' && (
                            <Alert
                                message="Um novo link de verificação foi enviado para o endereço de e-mail que você forneceu durante o registro."
                                type="success"
                                showIcon
                                className="mt-2"
                            />
                        )}
                    </div>
                )}

                <Form.Item className="flex items-center gap-4">
                    <Button type="primary" htmlType="submit" loading={processing} style={{ backgroundColor: "#01344a" }}>
                        Salvar
                    </Button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <Text type="success" className="ml-2">
                            Salvando.
                        </Text>
                    </Transition>
                </Form.Item>
            </Form>
        </section>
    );
}
