// firestoreDatabase.ts
import { db } from '@/database/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';

interface UserData {
  name: string;
}

export const addUser = async (userId: string, userData: UserData) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      await setDoc(userDocRef, {
        name: userData.name,
        userId: userId,
      });
      const journalDocRef = doc(db, 'users', userId, 'journalEntries', 'initialDoc');
      await setDoc(journalDocRef, {});
      console.log('User added successfully.');
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  };

export const createJournalEntryCollection = async(userId: string) => {
    try{
        await setDoc(doc(db, 'users', userId, 'journalEntries', 'initialDoc'), {});
    } catch (error) {
        console.error('Error creating journal entry collection:', error);
        throw error;
    }
}