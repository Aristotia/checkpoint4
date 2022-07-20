import { createContext } from "react";

export const MovieContext = createContext();

export default function MovieContextProvider(props) {
  const { children } = props;
  return <MovieContext.Provider>{children}</MovieContext.Provider>;
}
