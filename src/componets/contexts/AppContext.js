import { createContext } from "react";

// Separado do AppProvider para o Fast Refresh do Vite: um arquivo .jsx deve exportar só componentes
export const AppContext = createContext(null);
