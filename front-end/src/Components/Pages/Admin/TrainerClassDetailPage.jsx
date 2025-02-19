import { UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Layout, Row, Statistic, Typography } from 'antd'
import React from 'react'
import { Container } from 'react-bootstrap';

const { Content } = Layout;
const { Title, Text } = Typography;

function TrainerClassDetailPage() {
    return (
        <Container>
            <Layout>
                <Content style={{ padding: "24px" }}>
                    <Title level={2}>Batch 10</Title>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={16}>
                            <Card title={"Class Information"}>
                                <Row gutter={[16, 16]}>
                                    <Col span={12}>
                                        <Statistic title={"Class Code"} />
                                    </Col>
                                    <Col span={12}>
                                        <Statistic title={"Schedule"} />
                                    </Col>
                                    <Col span={12}>
                                        <Statistic title={"Start Date"} />
                                    </Col>
                                    <Col span={12}>
                                        <Statistic title={"End Date"} />
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col xs={24} md={8}>
                            <Card title={"Trainer Information"}>
                                <div className='flex items-center gap-3 mb-16'>
                                    <Avatar size={64} icon={<UserOutlined />} />
                                    <div>
                                        <Text className='font-semibold'>zain Khan 25</Text><br />
                                        <Text type='secondary'>zain@gmail.com</Text>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </Container>
    )
}

export default TrainerClassDetailPage