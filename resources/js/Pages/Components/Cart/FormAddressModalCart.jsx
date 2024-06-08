import React, { useState } from 'react';
import { Button, Form, Input, Col, Row } from "antd";
import { useForm } from '@inertiajs/react';

function FormAddressModalCart() {
    const [addressFieldsDisabled, setAddressFieldsDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();

    const { data, setData, post } = useForm({
        cep: '',
        state: '',
        city: '',
        street: '',
        neighborhood: '',
        number: ''
    });

    const onSearch = async (cep) => {
        try {
            setLoading(true);
            const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const addressData = await res.json();

            form.setFieldsValue({
                city: addressData.localidade,
                state: addressData.uf,
                neighborhood: addressData.bairro,
                street: addressData.logradouro,
            });

            setData({
                ...data,
                city: addressData.localidade,
                state: addressData.uf,
                neighborhood: addressData.bairro,
                street: addressData.logradouro,
            });

            setAddressFieldsDisabled(false);
        } catch (error) {
            console.error('Erro ao buscar endereço:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (values) => {
        try {
            setIsLoading(true);
            post(route('address.create'), values);
            form.resetFields();
            setAddressFieldsDisabled(true);
        } catch (error) {
            console.error('Erro ao cadastrar endereço:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Form form={form}
                layout='vertical'
                style={{ width: '100%' }}
                onFinish={handleRegister}>
                <Row align="middle" gutter={20}>
                    <Col span={8}>
                        <Form.Item
                            name="cep"
                            label="CEP"
                            rules={[{ required: true, min: 8, message: 'Por favor, insira o CEP válido!' }]}
                            hasFeedback
                        >
                            <Input.Search
                                onSearch={onSearch}
                                loading={loading}
                                value={data.cep}
                                onChange={(e) => setData('cep', e.target.value)}
                                size='large'
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="state"
                            label="Estado"
                            rules={[{ required: true, message: 'Campo não preenchido!' }]}
                            hasFeedback
                        >
                            <Input size="large" value={data.state} onChange={(e) => setData('state', e.target.value)} disabled={addressFieldsDisabled} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="city"
                            label="Cidade"
                            rules={[{ required: true, message: 'Campo não preenchido!' }]}
                            hasFeedback
                        >
                            <Input size="large" value={data.city} onChange={(e) => setData('city', e.target.value)} disabled={addressFieldsDisabled} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row align="middle" gutter={20}>
                    <Col span={8}>
                        <Form.Item
                            name="street"
                            label="Rua"
                            rules={[{ required: true, message: 'Campo não preenchido!' }]}
                            hasFeedback
                        >
                            <Input size="large" value={data.street} onChange={(e) => setData('street', e.target.value)} disabled={addressFieldsDisabled} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="neighborhood"
                            label="Bairro"
                            rules={[{ required: true, message: 'Campo não preenchido!' }]}
                            hasFeedback
                        >
                            <Input size="large" value={data.neighborhood} onChange={(e) => setData('neighborhood', e.target.value)} disabled={addressFieldsDisabled} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="number"
                            label="Número"
                            rules={[{ required: true, message: 'Campo não preenchido!' }]}
                            hasFeedback
                        >
                            <Input value={data.number} onChange={(e) => setData('number', e.target.value)} size="large" />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Button loading={isLoading} type="primary" htmlType="submit" block size="large">Cadastrar</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default FormAddressModalCart