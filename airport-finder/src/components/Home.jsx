import FromDestinationProvider from "../contexts/FromDestinationContext";
import Map from "./Map";
import Finder from "./FInder";

export default function Home() {
    

  return (
    <FromDestinationProvider>
      <Finder />
      <Map></Map>
    </FromDestinationProvider>
  );
}
