import React from 'react'
import { Container } from 'react-bootstrap'

export default function TeacherClassDetailPage() {
    return (
        <Container>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-2 mt-4'>
                <section>
                    <div className='bg-gray-100 rounded-lg p-3 mb-3'>
                        <h2 className='text-xl mb-3'>Class code</h2>
                        <div className='bg-white p-3 rounded-lg shadow mb-3'>
                            <p>U4vKeko</p>
                        </div>
                    </div>

                    <div className='bg-gray-100 rounded-lg p-3'>
                        <h2 className='text-xl mb-3'>Upcoming</h2>
                        <div className='bg-white p-3 rounded-lg shadow mb-3'>
                            <p>Woohoo, no work due soon!</p>
                        </div>
                    </div>
                </section>

                <section className='ms-1 col-span-2'>
                    <div className='bg-gray-100 rounded-lg p-3 mb-3'>
                        <h2 className='text-xl mb-4'>Stream</h2>
                        <div className='bg-white p-4 rounded-lg shadow mb-4'>
                            <div className='flex items-center mb-2'>
                                <div className='bg-gray-300 h-10 w-10 rounded-full flex items-center justify-center mr-2'>
                                    <span className='text-lg font-bold'>M</span>
                                </div>
                                <div>
                                    <h3 className='text-lg font-bold'>Muhammad Noman</h3>
                                    <p className='text-gray-600'>Jan 5</p>
                                </div>
                            </div>
                            <p className='text-sky-600 mb-2 cursor-pointer break-all'>https://drive.google.com/drive/folders/1zTv6xmBOCbkx2JRm8BV-hFXBzdkfPfMU</p>
                            <div className='flex flex-wrap'>
                                <div className='bg-gray-200 rounded-lg p-2 m-1'>
                                    Binary File
                                </div>
                                <div className='bg-gray-200 rounded-lg p-2 m-1'>
                                    Unknown File
                                </div>
                            </div>
                        </div>
                    </div>

                    <section>
                        <div className='bg-gray-100 rounded-lg p-3 mb-3'>
                            <h2 className='text-xl mb-4 ms-1'>Assignemnt</h2>
                            <div className='bg-white shadow p-4 rounded-lg mb-4 hover:shadow-md hover:cursor-pointer hover:-translate-y-1 hover:transition-all'>
                                <h3 className='text-lg font-bold'>Make a Restaurant Landing Page</h3>
                                <p className='text-gray-600'>Due date: {new Date().toLocaleDateString()}</p>
                            </div>
                            <div className='bg-white shadow p-4 rounded-lg mb-4 hover:shadow-md hover:cursor-pointer hover:-translate-y-1 hover:transition-all'>
                                <h3 className='text-lg font-bold'>Assignment 2</h3>
                                <p className='text-gray-600'>Due date: {new Date().toLocaleDateString()}</p>
                            </div>
                            <div className='bg-white shadow p-4 rounded-lg mb-4 hover:shadow-md hover:cursor-pointer hover:-translate-y-1 hover:transition-all'>
                                <h3 className='text-lg font-bold'>Hello DG</h3>
                                <p className='text-gray-600'>Due date: {new Date().toLocaleDateString()}</p>
                            </div>
                        </div>
                    </section>

                </section>
            </div>
        </Container>
    )
}
