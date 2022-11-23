import React, { useEffect, useRef, useState } from 'react';
import useDados from '../../datehook/userHook';
import Layout from '../../components/layout';
import { ChartCondominio, ChartMorador } from '../../components/chart';

//import router from 'next/router'

export default function Home() {
  const dates = useDados()

  useEffect(() => {
    dates.getCondominio(dates?.date?.uid, 0)
    console.log(dates?.date)
  }, [dates?.date?.uid])
  return (
    <Layout page="Home">
      <div className=' h-auto md:h-screen p-2 w-full flex-col md:flex pl-20 pr-20 pt-5' >

        <div className='flex w-full  mb-10   flex-col md:flex-row  justify-between   '>
          <span className=' text-sm uppercase'><span className='font-bold'>Quantidade total de condominios:</span> {dates?.date?.condominio?.length}</span>
          <span className=' text-sm uppercase'><span className='font-bold'>Quantidade total de moradores:</span> {dates?.date?.moradores?.length}</span>
        </div>

        {dates?.date?.condominio.length > 1 &&
          <div className='flex md:flex-row flex-col w-full  h-1/2'>
            <div className=' w-full md:w-1/2 flex justify-center  fullcolorChat m-5 flex-col'>
              <span className=" font-bold">Fluxo geral de Condominio</span>
              <ChartCondominio condominio={dates?.date?.condominio} />
            </div>
            <div className='w-full  md:w-1/2 flex justify-center  fullcolorChat m-5 flex-col'>
              <span className=" font-bold">Fluxo geral de Moradores </span>
              <ChartMorador moradores={dates?.date?.moradores} />

            </div>
          </div>
        }

        <div className='w-full flex justify-center items-center mt-10 '>
          <select className=' w-full  styleSelect border-none border-b-4  border-red-600' onChange={(item) => dates.getCondominio(dates?.date?.uid, item.target.value)}>
            {dates?.date?.condominio?.map((item, index) => {
              return <option value={index} key={index} > {item.nome}</option>
            })}
          </select>
        </div>
        <div className='flex w-full  flex-col md:flex-row  justify-between '>
          <span className=' text-sm uppercase'><span className='font-bold'>Condominio:</span> {dates?.condominio?.nome}</span>
          <span className=' text-sm uppercase'><span className='font-bold'>Status:</span > {dates?.condominio?.status}</span>
        </div>
        <div className='flex w-full  mb-10   flex-col  '>
          <span className=' text-sm uppercase'> <span className='font-bold'>Endereço:</span > {dates?.condominio?.rua},{dates?.condominio?.numero} - {dates?.condominio?.bairro}</span>

        </div>
      </div>
    </Layout>
  )
}
