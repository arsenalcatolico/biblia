"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { doc, getDoc, setDoc, arrayUnion, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

interface ProgressContextType {
  completedDays: number[];
  markDayAsComplete: (day: number) => Promise<void>;
  lastCompletedDay: number;
  loading: boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(true);
      const userProgressRef = doc(db, 'progress', user.uid);
      
      const unsubscribe = onSnapshot(userProgressRef, (docSnap) => {
        if (docSnap.exists()) {
          setCompletedDays(docSnap.data().completed || []);
        } else {
          setCompletedDays([]);
        }
        setLoading(false);
      }, (error) => {
        console.error("Error fetching progress:", error);
        setLoading(false);
      });

      return () => unsubscribe();
    } else if (!user) {
      setCompletedDays([]);
      setLoading(false);
    }
  }, [user]);

  const markDayAsComplete = useCallback(async (day: number) => {
    if (!user) throw new Error("User not authenticated");
    if (completedDays.includes(day)) return;
    
    const userProgressRef = doc(db, 'progress', user.uid);
    await setDoc(userProgressRef, {
      completed: arrayUnion(day)
    }, { merge: true });
  }, [user, completedDays]);

  const lastCompletedDay = completedDays.length > 0 ? Math.max(0, ...completedDays) : 0;

  const value = { completedDays, markDayAsComplete, lastCompletedDay, loading };

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
