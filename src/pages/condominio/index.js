import React, { useState, useEffect, useRef } from 'react';
import useDados from '../../datehook/userHook';
import Layout from '../../components/layout';
//import router from 'next/router'

export default function Condominio() {

  const dates = useDados()
  const [condominio, setcondominio] = useState('')
  const [cep, setcep] = useState('')
  const [rua, setrua] = useState('')
  const [numero, setnumero] = useState('')
  const [bairro, setbairro] = useState('')
  const [status, setstatus] = useState('')
  const [create, setcreate] = useState(true)
  const [id, setID] = useState(null)
  const item = useRef(null)

  useEffect(() => {
    if (create) {
      item.current.value = 'new'
      setcondominio('')
      setcep('')
      setrua('')
      setnumero('')
      setstatus('')
      setbairro('')
    } else {
      if (dates.condominio) {
        setcondominio(dates?.condominio?.nome)
        setcep(dates?.condominio?.cep)
        setrua(dates?.condominio?.rua)
        setnumero(dates?.condominio?.numero)
        setstatus(dates?.condominio?.status)
        setbairro(dates?.condominio?.bairro)
      }
    }

  }, [dates?.date?.uid, dates.condominio, create, id, dates.render])
  return (
    <Layout page="Condominio">
      <div className=' h-auto p-2 w-full  ' >
        <div className='w-full flex justify-center items-center  pl-20 pr-20 pt-5'>
          <select className=' w-full  styleSelect  border-red-600' ref={item} onChange={(item) => {
            if (item.target.value == 'new') {
              setcreate(true)
            } else {
              dates?.getCondominio(dates?.date?.uid, item.target.value)
              setID(item.target.value)
              setcreate(false)
            }
          }}>
            <option value={'new'}> Criar novo condominio</option>
            {dates?.date?.condominio?.map((item, index) => {
              return <option value={index} key={index}> {item.nome}</option>
            })}
          </select>
        </div>

        <div className='w-full h-auto flex justify-center items-center flex-col md:pl-20 md:pr-20 pt-5' >
          <label className='m-5 flex flex-col  items-start justify-start  w-full'>
            <span className=' text-sm font-bold  mb-2'>Condominio</span>
            <input name="condominio" type="text" value={condominio} onChange={(text) => setcondominio(text.target.value)} className=' h-8 w-full bg-transparent border-b-grey-200 border-b-2 ' placeholder='Digite seu nome de Condominio' />
          </label>
          <label className='m-5 flex flex-col  items-start justify-start  w-full'>
            <span className=' text-sm font-bold  mb-2'>Cep</span>
            <input name="cep" type="text" value={cep} onChange={(text) => setcep(text.target.value)} className=' h-8 w-full bg-transparent border-b-grey-200 border-b-2 ' placeholder='Digite Cep' />
          </label>
          <label className='m-5 flex flex-col  items-start justify-start  w-full'>
            <span className=' text-sm font-bold  mb-2'>Rua</span>
            <input name="rua" type="text" value={rua} onChange={(text) => setrua(text.target.value)} className=' h-8 w-full bg-transparent border-b-grey-200 border-b-2 ' placeholder='Digite Rua' />
          </label>
          <label className='m-5 flex flex-col  items-start justify-start  w-full'>
            <span className=' text-sm font-bold  mb-2'>Numero</span>
            <input name="numero" type="text" value={numero} onChange={(text) => setnumero(text.target.value)} className=' h-8 w-full bg-transparent border-b-grey-200 border-b-2 ' placeholder='Digite Numero' />
          </label>
          <label className='m-5 flex flex-col  items-start justify-start  w-full'>
            <span className=' text-sm font-bold  mb-2'>Bairro</span>
            <input name="bairro" type="text" value={bairro} onChange={(text) => setbairro(text.target.value)} className=' h-8 w-full bg-transparent border-b-grey-200 border-b-2 ' placeholder='Digite Bairro' />
          </label>
          <label className='m-5 flex flex-col  items-start justify-start  w-full'>
            <span className=' text-sm font-bold  mb-2'>status</span>
            <input name="status" type="text" value={status} onChange={(text) => setstatus(text.target.value)} className=' h-8 w-full bg-transparent border-b-grey-200 border-b-2 ' placeholder='Digite status' />
          </label>
          {create &&
            <button className='w-full mt-2 h-10 bg-red-400 hover:bg-red-500 ' onClick={() => {
              dates.setCondominioBD(dates?.date?.uid, condominio, cep, rua, numero, bairro, status)
            }}>
              <span>Criar</span>
            </button>
          }
          {!create &&
            <>
              <button className='w-full mt-2 h-10 bg-red-400 hover:bg-red-500 ' onClick={() => {
                dates.deleteCondominioDB(dates?.date?.uid, id)
                setcreate(true)
              }}>
                <span>Excluir</span>
              </button>
              <button className='w-full mt-2 h-10 bg-red-400 hover:bg-red-500 '
                onClick={() => {
                  dates.editCondominio(dates?.date?.uid, id, condominio, cep, rua, numero, bairro, status)
                  setcreate(true)
                }
                }>
                <span>Editar</span>
              </button>
            </>
          }
        </div>
      </div>
    </Layout >
  )
}
