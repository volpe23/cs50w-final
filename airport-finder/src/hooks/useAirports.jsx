import { useContext } from "react";
import { AirportContext } from "../components/AirportContext";

const useAirports = () => {
  return useContext(AirportContext);
}

export default useAirports;