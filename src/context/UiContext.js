import { createContext, useContext, useState, useEffect } from "react";

const uiContext = createContext(null);

export function UiContextProvider( { children } ) {
  
  const [showUserModal, setShowUserModal] = useState( false );

  const [mapListLoading, setMapListLoading] = useState( false );
  const [uiPage, setUiPage] = useState( "Account" );

  const [uiFlip, setUiFlip] = useState(0);

  const isMapListLoading = () => mapListLoading;

  function triggerUi() {   // Triggers re-renders for changes to savedMaps
      const flip = ( uiFlip + 1 ) % 2;
      setUiFlip(flip);
    }
  

  return (
    <uiContext.Provider
        value= {{ mapListLoading, setMapListLoading, 
                    uiPage, setUiPage, 
                    showUserModal, setShowUserModal,
                    isMapListLoading, triggerUi }} 
    >
      {children}
    </uiContext.Provider>
  );
}

export function useUi() {
  return useContext(uiContext);
}