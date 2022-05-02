import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

export interface GlobalStateInterface {
  admin: boolean;
}

const GlobalStateContext = createContext({
  isAdminState: false,
  isAdminSetState: {} as Dispatch<SetStateAction<boolean>>,
});

const GlobalStateProvider = ({
  children,
  value = false,
}: {
  children: React.ReactNode;
  value?: boolean;
}) => {
  const [isAdminState, isAdminSetState] = useState(value);
  return (
    <GlobalStateContext.Provider value={{ isAdminState, isAdminSetState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateContext");
  }
  return context;
};

export { GlobalStateProvider, useGlobalState };
