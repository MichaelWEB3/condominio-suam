import React, { useState } from 'react';
import Typewriter from 'typewriter-effect';
import useDados from '../../datehook/userHook';
//import router from 'next/router'

export default function Create() {
  const [password, setpassword] = useState('')
  const [email, setemail] = useState('')
  const [name, setname] = useState('')
  const [cnpj, setcnpj] = useState('')
  const [error, seterror] = useState(false)
  const dates = useDados()

  async function handlerCreate() {

    if (!email || !password || !name || !cnpj) {
      seterror(true)
      setTimeout(() => {
        seterror(false)
      }, (3000));
      return
    }
    dates.handlerCreate(email, password, name, cnpj)
  }

  return (
    <div className=' h-screen w-screen grad flex justify-center items-center text-white flex-col md:flex-row ' >
      <div className="w-full h-auto justify-center items-center flex ">
        <div className=' rounded-lg flex-col trnaslucid md:w-6/12 h-full md:h-3/6 flex justify-start items-center p-5'>
          <h1 className='text-2xl font-bold'>Criar acesso para  empresa</h1>
          <label className='m-2 flex flex-col  items-start justify-start  w-full'>
            <span className=' text-sm font-bold  mb-2'>Email de usuario</span>
            <input name="user" type="text" value={email} onChange={(text) => setemail(text.target.value)} className=' h-8 w-full bg-transparent border-b-grey-200 border-b-2 ' placeholder='Digite seu email' />
          </label>
          <label className='m-2 flex flex-col  items-start justify-start  w-full'>
            <span className=' text-sm font-bold  mb-2'>Senha</span>
            <input name="password" value={password} onChange={(text) => setpassword(text.target.value)} className=' h-8 w-full bg-transparent border-b-grey-200 border-b-2 ' placeholder='Digite uma senha' type="password" />
          </label>
          <label className='m-2 flex flex-col  items-start justify-start  w-full'>
            <span className=' text-sm font-bold  mb-2'>Nome da empresa</span>
            <input name="name" value={name} onChange={(text) => setname(text.target.value)} className=' h-8 w-full bg-transparent border-b-grey-200 border-b-2 ' placeholder='Digite o nome da empresa' type="text" />
          </label>
          <label className='m-2 flex flex-col  items-start justify-start  w-full'>
            <span className=' text-sm font-bold  mb-2'>CNPJ</span>
            <input name="cnpj" value={cnpj} onChange={(text) => setcnpj(text.target.value)} className=' h-8 w-full bg-transparent border-b-grey-200 border-b-2 ' placeholder='Digite o cnpj da empresa' type="text" />
          </label>
          {error &&
            <span className=' text-red-500'>Verifique se todos os campos estão preenchidos corretamente</span>
          }
          <button className='w-full  p-2 mt-10 bg-red-400 hover:bg-red-500 ' onClick={() => handlerCreate()}>
            <span className=''>Criar</span>
          </button>
          <div className='w-full mt-5 flex justify-start items-center'>
          </div>
        </div>
      </div>
    </div >
  )
}
