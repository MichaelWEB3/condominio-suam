
import { appfire } from "../../../../config/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

export default async function UpdateCondominio(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    const { uid, id } = req.query
    const db = getFirestore(appfire);
    const docRef = doc(db, "empresas", uid)
    const { nome, cep, rua, numero, bairro, status } = req.body

    if (req.method === 'POST') {
        await getDoc(docRef).then(async (item) => {
            if (item.exists()) {
                const arraydate = item.data()
                const returndate = arraydate?.condominio?.filter((item, index) => index != id)

                returndate.push({
                    nome, cep, rua, numero, bairro, status
                })

                console.log(returndate)

                await updateDoc(docRef, {
                    condominio: [
                        ...returndate,
                    ]
                }).then(() => {
                    res.status(200).json({ status: "sucess exclude " })
                }).catch((e) => {
                    res.status(400).json({ status: "falid exclude  " })
                })
            }
        }).catch((e) => {
            res.status(400).json({ status: "error " })
        })
    }
}