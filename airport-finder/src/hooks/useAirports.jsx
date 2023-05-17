import { useContext } from "react";
import { AirportContext } from "../components/Layout";

const useAirports = () => {
  return useContext(AirportContext);
}

export default useAirports;