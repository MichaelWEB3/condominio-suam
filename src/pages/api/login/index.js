
import { appfire } from "../../../config/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

export default async function Login(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    const { email, password } = req.body
    if (req.method == 'POST') {
        const auth = getAuth(appfire)
        const db = getFirestore(appfire);
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const docRef = doc(db, "empresas", userCredential.user.uid);
                getDoc(docRef).then((item) => {
                    if (item.exists()) {
                        res.status(200).json({ uid: userCredential.user.uid, ...item.data() })
                        //console.log("Document data:", item.data());
                    }
                })
            }).catch((error) => {
                res.status(405).json({ erro: `${error.message}` })
            })
    } else {
        res.status(400).json({ erro: "erro requisition" })
    }

}
