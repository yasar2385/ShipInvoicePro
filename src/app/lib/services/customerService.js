import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy 
} from 'firebase/firestore';
import { db } from './firebase';

const COLLECTION_NAME = 'customers';

export const customerService = {
  // Create customer
  async createCustomer(customerData) {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...customerData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return docRef.id;
  },

  // Get all customers
  async getCustomers() {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('companyName')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  // Update customer
  async updateCustomer(id, updates) {
    const customerRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(customerRef, {
      ...updates,
      updatedAt: new Date()
    });
  },

  // Delete customer
  async deleteCustomer(id) {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  }
};