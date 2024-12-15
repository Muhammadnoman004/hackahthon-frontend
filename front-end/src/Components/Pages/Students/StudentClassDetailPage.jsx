import React from 'react'
import { Container } from 'react-bootstrap'
import noImage from '../../../assets/noImage.jpg';

export default function StudentClassDetailPage() {
    return (
        <>
            <Container>
                <div className="flex flex-col w-full min-h-screen bg-muted/40">
                    <main className="flex-1">
                        <div className="grid gap-6">
                            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                                <header className="flex items-center justify-between px-2 border-b bg-background">
                                    <div className="flex flex-col space-y-1.5 p-3">
                                        <h2 className='text-xl font-bold'>A10 6 to 8</h2>
                                        <p className='text-sm'>Saylani A10 6 to 8</p>
                                    </div>
                                </header>
                                <div className='p-2'>
                                    <div className='mb-6'>
                                        <img src={noImage} alt="" className="mb-4 max-w-xl w-full" />

                                        <div className="grid grid-cols-1 gap-4 border-t-2 pt-2 ps-2">
                                            <div className='break-words'>
                                                <h2 className="text-lg font-semibold">Teacher</h2>
                                                <p>Huzaifa Khan</p>
                                                <p>Huzaifa@gmail.com</p>
                                            </div>
                                            <div>
                                                <h2 className="text-lg font-semibold">Join Code</h2>
                                                <p>U4vKeko</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </Container>
        </>
    )
}
