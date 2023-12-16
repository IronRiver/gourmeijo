import { User, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { auth } from "@/app/lib/firebase/client";

export function useAuth(initialUser?: User) {
  const [user, setUser] = useState(initialUser);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      }
    });

    return () => {
      unsubscribe();
    };
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (user === undefined) return;

      if (user?.uid !== authUser?.uid) {
        router.refresh();
      }
    });

    return () => {
      unsubscribe();
    };
  });

  return user;
}
