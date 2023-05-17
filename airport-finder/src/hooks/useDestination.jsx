import { useContext } from "react";
import { FromDestinationContext } from "../contexts/FromDestinationContext";

const useDestination = () => {
  return useContext(FromDestinationContext);
}

export default useDestination;