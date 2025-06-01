// =============================================================================
// 2. FIRESTORE UTILITIES
// =============================================================================

// lib/firestore.js
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase';

export const firestoreUtils = {
  // Generic CRUD operations
  async create(collectionName, data) {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  },

  async update(collectionName, id, data) {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  },

  async delete(collectionName, id) {
    await deleteDoc(doc(db, collectionName, id));
  },

  async getById(collectionName, id) {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  },

  async getAll(collectionName, orderByField = 'createdAt') {
    const q = query(
      collection(db, collectionName),
      orderBy(orderByField, 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async search(collectionName, field, value) {
    const q = query(
      collection(db, collectionName),
      where(field, '==', value)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
};