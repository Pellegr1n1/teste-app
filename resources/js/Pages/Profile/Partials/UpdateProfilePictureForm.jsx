import { Form, Button, Upload, message, Image } from 'antd';
import { useForm, usePage } from '@inertiajs/react';

export default function UpdateProfilePictureForm({ className = '' }) {
    const user = usePage().props.auth.user;

    const { setData, errors, post, reset } = useForm({
        image: null
    });

    const updateProfilePicture = () => {
        post(route('profile.picture', user.id), {
            onSuccess: () => {
                reset();
                message.success('Foto de perfil atualizada com sucesso.');
            }
        });
    };

    return (
        <section className={className}>
            <header>
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
                    <Upload
                        name="image"
                        listType="picture-card"
                        maxCount={1}
                        onChange={(e) => {
                            setData('image', e.file)
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
                </div>
            </Form>
        </section>
    );
}
