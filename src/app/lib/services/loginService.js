import { db } from '../firebase/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import MD5 from 'crypto-js/md5'

export const loginAdmin = async (email, password) => {
    const passwordHash = MD5(password).toString()

    const q = query(
        collection(db, 'admins'),
        where('email', '==', email),
        where('passwordHash', '==', passwordHash)
    )

    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
        throw new Error('Invalid credentials')
    }

    const adminData = querySnapshot.docs[0].data()
    return {
        id: querySnapshot.docs[0].id,
        ...adminData
    }
}
