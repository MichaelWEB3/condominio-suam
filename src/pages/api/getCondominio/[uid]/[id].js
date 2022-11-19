
import { appfire } from "../../../../config/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

export default async function GetCondominio(req, res) {
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

    if (req.method === 'GET') {
        await getDoc(docRef).then((item) => {
            if (item.exists()) {
                const arraydate = item.data()
                const returndate = arraydate?.condominio?.filter((item, index) => index == id)
                res.status(200).json({ ...returndate[0] })
            }
        }).catch((e) => {
            res.status(400).json({ status: "error " })
        })
    }
}