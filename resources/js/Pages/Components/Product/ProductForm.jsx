import { useEffect, useState } from 'react';
import { Form, Input, Button, InputNumber, Select, Upload, message, ConfigProvider } from 'antd';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { PlusOutlined } from '@ant-design/icons';

export default function ProductForm({ auth, categories, onPreviewChange, onResetPreview }) {
    const { data, setData, errors, processing, recentlySuccessful, post, reset } = useForm({
        nmproduct: '',
        qtproduct: '',
        price: '',
        color: '',
        idcategory: '',
        iduser: auth,
        image: null
    });

    const [listCategory, setListCategory] = useState([]);

    useEffect(() => {
        setListCategory(categories);
    }, [categories]);

    useEffect(() => {
        onPreviewChange(data);
    }, [data]);

    const submit = () => {
        post(route('products.store'), {
            onSuccess: () => {
                reset();
                onResetPreview();
            }
        });
    };

    const options = listCategory.map(item => ({
        value: `${item.id}-${item.color}`,
        label: item.nmcategory,
    }));

    const resetForm = () => {
        reset();
        onResetPreview();
    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    Select: {
                        selectorBg: '#f3f4f6'
                    },
                },
            }}
        >
            <Form onFinish={submit} layout="vertical" className="mt-6 space-y-6" encType='multipart/form-data'>
                <Form.Item
                    label="Nome"
                    validateStatus={errors.nmproduct ? 'error' : ''}
                    help={errors.nmproduct}
                >
                    <Input
                        value={data.nmproduct}
                        onChange={(e) => setData('nmproduct', e.target.value)}
                        required
                        autoComplete="nmproduct"
                        style={{ borderRadius: '6px', backgroundColor: "#f3f4f6", borderColor: "#d9d9d9" }}
                    />
                </Form.Item>

                <Form.Item
                    label="Quantidade"
                    validateStatus={errors.qtproduct ? 'error' : ''}
                    help={errors.qtproduct}
                >
                    <InputNumber
                        value={data.qtproduct}
                        onChange={(value) => setData('qtproduct', value)}
                        required
                        autoComplete="qtproduct"
                        size="large"
                        style={{ width: '100%', borderRadius: '6px', backgroundColor: "#f3f4f6" }}
                    />
                </Form.Item>

                <Form.Item
                    label="Categoria"
                    validateStatus={errors.idcategory ? 'error' : ''}
                    help={errors.idcategory}
                >
                    <Select
                        options={options}
                        value={data.idcategory}
                        onChange={(e) => {
                            let idcategory = e.split('-')[0];
                            let color = e.split('-')[1];
                            setData('idcategory', idcategory);
                            setData('color', color);
                        }}
                        size="large"
                        style={{ width: '100%' }}
                    />
                </Form.Item>

                <Form.Item
                    label="Preço"
                    validateStatus={errors.price ? 'error' : ''}
                    help={errors.price}
                >
                    <Input
                        value={data.price}
                        onChange={(e) => setData('price', e.target.value)}
                        required
                        autoComplete="price"
                        style={{ borderRadius: '6px', backgroundColor: "#f3f4f6", borderColor: "#d9d9d9" }}
                    />
                </Form.Item>
                <div className='flex justify-between w-full'>
                    <Form.Item
                        label="Imagem"
                        validateStatus={errors.image ? 'error' : ''}
                        help={errors.image}
                    >
                        <Upload
                            name="image"
                            listType="picture-card"
                            maxCount={1}
                            onChange={(e) => setData('image', e.file)}
                            beforeUpload={() => false}
                        >
                            <Button
                                style={{
                                    border: 0,
                                    background: 'none',
                                }}
                                type="button"
                            >

                                <div
                                    
                                >
                                    <div className="flex flex-col items-center">
                                    <PlusOutlined />
                                    Upload
                                    </div>
                                </div>
                            </Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item className='flex items-end'>

                        <Button type="primary" htmlType="submit" loading={processing} style={{ height: "40px", backgroundColor: "#01344a" }}>
                            Cadastrar
                        </Button>
                        <Button type="primary" className="ml-2" onClick={resetForm} style={{ height: "40px", backgroundColor: "#01344a" }}>
                            Cancelar
                        </Button>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-gray-600 dark:text-green-400">Cadastrando...</p>
                        </Transition>
                    </Form.Item>
                </div>
            </Form></ConfigProvider>
    );
}
