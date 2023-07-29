import {createContext} from 'react';

// Creating an AppContext using 'createContext' with an initial value for the context state
const AppContext = createContext({
    // Set currently logged-in user as null
    user: null,
    // Initialize setUser (function that updated user state)
    setUser: () => {},
    // Initialize logout
    logout: () => {
        
    }
});

export default AppContext;