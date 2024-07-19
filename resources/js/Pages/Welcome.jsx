import React, { useState } from 'react';
import { Button, ConfigProvider, Layout, Menu } from 'antd';
import { Link, Head } from '@inertiajs/react';
import image1 from '@/Assets/Images/dashboard-card.png';
import image2 from '@/Assets/Images/success-card.png';
import image3 from '@/Assets/Images/delivery-card.png';
import background from '@/Assets/Images/welcome-bg.png';
import logo from '@/Assets/Images/logo-mc.png';
import { Card, Col, Row } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LoginOutlined,
    UserOutlined,
    UserAddOutlined,
} from '@ant-design/icons';
import ModalAbout from './Components/About/AboutModal';

const { Header, Sider, Content } = Layout;
const { Meta } = Card;

const Welcome = ({ auth }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [showAbout, setShowAbout] = useState(false);

    return (
        <>
            <ConfigProvider
                theme={{
                    components: {
                        Layout: {
                            siderBg: 'linear-gradient(to bottom, #035096, #65a8c5)',

                        },
                        Menu: {
                            darkItemBg: 'transparent'
                        }
                    },
                }}
            >
                <Head title="Welcome" />
                <Layout style={{ minHeight: '100vh', backgroundImage: background }}>
                    <Layout>
                        <Content style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }}>
                            <Header style={{ padding: 0, background: '#f3f4f6' }}>
                                <Button
                                    type="text"
                                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                    onClick={() => setCollapsed(!collapsed)}
                                    style={{
                                        fontSize: '16px',
                                        width: 64,
                                        height: 64,
                                    }}
                                />
                            </Header>
                            <div className='mb-5 mr-20 ml-20'>
                                <Row align={'center'}>
                                    <p className='text-[36px] font-bold'>Seja Bem-vindo(a), ao Market & Client</p>
                                </Row>
                                <Row align={'center'}>
                                    <p className='text-[16px] text-center'>
                                        No Market & Client, conectamos clientes e empresas com as melhores soluções de mercado. Explore nossos serviços e descubra como podemos ajudar você a alcançar seus objetivos.
                                    </p>
                                </Row>
                            </div>
                            <Row gutter={[48]} justify="center" style={{ padding: '24px 16px' }}>
                                <Col>
                                    <Card
                                        hoverable
                                        style={{
                                            width: 360,
                                            height: '100%'
                                        }}
                                        cover={<img alt="example" src={image1} />}
                                    >
                                        <Meta
                                            title={<p className='text-[24px] text-center'>Dashboard Inteligente</p>}
                                            description={
                                                <div>
                                                    <p className='text-center'>
                                                        Dashboard personalizado para suas necessidades. Transforme seus dados em insights valiosos e tome decisões as melhores decisões com facilidade.
                                                    </p>
                                                </div>
                                            }
                                        />
                                    </Card>
                                </Col>
                                <Col>
                                    <Card
                                        hoverable
                                        style={{
                                            width: 360,
                                            height: '100%'
                                        }}
                                        cover={<img alt="example" src={image2} />}
                                    >
                                        <Meta
                                            title={<p className='text-[24px] text-center'>Parceria para o Sucesso</p>}
                                            description={
                                                <div>
                                                    <p className='text-center'>
                                                        Things & Foods oferece uma solução integrada para empresas e clientes,
                                                        proporcionando facilidade na gestão e uma experiência de compra memorável.
                                                    </p>
                                                </div>
                                            }
                                        />
                                    </Card>
                                </Col>
                                <Col>
                                    <Card
                                        hoverable
                                        style={{
                                            width: 360,
                                            height: '100%'
                                        }}
                                        cover={<img alt="example" src={image3} />}
                                    >
                                        <Meta
                                            title={<p className='text-[24px] text-center'>Entrega Rápida</p>}
                                            description={
                                                <div>
                                                    <p className='text-center'>
                                                        Seus produtos favoritos entregues com rapidez e cuidado, onde e quando precisar.
                                                    </p>
                                                </div>
                                            }
                                        />
                                    </Card>
                                </Col>
                            </Row>

                            <Row align="middle" justify="center" style={{ margin: '20px 0' }}>
                                <Button type="primary" size="large" className="mx-2" href={route('carts.index')}>
                                    Ver Produtos
                                </Button>
                                <Button type="default" size="large" className="mx-2" onClick={() => setShowAbout(true)}>
                                    Sobre Nós
                                </Button>
                            </Row>

                        </Content>
                        <Sider trigger={null} collapsible collapsed={collapsed} width={200}>
                            <div className='flex items-center p-4'>
                                <img id="logo" src={logo} width={50} />
                                {!collapsed && <p className='ml-3 text-xl/relaxed text-white'>Market & Client</p>}
                            </div>
                            <Menu
                                theme="dark"
                                mode="inline"
                                items={[
                                    auth.user ?
                                        {
                                            key: '1',
                                            icon: <UserOutlined />,
                                            label: (
                                                <Link href={auth.type === 'client' ? route('dashboard') : route('dashboardCompany.index')}>
                                                    Dashboard
                                                </Link>
                                            ),
                                        }
                                        :
                                        [
                                            {
                                                key: '2',
                                                icon: <LoginOutlined />,
                                                label: (
                                                    <Link href={route('login')}>
                                                        Login
                                                    </Link>
                                                ),
                                            },
                                            {
                                                key: '3',
                                                icon: <UserAddOutlined />,
                                                label: (
                                                    <Link href={route('register')}>
                                                        Registrar
                                                    </Link>
                                                ),
                                            },
                                        ]
                                ].flat()}
                            />
                        </Sider>
                    </Layout>
                </Layout>
            </ConfigProvider>
            <ModalAbout
                isModalOpen={showAbout}
                closeModal={() => setShowAbout(false)}
            />
        </>
    );
};

export default Welcome;
