import React, { useState } from 'react';
import Typewriter from 'typewriter-effect';
import useDados from '../../datehook/userHook';
import router from 'next/router'

export default function Login() {
  const [password, setpassword] = useState('')
  const [email, setemail] = useState('')
  const dates = useDados()

  function getCreate() {
    router.push('/crate')
  }

  async function handlerLogin() {
    dates.handlerLogin(email, password)
  }

  return (
    <div className=' h-screen w-screen gradLogin flex justify-center items-center text-white flex-col md:flex-row ' >
      <div className="w-full h-full justify-center items-center flex ">
        <h1 className="font-bold  text-4xl">
          <Typewriter onInit={(typewriter) => {
            typewriter.typeString('Holla, seja bem-vindo a o condominio-suam.')
              .pauseFor(2500)
              .start();
          }}
          />
        </h1>
      </div>
      <div className="w-full h-full justify-center items-center flex ">
        <div className=' rounded-lg flex-col trnaslucid md:w-6/12 h-full md:h-3/6 flex justify-start items-center p-5'>
          <h1 className='text-2xl font-bold'>Login</h1>
          <label className='m-5 flex flex-col  items-start justify-start  w-full'>
            <span className=' text-sm font-bold  mb-2'>Usuario</span>
            <input name="user" type="text" value={email} onChange={(text) => setemail(text.target.value)} className=' h-8 w-full bg-transparent border-b-grey-200 border-b-2 ' placeholder='Digite seu nome de usuario' />
          </label>
          <label className='m-5 flex flex-col  items-start justify-start  w-full'>
            <span className=' text-sm font-bold  mb-2'>Senha</span>
            <input name="password" value={password} onChange={(text) => setpassword(text.target.value)} className=' h-8 w-full bg-transparent border-b-grey-200 border-b-2 ' placeholder='Digite sua senha' type="password" />
          </label>
          <button className='w-full mt-10 h-10 bg-red-400 hover:bg-red-500 ' onClick={() => handlerLogin()}>
            <span>Login</span>
          </button>
          <div className='w-full mt-5 flex justify-start items-center'>
            <span className='mr-2'>Não tem conta? </span>
            <span className='font-bold text-sm cursor-pointer' onClick={() => getCreate()}>Crie uma conta.</span>
          </div>
        </div>
      </div>
    </div >
  )
}
