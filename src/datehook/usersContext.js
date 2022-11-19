import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import router from 'next/router'
import Cookies from 'js-cookie'

const userContext = createContext({})
export function UserProvider(props) {
    const [date, setDate] = useState(null)
    const [condominio, setcondominio] = useState(null)
    const [moradores, setmoradores] = useState(null)
    const [morador, setmorador] = useState(null)
    const [render, setrender] = useState(null)
    const [select, setSeelct] = useState(null)
    useEffect(() => {
        const password = Cookies.get('password')
        const email = Cookies.get('email')
        if (password, email) {
            handlerLogin(email, password, false)
        }
    }, [render, select])

    async function handlerLogin(email, password, loading = true) {
        await axios.post('/api/login', {
            email: email,
            password: password
        }).then((resp) => {
            setDate(resp.data)
            Cookies.set('email', email)
            Cookies.set('password', password)
            Cookies.set('uid', resp.data.uid)
            if (loading) router.push('/home')
        }).catch((e) => {
            alert("erro de requisição")
        })
    }
    async function handlerCreate(email, password, name, cnpj) {
        await axios.post('/api/create', {
            email: email,
            password: password,
            name: name,
            cnpj: cnpj,
        }).then(() => {
            router.push('/login')
            alert('criado com sucesso')
        }).catch((e) => {
            alert("erro de requisição")
        })
    }
    async function getCondominio(uid, id) {
        await axios.get(`/api/getCondominio/${uid}/${id}`).then((resp) => {
            const date = resp
            setcondominio(date.data)
        }).catch((e) => {
            alert("erro ao consultar condominio")
        })
    }

    async function setCondominioBD(uid, nome, cep, rua, numero, bairro, status) {
        await axios.post(`/api/setCondominio/${uid}`, {
            nome,
            cep,
            rua,
            numero,
            bairro,
            status
        }).then((resp) => {
            alert("condominio adicionado da base de dados")
            setrender(true)
            setTimeout(() => {
                setrender(false)
            }, 1000)
        }).catch((e) => {
            alert("erro de requisição")
        })
    }
    async function deleteCondominioDB(uid, id,) {
        await axios.get(`/api/deleteCondominio/${uid}/${id}`).then((resp) => {
            alert(" removido da base de dados")
            setrender(false)
            setTimeout(() => {
                setrender(true)
            }, 1000)
        }).catch((e) => {
            alert("erro de requisição")
        })
    }

    async function editCondominio(uid, id, nome, cep, rua, numero, bairro, status) {
        await axios.post(`/api/updateCondominio/${uid}/${id}`, {
            nome,
            cep,
            rua,
            numero,
            bairro,
            status
        }).then((resp) => {
            alert("condominio editado  da base de dados")
            setrender(true)
            setTimeout(() => {
                setrender(false)
            }, 1000)
        }).catch((e) => {
            alert("erro de requisição")
        })
    }
    async function setMorador(uid, idCond, nome, idade, cpf, telefone, rg, status) {
        await axios.post(`/api/setMorador/${uid}/${idCond}`, {
            nome,
            idade,
            cpf,
            telefone,
            rg,
            status
        }).then((resp) => {
            alert("Morador Cadastado com sucesso")
            setrender(true)
            setTimeout(() => {
                setrender(false)
            }, 1000)
        }).catch((e) => {
            alert("erro de requisição")
        })
    }

    async function getMoradores(uid, idCond) {
        await axios.get(`/api/getMoradores/${uid}/${idCond}`).then((resp) => {
            const date = resp
            setmoradores(date.data)
        }).catch((e) => {
            alert("erro ao consultar moradores")
        })
    }
    async function getMorador(uid, idCond, rg) {
        await axios.get(`/api/getMorador/${uid}/${idCond}/${rg}`).then((resp) => {
            const date = resp
            setmorador(date.data)
        }).catch((e) => {
            alert("erro ao consultar moradores")
        })
    }

    async function deleteMorador(uid, idCond, rg) {
        await axios.get(`/api/deleteMorador/${uid}/${idCond}/${rg}`).then((resp) => {
            const date = resp
            alert(" removido da base de dados")
        }).catch((e) => {
            alert("erro ao removido morador")
        })
    }

    async function updateMorador(uid, idCond, rg, nome, idade, cpf, telefone, newRg, status) {
        await axios.post(`/api/updateMorador/${uid}/${idCond}/${rg}`, {
            nome,
            idade,
            cpf,
            telefone,
            newRg,
            status
        }).then((resp) => {
            alert("Morador atualzado com sucesso com sucesso")
            setrender(true)
            setTimeout(() => {
                setrender(false)
            }, 1000)
        }).catch((e) => {
            alert("erro de requisição")
        })
    }
    return (
        <userContext.Provider value={{
            handlerLogin,
            handlerCreate,
            date,
            condominio,
            getCondominio,
            setCondominioBD,
            deleteCondominioDB,
            render,
            editCondominio,
            setMorador,
            getMoradores,
            moradores,
            getMorador,
            morador,
            deleteMorador,
            updateMorador,
            setSeelct
        }}>
            {props.children}
        </userContext.Provider>
    )
}

export default userContext