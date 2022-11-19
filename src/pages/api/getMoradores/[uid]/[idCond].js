
import { appfire } from "../../../../config/firebase";
import { doc, getDoc, setDoc, updateDoc, getFirestore, arrayUnion } from "firebase/firestore";

export default async function GetMoradores(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    const { uid, idCond } = req.query
    const db = getFirestore(appfire);
    const docRef = doc(db, "empresas", uid)
    if (req.method === 'GET') {
        await getDoc(docRef).then(async (item) => {
            if (item.exists()) {
                const arraydate = item.data()
                const returndate = arraydate?.moradores?.filter((item, index) => item.idCond == idCond)
                res.status(200).json([...returndate])
            }
        }).catch((e) => {
            res.status(400).json({ status: "error " })
        })
    }
}