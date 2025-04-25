import { Dispatch, SetStateAction, createContext, useState, ReactNode } from "react";

// Define the type for the context
type AppContextType = {
    flightResults: any[];
    setFlightResults: Dispatch<SetStateAction<any[]>>;
    filteredResults: any[];
    setFilteredResults: Dispatch<SetStateAction<any[]>>;
    error: string;
    setError: Dispatch<SetStateAction<string>>;
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}

// Create default values
const defaultContextValue: AppContextType = {
    flightResults: [],
    setFlightResults: () => {},
    filteredResults: [],
    setFilteredResults: () => {},
    error: "",
    setError: () => {},
    isLoading: false,
    setIsLoading: () => {},
};

// Create the context with default values
export const AppContext = createContext<AppContextType>(defaultContextValue);

type AppProviderProps = {
    children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
    const [flightResults, setFlightResults] = useState<any[]>([]);
    const [filteredResults, setFilteredResults] = useState<any[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    return (
        <AppContext.Provider
            value={{
                flightResults,
                setFlightResults,
                filteredResults,
                setFilteredResults,
                error,
                setError,
                isLoading,
                setIsLoading,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
