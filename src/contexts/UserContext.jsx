import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, firestore } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// Create a Context
const UserContext = createContext();

// UserProvider Component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                try {
                    const userDoc = doc(firestore, "responders", currentUser.uid);
                    const userSnap = await getDoc(userDoc);

                    if (userSnap.exists()) {
                        setUser({ uid: currentUser.uid, ...userSnap.data() });
                    } else {
                        console.warn("No additional user data found in Firestore.");
                        setUser({ uid: currentUser.uid });
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    setUser(null);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};

// useUser Hook
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

export default UserContext;
