import { useState, useEffect } from "react"
import { Chart } from "react-google-charts";



export const ChartMorador = (props) => {
    const [crianca, setCrianca] = useState([])
    const [jovem, setjovem] = useState([])
    const [Adulto, setAdulto] = useState([])
    const [idoso, setidoso] = useState([])

    const data = [
        ["Categoria", "Quantidade"],
        ["Crianças", crianca.length],
        ["Jovem", jovem.length],
        ["Adulto", Adulto.length],
        ["Idoso", idoso.length],
    ];
    const options = {
        backgroundColor: 'transparent',
        color: "#FFF",
        textColor: "#FFFF"

    };

    useEffect(() => {
        var c = []
        var j = []
        var a = []
        var i = []
        props?.moradores?.filter((resp, index) => {
            if (resp.idade <= 10) c.push(resp)
            if (resp.idade > 10 && resp.idade <= 18) j.push(resp)
            if (resp.idade > 18 && resp.idade <= 60) a.push(resp)
            if (resp.idade > 60) i.push(resp)

        })

        setidoso(i)
        setCrianca(c)
        setjovem(j)
        setAdulto(a)
    }, [props.moradores])

    return (
        <>
            <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width={"100%"}
                height={"100%"}
                style={{ backgroundColor: 'transparent' }}
            />
        </>
    )
}



export const ChartCondominio = (props) => {
    const [ativo, setativo] = useState([])
    const [pendente, setpendente] = useState([])
    const [inativo, setinativo] = useState([])

    const data = [
        ["Status", "Quantidade"],
        ["Ativo", ativo.length],
        ["Pendente", pendente.length],
        ["Inativo", inativo.length],
    ];
    const options = {
        backgroundColor: 'transparent',
        color: "#FFF",
        textColor: "#FFFF",
        slices: {
            0: { color: "#3366CC" },
            1: { color: "#FF9900" },
            2: { color: "#DC3912" },
          },

    };

    useEffect(() => {
        var a = []
        var p = []
        var i = []

        props?.condominio?.filter((resp, index) => {
            if (resp.status == 'ativo') a.push(resp)
            if (resp.status == 'pendente') p.push(resp)
            if (resp.status == 'inativo') i.push(resp)

        })
        setativo(a)
        setpendente(p)
        setinativo(i)
    }, [props.condominio])

    return (
        <>
            <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width={"100%"}
                height={"100%"}
                style={{ backgroundColor: 'transparent' }}
            />
        </>
    )
}