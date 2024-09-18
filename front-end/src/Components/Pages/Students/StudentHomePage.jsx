import React from 'react'
import userProfileIcon from '../../../assets/user-profile-icon.png'
import { BellFilled } from '@ant-design/icons'
import { Row, Col, Container } from 'react-bootstrap';
import { Card } from 'antd';
const { Meta } = Card;

export default function StudentHomePage() {
    return (
        <Container>
            <div>
                <div className='flex m-4 text-2xl font-mono font-extrabold'>
                    <h1 className='flex-1'>Student Dashboard</h1>
                    <BellFilled className='flex-2 text-amber-400' />
                </div>

                <div className='mx-6'>
                    <h1 className='my-4 text-xl font-sans font-bold text-sky-500'>My Courses</h1>

                    <div>

                        <Row>
                            <Col xs={12} md={6} lg={4}>
                                <Card
                                    hoverable
                                    style={{
                                        width: 300,
                                        margin: 'auto',
                                        marginBottom: 30
                                    }}
                                    cover={<img alt="example" className='size-36' style={{ borderRadius: "10px" }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvPIQRaKMkaQh1KFCfy8Xmz4H_Jy3waZw2mw&s" />}
                                >
                                    <div className='flex relative bottom-12'>
                                        <h1 className='flex-1 relative top-8 right-3 font-semibold'>Web development</h1>
                                        <img className='size-12 rounded-full bg-white' src={userProfileIcon} alt="" />
                                    </div>

                                    <div className='flex'>
                                        <Meta title="Batch-10" className='flex-1 relative right-3' />
                                        <Meta title="Sir Saad" className='relative left-3' />
                                    </div>
                                </Card>
                            </Col>

                            <Col xs={12} md={6} lg={4}>
                                <Card
                                    hoverable
                                    style={{
                                        width: 300,
                                        margin: 'auto',
                                        marginBottom: 30
                                    }}
                                    cover={<img alt="example" className='size-36' style={{ borderRadius: "10px" }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvPIQRaKMkaQh1KFCfy8Xmz4H_Jy3waZw2mw&s" />}
                                >
                                    <div className='flex relative bottom-12'>
                                        <h1 className='flex-1 relative top-8 right-3 font-semibold'>Python development</h1>
                                        <img className='size-12 rounded-full bg-white' src={userProfileIcon} alt="" />
                                    </div>

                                    <div className='flex'>
                                        <Meta title="Batch-8" className='flex-1 relative right-3' />
                                        <Meta title="Sir Huzaifa" className='relative left-3' />
                                    </div>
                                </Card>
                            </Col>

                            <Col xs={12} md={6} lg={4}>
                                <Card
                                    hoverable
                                    style={{
                                        width: 300,
                                        margin: 'auto',
                                        marginBottom: 30
                                    }}
                                    cover={<img alt="example" className='size-36' style={{ borderRadius: "10px" }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvPIQRaKMkaQh1KFCfy8Xmz4H_Jy3waZw2mw&s" />}
                                >
                                    <div className='flex relative bottom-12'>
                                        <h1 className='flex-1 relative top-8 right-3 font-semibold'>Backend development</h1>
                                        <img className='size-12 rounded-full bg-white' src={userProfileIcon} alt="" />
                                    </div>

                                    <div className='flex'>
                                        <Meta title="Batch-9" className='flex-1 relative right-3' />
                                        <Meta title="Sir Raja Ehsan" className='relative left-3' />
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>

            </div>
        </Container>
    )
}
