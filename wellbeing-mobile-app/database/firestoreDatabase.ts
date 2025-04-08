import { db } from '@/database/firebase';
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

interface UserData {
  name: string;
}

export const addUser = async (userId: string, userData: UserData) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      console.log('created ref')
      await setDoc(userDocRef, {
        name: userData.name,
        userId: userId,
      });
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

export const updateJournalEntryAttribute = async (
    userId: string,
    date: string,
    attribute: Partial<JournalEntry>
  ) => {
    try {
      const journalEntryDoc = doc(db, 'users', userId, 'journalEntries', date);
      const docSnap = await getDoc(journalEntryDoc);
  
      if (docSnap.exists()) {
        // Update existing document
        await updateDoc(journalEntryDoc, attribute);
        console.log(`Journal entry for ${date} updated.`);
      } else {
        // Create new document
        await setDoc(journalEntryDoc, { date, ...attribute });
        console.log(`Journal entry for ${date} created.`);
      }
    } catch (error) {
      console.error('Error updating journal entry:', error);
      throw error;
    }
  };

  export const getJournalEntryByDate = async (
    userId: string,
    date: string
  ): Promise<JournalEntry | null> => {
    try {
      const journalEntryDoc = doc(db, 'users', userId, 'journalEntries', date);
      const docSnap = await getDoc(journalEntryDoc);
  
      if (docSnap.exists()) {
        return docSnap.data() as JournalEntry;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting journal entry:', error);
      throw error;
    }
  };