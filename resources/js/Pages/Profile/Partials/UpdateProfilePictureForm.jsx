<<<<<<< HEAD
import { Form, Button, Upload, message, Image } from 'antd';
import { useForm, usePage } from '@inertiajs/react';
=======
import { useState } from 'react';
import { Form, Button, Typography, Upload, message, Image, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

const { Title, Paragraph } = Typography;
>>>>>>> fc65f7d8b027fd24fb7165e158e5040d2486def5

export default function UpdateProfilePictureForm({ className = '' }) {
    const user = usePage().props.auth.user;

<<<<<<< HEAD
    const { setData, errors, post, reset } = useForm({
        image: null
    });

    const updateProfilePicture = () => {
        post(route('profile.picture', user.id), {
=======
    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        image: user.image
    });

    const updateProfilePicture = (values) => {
        console.log(values)

        put(route('profile.picture', user.id), {
>>>>>>> fc65f7d8b027fd24fb7165e158e5040d2486def5
            onSuccess: () => {
                reset();
                message.success('Foto de perfil atualizada com sucesso.');
            }
        });
    };

    return (
        <section className={className}>
            <header>
<<<<<<< HEAD
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-900">Atualizar Foto de Perfil</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Selecione uma imagem para atualizar sua foto de perfil.
                </p>
            </header>

            <Image width={200} src={`storage/${user.image}`} alt="Current Profile Picture" className="mb-4 mt-6" />

            <Form onFinish={updateProfilePicture} layout="vertical" className="mt-6 space-y-6">
                <Form.Item
                    label="Imagem"
                    validateStatus={errors.image ? 'error' : ''}
                    help={errors.image}
                    name={'image'}
                >
=======
                <Title level={4}>Atualizar Foto de Perfil</Title>
                <Paragraph>Selecione uma imagem para atualizar sua foto de perfil.</Paragraph>
            </header>

            <Image width={200} src={`storage/${user.image}`} alt="Current Profile Picture" className="mb-4" />

            <Form onFinish={updateProfilePicture} layout="vertical" className="mt-6 space-y-6">
                <Form.Item>
>>>>>>> fc65f7d8b027fd24fb7165e158e5040d2486def5
                    <Upload
                        name="image"
                        listType="picture-card"
                        maxCount={1}
                        onChange={(e) => {
                            setData('image', e.file)
<<<<<<< HEAD
                        }}
                        beforeUpload={() => false}
                    >
                        {'+ Upload'}
                    </Upload>
                </Form.Item>

                <div className="flex items-center gap-4">
                    <Button type="primary" htmlType="submit" style={{ height: "40px", width: "100px", color: 'white', backgroundColor: "#01344a" }}>
                        Salvar
                    </Button>
=======
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
>>>>>>> fc65f7d8b027fd24fb7165e158e5040d2486def5
                </div>
            </Form>
        </section>
    );
}
