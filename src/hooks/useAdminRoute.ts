import { useEffect, useState } from "react";
import { locationState } from "../navigation";

export function useAdminRoute() {
  const [route, setRoute] = useState(locationState);
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    const changed = () => {
      setRoute(locationState());
      setMenu(false);
    };
    window.addEventListener("hashchange", changed);
    return () => window.removeEventListener("hashchange", changed);
  }, []);
  return { route, menu, setMenu };
}
