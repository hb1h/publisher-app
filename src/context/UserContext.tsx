import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { auth, db } from '@/config/firebase'; // Firebase imports
import { doc, getDoc } from 'firebase/firestore';

// Define the structure of additional user data fetched from Firestore
interface UserDetails {
  fullName: string;
  email: string;
  role: string;
  approved: boolean;
  createdAt: any;
}

interface UserContextProps {
  user: User | null; // Firebase user object
  userDetails: UserDetails | null; // Firestore user data
  isLoading: boolean; // Loading state
}

// Create a context for the user data
const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null); // Firebase user
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null); // Firestore user details
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state

  // Function to fetch additional user details from Firestore
  const getUserDetails = async (uid: string): Promise<UserDetails | null> => {
    console.log('Fetching user details for UID:', uid);
    try {
      const userDocRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        console.log('User details fetched successfully:', userDoc.data());
        return userDoc.data() as UserDetails;
      } else {
        console.warn('No user document found for UID:', uid);
        return null;
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      return null;
    }
  };

  // Function to handle session timeout
  const handleSessionTimeout = async (firebaseUser: User) => {
    console.log('Handling session timeout for user:', firebaseUser.uid);
    try {
      const idTokenResult = await firebaseUser.getIdTokenResult(); // Get token details
      console.log('ID Token Result:', idTokenResult);

      const expirationTime = idTokenResult.expirationTime; // Expiration time
      console.log('Token expiration time:', expirationTime);

      const expiresInMs = new Date(expirationTime).getTime() - Date.now();
      console.log(`Session expires in ${expiresInMs / 1000} seconds (${expiresInMs} ms)`);

      // Auto sign-out when the session expires
      setTimeout(async () => {
        console.warn('Session expired. Logging user out...');
        await signOut(auth);
        console.log('User has been logged out successfully.');
      }, expiresInMs);
    } catch (error) {
      console.error('Error handling session timeout:', error);
      console.warn('Forcing user sign-out due to an issue.');
      await signOut(auth);
    }
  };

  useEffect(() => {
    console.log('Initializing onAuthStateChanged listener...');
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        console.log('User detected:', firebaseUser.uid);
        setUser(firebaseUser);

        // Fetch user details from Firestore
        console.log('Fetching additional user details...');
        const details = await getUserDetails(firebaseUser.uid);
        setUserDetails(details);

        // Handle session timeout logic
        handleSessionTimeout(firebaseUser);
      } else {
        console.warn('No user is currently logged in.');
        setUser(null);
        setUserDetails(null);
      }
      setIsLoading(false);
      console.log('User state loading completed.');
    });

    return () => {
      console.log('Cleaning up onAuthStateChanged listener...');
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, userDetails, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use user context
export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
