import { Form, Input, Button, InputNumber, ColorPicker, message } from 'antd';
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function CategoryForm({ auth, editCategory }) {

    const { data, setData, errors, post, put, processing } = useForm({
        nmcategory: editCategory ? editCategory.nmcategory : '',
        tax: editCategory ? editCategory.tax : '',
        dscategory: editCategory ? editCategory.dscategory : '',
        color: editCategory ? editCategory.color : '#fff',
        iduser: auth
    });

    useEffect(() => {
        if (editCategory) {
            setIsEditing(true);
        }
    }, [])

    const [_, setColor] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const submit = () => {
        if (isEditing) {
            put(route('categories.update', { id: editCategory.id }), {
                onSuccess: () => {
                    message.success('Categoria atualizada com sucesso!')
                    resetForm();
                },
                onError: (error) => {
                    message.error('Erro ao atualizar a categoria!');
                    console.error('Erro ao atualizar a categoria: ' + error);
                }
            });
        } else {
            post(route('categories.store'), {
                onSuccess: () => {
                    message.success('Categoria cadastrada com sucesso!');
                    resetForm();
                },
                onError: (error) => {
                    message.error('Erro ao cadastrar a categoria!');
                    console.error('Erro ao cadastrar a categoria: ' + error);
                }
            });
        }
    };

    const resetForm = () => {
        setData({
            nmcategory: '',
            tax: '',
            dscategory: '',
            color: '#FFF'
        });
        setIsEditing(false);
    };

    return (
        <Form onFinish={submit} layout="vertical" className="mt-6 space-y-6">
            <Form.Item
                label="Nome"
                validateStatus={errors.nmcategory ? 'error' : ''}
                help={errors.nmcategory}
            >
                <Input
                    value={data.nmcategory}
                    onChange={(e) => setData('nmcategory', e.target.value)}
                    required
                    autoComplete="nmcategory"
                    style={{ borderRadius: '6px', backgroundColor: "#f3f4f6", borderColor: "#d9d9d9" }}
                />
            </Form.Item>
            <Form.Item
                label="Taxa"
                validateStatus={errors.tax ? 'error' : ''}
                help={errors.tax}
            >
                <InputNumber
                    value={data.tax}
                    onChange={(value) => setData('tax', value)}
                    required
                    autoComplete="tax"
                    size="large"
                    style={{ width: '100%', borderRadius: '6px', backgroundColor: "#f3f4f6" }}
                />
            </Form.Item>
            <Form.Item
                label="Descrição"
                validateStatus={errors.dscategory ? 'error' : ''}
                help={errors.dscategory}
            >
                <Input.TextArea
                    value={data.dscategory}
                    onChange={(e) => setData('dscategory', e.target.value)}
                    autoComplete="dscategory"
                    style={{ backgroundColor: "#f3f4f6" }}
                />
            </Form.Item>
            <div className='flex justify-between w-full'>
                <Form.Item
                    label="Selecione uma cor"
                    validateStatus={errors.color ? 'error' : ''}
                    help={errors.color}
                >
                    <ColorPicker
                        showText
                        arrow
                        trigger='hover'
                        value={data.color}
                        onChange={(c) => {
                            setColor(c.toHexString());
                            setData('color', c.toHexString());
                        }}
                        style={{ backgroundColor: "#f3f4f6" }}
                    />
                </Form.Item>
                <Form.Item className='flex items-end'>
                    <Button type="primary" htmlType="submit" loading={processing} style={{ height: "40px", width: '100px', backgroundColor: "#01344a" }}>
                        {isEditing ? "Salvar" : "Cadastrar"}
                    </Button>
                    <Button type="primary" className="ml-2" onClick={resetForm} style={{ height: "40px", width: '100px', backgroundColor: "#01344a" }}>
                        Cancelar
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );
}