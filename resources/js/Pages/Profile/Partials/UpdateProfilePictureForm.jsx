import { useState } from 'react';
import { Form, Button, Typography, Upload, message, Image, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

const { Title, Paragraph } = Typography;

export default function UpdateProfilePictureForm({ className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        image: user.image
    });

    const updateProfilePicture = (values) => {
        console.log(values)

        put(route('profile.picture', user.id), {
            onSuccess: () => {
                reset();
                message.success('Foto de perfil atualizada com sucesso.');
            }
        });
    };

    return (
        <section className={className}>
            <header>
                <Title level={4}>Atualizar Foto de Perfil</Title>
                <Paragraph>Selecione uma imagem para atualizar sua foto de perfil.</Paragraph>
            </header>

            <Image width={200} src={`storage/${user.image}`} alt="Current Profile Picture" className="mb-4" />

            <Form onFinish={updateProfilePicture} layout="vertical" className="mt-6 space-y-6">
                <Form.Item>
                    <Upload
                        name="image"
                        listType="picture-card"
                        maxCount={1}
                        onChange={(e) => {
                            setData('image', e.file)
                            console.lo
                            console.log(data.image)
                        }}
                        beforeUpload={() => false}
                    >
                        <Button type="button" style={{ border: 0, background: 'none' }}>
                            <div className="flex flex-col items-center">
                                <PlusOutlined />
                                Upload
                            </div>
                        </Button>
                    </Upload>
                </Form.Item>


                <div className="flex items-center gap-4">
                    <Button type="primary" htmlType="submit">
                        Salvar
                    </Button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <Paragraph type="success" className="ml-2">
                            Salvando...
                        </Paragraph>
                    </Transition>
                </div>
            </Form>
        </section>
    );
}
