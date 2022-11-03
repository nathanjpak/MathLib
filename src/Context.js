import { createContext } from "react";

export const currentUserContext = createContext({
  currentUser: null,
  setCurrentUser: () => {}
});

export const themeContext = createContext({
  theme: null,
  setTheme: () => {}
})
