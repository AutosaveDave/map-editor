import { createContext, useContext, useState } from "react";

const uiContext = createContext(null);

export function UiContextProvider( { children } ) {
  
  const [showUserModal, setShowUserModal] = useState( false );

  const [mapListLoading, setMapListLoading] = useState( false );
  const [uiPage, setUiPage] = useState( "Account" );

  return (
    <uiContext.Provider
        value= {{ mapListLoading, setMapListLoading, 
                    uiPage, setUiPage, 
                    showUserModal, setShowUserModal }} 
    >
      {children}
    </uiContext.Provider>
  );
}

export function useUi() {
  return useContext(uiContext);
}