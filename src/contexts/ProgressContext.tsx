"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { doc, setDoc, arrayUnion, onSnapshot, arrayRemove } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

interface ProgressContextType {
  completedDays: number[];
  markDayAsComplete: (day: number) => Promise<void>;
  unmarkDayAsComplete: (day: number) => Promise<void>;
  lastCompletedDay: number;
  loading: boolean; // True only on initial load without local data
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const getLocalProgress = (uid: string | undefined): number[] => {
  if (typeof window === 'undefined' || !uid) return [];
  try {
    const item = window.localStorage.getItem(`progress-${uid}`);
    return item ? JSON.parse(item) : [];
  } catch (error) {
    console.error("Failed to parse local progress", error);
    return [];
  }
};

const setLocalProgress = (uid: string, days: number[]) => {
   if (typeof window === 'undefined') return;
   try {
    window.localStorage.setItem(`progress-${uid}`, JSON.stringify(days));
  } catch (error) {
    console.error("Failed to save local progress", error);
  }
};

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [completedDays, setCompletedDays] = useState<number[]>(() => getLocalProgress(user?.uid));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set initial state from localStorage and then check Firestore.
    const localProgress = getLocalProgress(user?.uid);
    setCompletedDays(localProgress);
    
    if (user) {
      // If there's no local data, we are truly "loading"
      setLoading(localProgress.length === 0);

      const userProgressRef = doc(db, 'progress', user.uid);
      
      const unsubscribe = onSnapshot(userProgressRef, (docSnap) => {
        let firestoreDays: number[] = [];
        if (docSnap.exists()) {
          firestoreDays = docSnap.data().completed || [];
        }
        
        // Merge local and firestore data, giving precedence to firestore but keeping local changes
        const mergedDays = Array.from(new Set([...localProgress, ...firestoreDays]));

        setCompletedDays(mergedDays);
        setLocalProgress(user.uid, mergedDays);
        setLoading(false);

      }, (error) => {
        console.error("Error fetching progress from Firestore:", error);
        setLoading(false); // Stop loading even if there's an error
      });

      return () => unsubscribe();
    } else {
      setCompletedDays([]);
      setLoading(false);
    }
  }, [user]);

  const markDayAsComplete = useCallback(async (day: number) => {
    if (!user) throw new Error("User not authenticated");
    
    // Optimistic UI update
    const newCompletedDays = Array.from(new Set([...completedDays, day]));
    setCompletedDays(newCompletedDays);
    setLocalProgress(user.uid, newCompletedDays);

    // Sync with Firestore
    const userProgressRef = doc(db, 'progress', user.uid);
    try {
        await setDoc(userProgressRef, {
            completed: arrayUnion(day)
        }, { merge: true });
    } catch (error) {
        console.error("Failed to sync progress with Firestore:", error);
        // We can add retry logic here in a real-world app
        throw error;
    }
  }, [user, completedDays]);
  
  const unmarkDayAsComplete = useCallback(async (day: number) => {
    if (!user) throw new Error("User not authenticated");
    
    // Optimistic UI update
    const newCompletedDays = completedDays.filter(d => d !== day);
    setCompletedDays(newCompletedDays);
    setLocalProgress(user.uid, newCompletedDays);

    // Sync with Firestore
    const userProgressRef = doc(db, 'progress', user.uid);
    try {
        await setDoc(userProgressRef, {
            completed: arrayRemove(day)
        }, { merge: true });
    } catch (error) {
        console.error("Failed to sync unmark progress with Firestore:", error);
        throw error;
    }
  }, [user, completedDays]);

  const lastCompletedDay = completedDays.length > 0 ? Math.max(0, ...completedDays) : 0;

  const value = { completedDays, markDayAsComplete, unmarkDayAsComplete, lastCompletedDay, loading };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
