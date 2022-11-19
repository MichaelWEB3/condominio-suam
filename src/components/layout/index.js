import React, { useEffect, useState } from 'react';
import useDados from '../../datehook/userHook';
import router from 'next/router'
import MenuLeft from '../menuLeft';

export default function Layout({ children, page }) {
    useEffect(() => {
        if (!dates?.date?.uid) router.push('login')
    }, [dates?.date?.uid])
    const dates = useDados()
    return (
        <div className='h-full w-full grad flex text-white' >
            <MenuLeft page={page} />
            <div className='w-10/12 h-full flex  flex-col '>
                <header className='w-full h-16 flex justify-between  items-center p-9 fullcolor mb-5'>
                    <span>{page}</span>
                    <span>{dates?.date?.nome}</span>
                </header>
                {children}
            </div>
        </div >
    )
}
