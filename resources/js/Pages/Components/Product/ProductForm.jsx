import { useEffect, useState } from 'react';
import { Form, Input, Button, InputNumber, Select, Upload, ConfigProvider, message } from 'antd';
import { useForm } from '@inertiajs/react';
import { PlusOutlined } from '@ant-design/icons';

export default function ProductForm({ editProduct, categories, onPreviewChange, onResetPreview, disabled }) {

    const { data, setData, errors, processing, post, put } = useForm({
        nmproduct: editProduct ? editProduct.nmproduct : '',
        qtproduct: editProduct ? editProduct.qtproduct : '',
        price: editProduct ? editProduct.price : '',
        color: editProduct && editProduct.category ? editProduct.category.color : '',
        idcategory: editProduct ? editProduct.idcategory : '',
        image: editProduct ? editProduct.image : null
    });

    const [listCategory, setListCategory] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setListCategory(categories);
        if (editProduct) {
            setIsEditing(true);
        }
    }, [categories]);

    useEffect(() => {
        onPreviewChange(data);
    }, [data]);

    const submit = () => {
        if (isEditing) {
            put(route('products.update', { id: editProduct.id }), {
                onSuccess: () => {
                    resetForm();
                    message.success('Produto atualizado com sucesso!');
                },
                onError: (error) => {
                    message.error('Erro ao atualizar o produto!');
                    console.error('Erro ao atualizar o produto:' + error);
                }
            });
        } else {
            post(route('products.store'), {
                onSuccess: () => {
                    resetForm();
                    message.success('Produto cadastrado com sucesso!');
                },
                onError: (error) => {
                    message.error('Erro ao cadastrar o produto!');
                    console.error('Erro ao cadastrar o produto:' + error);
                }
            });
        }
    };

    const options = listCategory.map(item => ({
        value: `${item.id}-${item.color}`,
        label: item.nmcategory,
    }));

    const resetForm = () => {
        setData({
            nmproduct: '',
            qtproduct: '',
            price: '',
            color: '',
            idcategory: '',
            image: null
        })
        setIsEditing(false);
    };

    const handleCategoryChange = (value) => {
        const [id, color] = value.split('-');
        setData({
            ...data,
            idcategory: id,
            color: color
        });
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
                        disabled={disabled}
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
                        disabled={disabled}
                    />
                </Form.Item>

                <Form.Item
                    label="Categoria"
                    validateStatus={errors.idcategory ? 'error' : ''}
                    help={errors.idcategory}
                >
                    <Select
                        options={options}
                        value={data.idcategory ? `${data.idcategory}-${data.color}` : undefined}
                        onChange={handleCategoryChange}
                        size="large"
                        style={{ width: '100%' }}
                        disabled={disabled}
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
                        disabled={disabled}
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
                            disabled={isEditing || disabled}
                        >
                            <Button
                                style={{
                                    border: 0,
                                    background: 'none',
                                }}
                                type="button"
                                disabled={disabled}
                            >
                                <div>
                                    <div className="flex flex-col items-center">
                                        <PlusOutlined />
                                        Upload
                                    </div>
                                </div>
                            </Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item className='flex items-end'>
                        <Button type="primary" htmlType="submit" loading={processing} disabled={disabled} style={{ height: "40px", width: "100px", color: 'white', backgroundColor: "#01344a" }}>
                            {isEditing ? "Salvar" : "Cadastrar"}
                        </Button>
                        <Button type="primary" className="ml-2" onClick={resetForm} disabled={disabled} style={{ height: "40px", width: "100px", color: 'white', backgroundColor: "#01344a" }}>
                            Cancelar
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </ConfigProvider>
    );
}
