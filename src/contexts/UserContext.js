import { createContext, useContext, useState, useEffect} from "react";
import { auth, firestore } from "../firebase";
import { 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut, 
} from "@firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const UserContext = createContext({});

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {

    // an object of the users data, including email, display name, and profile picture
    const [user, setUser] = useState(null);
    // state to manage loading globally, helps with not rendering pages until info is loaded
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [signInError, setSignInError] = useState(null);
    const [featuredSet, setFeaturedSet] = useState(null);

    const [userSets, setUserSets] = useState([]);

    useEffect(() => {
      if (user) {
        const userDocRef = doc(firestore, "customers", user.uid);
        getDoc(userDocRef).then((doc) => {
          setUserSets(doc.data().sets);
        })
      }
    }, [user])
    
    // set user on auth state change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    // Helper function for registering user. will intialize a bet history array, allowing them to input bets they've placed.
    const initializeUserData = (user) => {
        const userDocRef = doc(firestore, "customers", user.uid);
        setDoc(userDocRef, {
            sets: [
            ],
            email: user.email
        }, {merge: true});
    }

    const registerUser = (email, password) => {
        ///
        setLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
        .then((res) => console.log(res)).then(() => {
            initializeUserData(auth.currentUser);
        }).catch(err => alert(err.toString()))
        .finally(() => setLoading(false));
    }

    const addSet = (set) => {
        const userDocRef = doc(firestore, "customers", user.uid);
        // find current sets
        getDoc(userDocRef).then((doc) => {
            // add new set to current sets
            const newSets = doc.data().sets;
            newSets.push(set);
            console.log(newSets)
            // update sets
            setDoc(userDocRef, {
                sets: newSets,
            }, {merge: true})
        })
    }

    const signInUserEmail = (email, password) => {
        ///
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
        })
        .catch(err => {
            setSignInError(err.toString())
        })
        .finally(() => setLoading(false));
    }

    const logoutUser = () => {
        ///
        signOut(auth);
    }

    const contextValue = {
        user,
        loading, setLoading,
        error,
        addSet,
        registerUser,
        userSets,
        signInUserEmail,
        logoutUser,
        initializeUserData,
        featuredSet, setFeaturedSet
    };
    
    return (
        <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
    );
};