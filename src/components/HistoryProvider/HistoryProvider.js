import { createContext, useState } from 'react';
const HistoryContext = createContext();

function HistoryProvider({ children }) {
    const [previousPath, setPreviousPath] = useState(null);

    return (
        <HistoryContext.Provider value={{ previousPath, setPreviousPath }}>
            {children}
        </HistoryContext.Provider>
    );
}

export { HistoryContext };
export default HistoryProvider;
