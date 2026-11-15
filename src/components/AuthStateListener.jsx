"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { authStateChanged, toSerializableUser } from "@/reduxToolkit/authSlice";

export default function AuthStateListener({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      dispatch(
        authStateChanged(firebaseUser ? toSerializableUser(firebaseUser) : null)
      );
    });
    return unsubscribe;
  }, [dispatch]);
  return children;
}
