require('dotenv').config()
import { initializeApp } from "firebase/app"
import { getFirestore, collection, doc, getDocs, getDoc, query } from "firebase/firestore/lite"

const firebaseConfig = {
    apiKey: `${process.env.APIKEY}`,
    authDomain: "vanlife-caf62.firebaseapp.com",
    projectId: "vanlife-caf62",
    storageBucket: "vanlife-caf62.appspot.com",
    messagingSenderId: "471290874009",
    appId: "1:471290874009:web:c12e670e4fe2bc779c1008"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Refactoring the fetching functions below
const vansCollectionRef = collection(db, "vans")

export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const snapshot = await getDoc(docRef)
    return {
        ...snapshot.data(),
        id: snapshot.id
    }
}

export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123"))
    const snapshot = await getDocs(q)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}