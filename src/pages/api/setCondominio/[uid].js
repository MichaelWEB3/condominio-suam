
import { appfire } from "../../../config/firebase";
import { doc, getDoc, setDoc, updateDoc, getFirestore } from "firebase/firestore";

export default async function SetCondominio(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    const { nome, cep, rua, numero, bairro, status } = req.body
    const { uid } = req.query
    const db = getFirestore(appfire);
    const docRef = doc(db, "empresas", uid)
    if (req.method === 'POST') {
        await getDoc(docRef).then(async (item) => {
            if (item.exists()) {

                const arraydate = item.data()
                if (arraydate.condominio) {
                    await updateDoc(docRef, {
                        condominio: [
                            ...arraydate.condominio,
                            {
                                nome: nome,
                                cep: cep,
                                rua: rua,
                                numero: numero,
                                bairro: bairro,
                                status: status
                            }
                        ]
                    }).then(() => {

                        res.status(200).json({ status: "sucess crete " })
                    }).catch((e) => {
                        res.status(400).json({ status: "falid crete  " })
                    })
                } else {
                    await updateDoc(docRef, {
                        condominio: [
                            {
                                nome: nome,
                                cep: cep,
                                rua: rua,
                                numero: numero,
                                bairro: bairro,
                                status: status
                            }
                        ]
                    }).then(() => {

                        res.status(200).json({ status: "sucess crete " })
                    }).catch((e) => {
                        res.status(400).json({ status: "falid crete  " })
                    })
                }

            }
        }).catch((e) => {
            res.status(400).json({ status: "error " })
        })
    }
}