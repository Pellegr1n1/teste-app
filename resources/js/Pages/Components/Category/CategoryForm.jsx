import { Form, Input, Button, message, InputNumber, ColorPicker } from 'antd';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Transition } from '@headlessui/react';

export default function CategoryForm({ auth }) {
    const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
        nmcategory: '',
        tax: '',
        dscategory: '',
        color: '#fff',
        iduser: auth
    });
    const [_, setColor] = useState('');

    const submit = () => {
        post(route('categories.store'), {
            onSuccess: () => {
                reset();
            }
        });
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
                    style={{ width: '100%' }}
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
                />
            </Form.Item>
            <Form.Item
                label="Selecione uma cor"
                validateStatus={errors.color ? 'error' : ''}
                help={errors.color}
            >
                <ColorPicker
                    showText
                    arrow
                    trigger='hover'
                    defaultValue={data.color}
                    onChange={(c) => {
                        setColor(c.toHexString());
                        setData('color', c.toHexString());
                    }}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={processing}>
                    Cadastrar
                </Button>
                <Button type="default" className="ml-2">
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
        </Form>
    );
}