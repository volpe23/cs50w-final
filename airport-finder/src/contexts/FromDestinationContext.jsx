import React from "react";

export const FromDestinationContext = React.createContext()

export default function FromDestinationProvider({ children }) {
  const [from, setFrom] = useState(null);
  const [destination, setDestination] = useState(null);
  const [stopovers, setStopovers] = useState(null);

  return (
    <FromDestinationContext.Provider value={{from, setFrom, destination, setDestination, stopovers, setStopovers}}>
      {children}
    </FromDestinationContext.Provider>
  )
}

