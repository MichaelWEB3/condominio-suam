import React, { useState, useEffect, useRef } from 'react';
import useDados from '../../datehook/userHook';
import Layout from '../../components/layout';
//import router from 'next/router'

export default function Morador() {
  const dates = useDados()
  const [morador, setmorador] = useState('')
  const [idade, setidade] = useState('')
  const [cpf, setcpf] = useState('')
  const [telefone, settelefone] = useState('')
  const [rg, setrg] = useState('')
  const [status, setstatus] = useState('')
  const [create, setcreate] = useState(true)
  const [idCodominio, setIDcodominio] = useState(null)
  const [idMorador, setIdMorador] = useState(null)
  const [cretMorador, setcretMorador] = useState(null)
  const item = useRef(null)
  const [rgNew, setrgNew] = useState(false)
  const [rgNovo, setrgNovo] = useState('')

  useEffect(() => {
    if (create) {
      //item?.current?.value = 'new'
      setmorador('')
      setidade('')
      setcpf('')
      settelefone('')
      setstatus('')
      setrg('')
      setrgNovo('')
    } else {
      if (dates.morador) {
        setmorador(dates?.morador?.nome)
        setidade(dates?.morador?.idade)
        setcpf(dates?.morador?.cpf)
        settelefone(dates?.morador?.telefone)
        setstatus(dates?.morador?.status)
        setrg(dates?.morador?.rg)
        setrgNew(true)
        setrgNovo(dates?.morador?.rg)
      }
    }

  }, [dates?.date?.uid, dates.morador, idCodominio, dates.render, create, cretMorador])

  useEffect(() => {
    getInfos()
  }, [idCodominio, cretMorador])

  function getInfos() {
    if (dates?.date?.condominio) dates?.getCondominio(dates?.date?.uid, idCodominio)
    if (dates?.date?.moradores) dates?.getMoradores(dates?.date?.uid, idCodominio)
  }

  return (
    <Layout page="Morador">
      <div className=' h-auto p-2 w-full  ' >
        <div className='w-full flex justify-center flex-col items-center  pl-20 pr-20 pt-5'>
          <select className=' w-full  styleSelect  border-red-600' ref={item} onChange={(item) => {
            setIDcodominio(item.target.value)
            dates?.getCondominio(dates?.date?.uid, item.target.value)
            setcreate(true)

            if (dates?.date?.moradores) dates?.getMoradores(dates?.date?.uid, item.target.value)
          }}>
            <option> Selecione um condominio</option>
            {dates?.date?.condominio?.map((item, index) => {
              return <option value={index} key={index} > {item.nome}</option>
            })}
          </select>
          {dates?.moradores &&
            < select className=' w-full  styleSelect  border-red-600' onChange={(item) => {
              if (item.target.value == 'new') {
                setcreate(true)
              } else {
                // dates?.getMoradores(dates?.date?.uid, item.target.value)
                setIdMorador(item.target.value)
                setcreate(false)
                dates?.getMorador(dates?.date?.uid, idCodominio, item.target.value)
              }
            }}>
              <option value={'new'}> Criar novo morador</option>
              {dates?.moradores?.map((item, index) => {
                return <option value={item.rg} key={index}> {item.nome}</option>
              })}
            </select>
          }
        </div>
        <div className='w-full h-auto flex justify-center items-center flex-col md:pl-20 md:pr-20 pt-5' >
          <label className='m-5 flex flex-col  items-start justify-start  w-full'>
            <span className=' text-sm font-bold  mb-2'>Morador</span>
            <input name="nome" type="text" value={morador} onChange={(text) => setmorador(text.target.value)} className=' h-8 w-full bg-transparent border-b-grey-200 border-b-2 ' placeholder='Digite seu nome de morador' />
          </label>
          <label className='m-5 flex flex-col  items-start justify-start  w-full'>
            <span className=' text-sm font-bold  mb-2'>Idade</span>
            <input name="idade" type="text" value={idade} onChange={(text) => setidade(text.target.value)} className=' h-8 w-full bg-transparent border-b-grey-200 border-b-2 ' placeholder='Digite idade' />
          </label>
          <label className='m-5 flex flex-col  items-start justify-start  w-full'>
            <span className=' text-sm font-bold  mb-2'>CPF</span>
            <input name="cpf" type="text" value={cpf} onChange={(text) => setcpf(text.target.value)} className=' h-8 w-full bg-transparent border-b-grey-200 border-b-2 ' placeholder='Digite cpf' />
          </label>
          <label className='m-5 flex flex-col  items-start justify-start  w-full'>
            <span className=' text-sm font-bold  mb-2'>Telefone</span>
            <input name="telefone" type="text" value={telefone} onChange={(text) => settelefone(text.target.value)} className=' h-8 w-full bg-transparent border-b-grey-200 border-b-2 ' placeholder='Digite telefone' />
          </label>
          <label className='m-5 flex flex-col  items-start justify-start  w-full'>
            <span className=' text-sm font-bold  mb-2'>RG</span>

            {rgNew ? <input name="rg" type="text" value={rgNovo} onChange={(text) => setrgNovo(text.target.value)} className=' h-8 w-full bg-transparent border-b-grey-200 border-b-2 ' placeholder='Digite rg' />
              :
              <input name="rg" type="text" value={rg} onChange={(text) => setrg(text.target.value)} className=' h-8 w-full bg-transparent border-b-grey-200 border-b-2 ' placeholder='Digite rg' />
            }
          </label>
          <label className='m-5 flex flex-col  items-start justify-start  w-full'>
            <span className=' text-sm font-bold  mb-2'>Status</span>
            <input name="status" type="text" value={status} onChange={(text) => setstatus(text.target.value)} className=' h-8 w-full bg-transparent border-b-grey-200 border-b-2 ' placeholder='Digite status' />
          </label>
          {create &&
            <button className='w-full mt-2 h-10 bg-red-400 hover:bg-red-500 ' onClick={() => {
              console.log(dates?.date?.uid, idCodominio, morador, idade, cpf, telefone, rg, status)

              if (rg || morador || idade || cpf || telefone || status) {
                dates.setMorador(dates?.date?.uid, idCodominio, morador, idade, cpf, telefone, rg, status)
                getInfos()
                window.location.reload()
              } else {
                alert("preencha todos os campos")
              }
            }}>
              <span>Criar</span>
            </button>
          }
          {!create &&
            <>
              <button className='w-full mt-2 h-10 bg-red-400 hover:bg-red-500 ' onClick={() => {
                dates?.deleteMorador(dates?.date?.uid, idCodominio, idMorador)
                dates?.setSeelct('excluir')
                window.location.reload()
              }}>
                <span>Excluir</span>
              </button>
              <button className='w-full mt-2 h-10 bg-red-400 hover:bg-red-500 '
                onClick={() => {
                  dates?.setSeelct('atualizar')
                  dates?.updateMorador(dates?.date?.uid, idCodominio, rg, morador, idade, cpf, telefone, rgNovo, status)
                  getInfos()
                  window.location.reload()
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
