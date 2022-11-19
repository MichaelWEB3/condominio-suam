
import { appfire } from "../../../../config/firebase";
import { doc, getDoc, setDoc, updateDoc, getFirestore, arrayUnion } from "firebase/firestore";

export default async function SetMorador(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    const { nome, idade, cpf, rg, telefone, status } = req.body
    const { uid, idCond } = req.query
    const db = getFirestore(appfire);
    const docRef = doc(db, "empresas", uid)

    if (req.method === 'POST') {
        await getDoc(docRef).then(async (item) => {
            if (item.exists()) {
                const arraydate = item.data()
                await updateDoc(docRef, {
                    moradores: arrayUnion({
                        idCond: idCond,
                        nome,
                        idade,
                        cpf,
                        rg,
                        telefone,
                        status
                    })
                }).then(() => {
                    res.status(200).json({ status: "sucess crete " })
                }).catch((e) => {
                    res.status(400).json({ status: "falid crete  " })
                })
            }
        }).catch((e) => {
            res.status(400).json({ status: "error " })
        })
    }
}