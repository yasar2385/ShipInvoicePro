
/* 
 * https://claude.ai/chat/59b0500b-d04e-4d94-9f0b-38160cb79461
 * https://claude.ai/chat/3e6bf156-37c8-47e8-a043-4266afc37880
 * 
 * https://claude.site/artifacts/2d6a5713-ae22-4a8d-8671-28026b5dabed
*/


/* 

try {
  const files = // ... get files from input
  const uploadedFiles = await userService.uploadAndConvertToBase64(files);
  
  uploadedFiles.forEach(file => {
    console.log('File Name:', file.name);
    console.log('Firebase URL:', file.url);
    console.log('Original Size:', file.originalSize);
    console.log('Compressed Size:', file.size);
  });
} catch (error) {
  console.error('Upload failed:', error);
}

*/


import {
    collection,
    addDoc,
    getDocs,
    doc,
    getDoc,
    updateDoc,
    deleteDoc,
    query,
    where, writeBatch
} from 'firebase/firestore';
import {
    db,
    storage
} from '../config/firebase';

import {
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "firebase/storage";

// Session storage keys
const CACHE_KEYS = {
    USERS: 'cached_users',
    USER_DETAILS: 'cached_user_'
};

// Cache expiration time (in milliseconds)
const CACHE_EXPIRATION = 5 * 60 * 1000; // 5 minutes

export const userService = {
    // Cache utilities
    _getFromCache(key) {
        try {
            const cachedData = sessionStorage.getItem(key);
            if (!cachedData) return null;

            const { data, timestamp } = JSON.parse(cachedData);
            const isExpired = Date.now() - timestamp > CACHE_EXPIRATION;

            return isExpired ? null : data;
        } catch (error) {
            console.warn('Cache retrieval error:', error);
            return null;
        }
    },

    _setToCache(key, data) {
        try {
            const cacheObject = {
                data,
                timestamp: Date.now()
            };
            sessionStorage.setItem(key, JSON.stringify(cacheObject));
        } catch (error) {
            console.warn('Cache storage error:', error);
        }
    },

    _invalidateCache(key) {
        try {
            sessionStorage.removeItem(key);
        } catch (error) {
            console.warn('Cache invalidation error:', error);
        }
    },

    async createUser(userData, tbl = "users") {
        try {
            const docRef = await addDoc(collection(db, tbl), userData);
            const newUser = {
                ...userData,
                id: docRef.id
            };

            // Invalidate users collection cache
            this._invalidateCache(CACHE_KEYS.USERS);

            return newUser;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    },
    // Get all benefits
    async getAllUsers() {
        try {
            const querySnapshot = await getDocs(collection(db, 'residents'));
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error getting benefits:', error);
            throw new Error('Failed to get benefits');
        }
    },
    async getUsers(tbl = "users") {
        // Check cache first
        const cachedUsers = this._getFromCache(CACHE_KEYS.USERS);
        if (cachedUsers) {
            return cachedUsers;
        }

        // Fetch from Firestore if not in cache
        try {
            const usersCollection = collection(db, tbl);
            const userSnapshot = await getDocs(usersCollection);
            const users = userSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Store in cache
            this._setToCache(CACHE_KEYS.USERS, users);

            return users;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },

    async getUserById(userId, tbl = "users") {
        // Check cache first
        const cacheKey = `${CACHE_KEYS.USER_DETAILS}${userId}`;
        const cachedUser = this._getFromCache(cacheKey);
        if (cachedUser) {
            return cachedUser;
        }

        try {
            const userDoc = doc(db, tbl, userId);
            const userSnapshot = await getDoc(userDoc);

            if (userSnapshot.exists()) {
                const userData = {
                    id: userSnapshot.id,
                    ...userSnapshot.data()
                };

                // Store in cache
                this._setToCache(cacheKey, userData);

                return userData;
            } else {
                throw new Error(`User with ID ${userId} not found`);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    },

    async updateUser(userId, userData, tbl = "users") {
        const userDoc = doc(db, tbl, userId);
        try {
            // First, check if the document exists
            const docSnap = await getDoc(userDoc);
            if (!docSnap.exists()) {
                throw new Error(`Document with ID ${userId} does not exist in ${tbl}`);
            }

            // Update the document with the new data
            const updatedData = {
                ...userData,
                lastUpdated: new Date().toISOString()
            };

            await updateDoc(userDoc, updatedData);

            const updatedUser = {
                id: userId,
                ...updatedData
            };

            // Update cache
            const cacheKey = `${CACHE_KEYS.USER_DETAILS}${userId}`;
            this._setToCache(cacheKey, updatedUser);
            this._invalidateCache(CACHE_KEYS.USERS);

            return updatedUser;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    },

    async deleteUser(userId, tbl = "users") {
        try {
            const userDoc = doc(db, tbl, userId);
            await deleteDoc(userDoc);

            // Invalidate caches
            const cacheKey = `${CACHE_KEYS.USER_DETAILS}${userId}`;
            this._invalidateCache(cacheKey);
            this._invalidateCache(CACHE_KEYS.USERS);

            return userId;
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    },

    async updateApplicationStatus(userId, statusData, tbl) {
        try {
            const userDoc = doc(db, tbl, userId);
            await updateDoc(userDoc, statusData);

            // Invalidate caches
            const cacheKey = `${CACHE_KEYS.USER_DETAILS}${userId}`;
            this._invalidateCache(cacheKey);
            this._invalidateCache(CACHE_KEYS.USERS);

            return {
                id: userId,
                ...statusData
            };
        } catch (error) {
            console.error('Error updating applicant status:', error);
            throw error;
        }
    },

    // File upload methods remain mostly unchanged as they interact with storage not Firestore
    async uploadFiles(files) {
        const uploadPromises = files.map(file => {
            return new Promise((resolve, reject) => {
                // Create a reference to the storage location
                const storageRef = ref(storage, `supportDocs/${Date.now()}_${file.name}`);

                // Create upload task
                const uploadTask = uploadBytesResumable(storageRef, file);

                // Listen for state changes, errors, and completion
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        // Optional: Track upload progress
                        const progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log(`Upload is ${progress}% done`);
                    },
                    (error) => {
                        // Handle unsuccessful uploads
                        console.error('Upload error', error);
                        reject(error);
                    },
                    async () => {
                        // Handle successful uploads
                        try {
                            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                            resolve({
                                name: file.name,
                                url: downloadURL,
                                size: file.size,
                                type: file.type
                            });
                        } catch (error) {
                            reject(error);
                        }
                    }
                );
            });
        });
        // Wait for all uploads to complete
        return Promise.all(uploadPromises);
    },
    // Image compression utility

    // Image compression utility remains unchanged
    async compressImage(file, maxSizeBytes = 5 * 1024 * 1024, quality = 0.7) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    // Create canvas
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    // Calculate new dimensions while maintaining aspect ratio
                    let width = img.width;
                    let height = img.height;
                    const maxWidth = 1920; // Max width to prevent extremely large images
                    const maxHeight = 1080; // Max height to prevent extremely large images

                    // Scale down if image is larger than max dimensions
                    if (width > maxWidth || height > maxHeight) {
                        const ratio = Math.min(maxWidth / width, maxHeight / height);
                        width = Math.floor(width * ratio);
                        height = Math.floor(height * ratio);
                    }

                    canvas.width = width;
                    canvas.height = height;

                    // Draw image on canvas
                    ctx.drawImage(img, 0, 0, width, height);

                    // Convert to blob with compression
                    canvas.toBlob((blob) => {
                        // Create a new File object from the blob
                        const compressedFile = new File([blob], file.name, {
                            type: file.type,
                            lastModified: Date.now()
                        });

                        // Verify size
                        if (compressedFile.size <= maxSizeBytes) {
                            resolve(compressedFile);
                        } else {
                            // If still too large, recursively compress with lower quality
                            this.compressImage(file, maxSizeBytes, quality - 0.1)
                                .then(resolve)
                                .catch(reject);
                        }
                    }, file.type, quality);
                };
                img.onerror = reject;
                img.src = event.target.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    },

    async uploadAndConvertToBase64(files) {
        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        const maxSizeBytes = 5 * 1024 * 1024; // 5MB

        const uploadPromises = files.map(async (file) => {
            // Validate file type
            if (!allowedTypes.includes(file.type)) {
                throw new Error(`Unsupported file type: ${file.type}. Allowed types: ${allowedTypes.join(', ')}`);
            }

            // For images, compress if too large
            let processedFile = file;
            if (file.type.startsWith('image/') && file.size > maxSizeBytes) {
                try {
                    processedFile = await this.compressImage(file, maxSizeBytes);
                } catch (compressionError) {
                    console.error('Image compression failed', compressionError);
                    throw new Error('Could not compress image');
                }
            }

            return new Promise((resolve, reject) => {
                // Create a reference to the storage location
                const storageRef = ref(storage, `uploads/${Date.now()}_${processedFile.name}`);

                // Create upload task
                const uploadTask = uploadBytesResumable(storageRef, processedFile);

                // Listen for state changes, errors, and completion
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        // Optional: Track upload progress
                        const progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log(`Upload is ${progress}% done`);
                    },
                    (error) => {
                        // Handle unsuccessful uploads
                        console.error('Upload error', error);
                        reject(error);
                    },
                    async () => {
                        try {
                            // Get download URL
                            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

                            // Convert file to Base64
                            const base64 = await new Promise((resolveBase64, rejectBase64) => {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    resolveBase64(reader.result);
                                };
                                reader.onerror = (error) => {
                                    rejectBase64(error);
                                };
                                reader.readAsDataURL(processedFile);
                            });

                            resolve({
                                name: processedFile.name,
                                url: downloadURL,
                                base64: base64,
                                size: processedFile.size,
                                type: processedFile.type,
                                originalSize: file.size // Optional: track original file size
                            });
                        } catch (error) {
                            reject(error);
                        }
                    }
                );
            });
        });
        return Promise.all(uploadPromises);
    },
    async updateAllMtNagarRecords(tbl = "residents") {
        try {
            const usersCollection = collection(db, tbl);
            const q = query(usersCollection, where("area", "==", "mt-nagar"));
            const querySnapshot = await getDocs(q);

            const batch = writeBatch(db); // Correct way to initialize batch

            querySnapshot.forEach((docSnapshot) => {
                const userDocRef = doc(db, tbl, docSnapshot.id);
                batch.update(userDocRef, { area: "Muthamizh-Nagar" });
            });

            await batch.commit(); // Commit batch updates
            console.log(`Updated ${querySnapshot.size} records successfully.`);
            this._invalidateCache(CACHE_KEYS.USERS); // Invalidate cache

        } catch (error) {
            console.error("Error updating records:", error);
            throw error;
        }
    },
    async cleanAndUpdateAddresses(tbl = "residents") {
        try {
            const usersCollection = collection(db, tbl);
            const querySnapshot = await getDocs(query(usersCollection));

            const batch = writeBatch(db);

            querySnapshot.forEach((docSnapshot) => {
                const data = docSnapshot.data();
                const { address, areaOther } = data;

                if (address && areaOther && address.includes(areaOther)) {
                    const cleanedAddress = address.replace(areaOther, "").trim().replace(/,\s*$/, ""); // Clean address
                    const userDocRef = doc(db, tbl, docSnapshot.id);
                    batch.update(userDocRef, { address: cleanedAddress });
                }
            });

            await batch.commit();
            console.log("Updated addresses successfully.");
        } catch (error) {
            console.error("Error updating addresses:", error);
            throw error;
        }
    },
    async copyAreaOtherToRemarksAndUpdateFields(tbl = "residents") {
        try {
            console.log("-copyAreaOtherToRemarksAndUpdateFields-");
            const usersCollection = collection(db, tbl);
            const querySnapshot = await getDocs(query(usersCollection));

            const batch = writeBatch(db);

            querySnapshot.forEach((docSnapshot) => {
                const data = docSnapshot.data();
                const { areaOther } = data;

                if (areaOther) {
                    let maritalStatus = data.maritalStatus || ""; // Preserve existing value if not updating
                    let physicallyChallenged = data.physicallyChallenged || false; // Preserve existing value

                    // Check for Widow variations
                    const widowKeywords = ["Vidow", "Widow", "Window"];
                    if (widowKeywords.some(keyword => areaOther.includes(keyword))) {
                        maritalStatus = "Widow";
                    }

                    // Check for Physically Challenged keywords
                    const physicallyChallengedKeywords = ["Physically", "Challenged"];
                    if (physicallyChallengedKeywords.some(keyword => areaOther.includes(keyword))) {
                        physicallyChallenged = true;
                    }

                    const userDocRef = doc(db, tbl, docSnapshot.id);
                    batch.update(userDocRef, {
                        remarks: areaOther, // Copy `areaOther` to `remarks`
                        areaOther: "",      // Clear `areaOther`
                        maritalStatus,      // Update marital status if conditions met
                        physicallyChallenged // Update physicallyChallenged if conditions met
                    });
                }
            });

            await batch.commit();
            console.log("Successfully updated records.");
        } catch (error) {
            console.error("Error updating records:", error);
            throw error;
        }
    }

}