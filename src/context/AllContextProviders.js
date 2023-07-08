import { UserAuthContextProvider } from "./UserAuthContext";
import { UserDataContextProvider } from "./UserDataContext";
import { UiContextProvider } from "./UiContext";
import { ColorToolContextProvider } from "./ColorToolContext";
import { MapCameraContextProvider } from "./MapCameraContext";
import { MapInfoContextProvider } from "./MapInfoContext"
import { MapPanelsContextProvider } from "./MapPanelsContext";
import { MapConfigContextProvider } from "./MapConfigContext";
import { MapEditorContextProvider } from "./MapEditorContext";
import { SizingContextProvider } from "./SizingContext";

export default function AllContextProviders( { children } ) {
    return (
        <SizingContextProvider>
            <UserAuthContextProvider>
                <UiContextProvider>
                    <ColorToolContextProvider>
                        <MapInfoContextProvider>
                            <MapPanelsContextProvider>
                                <MapCameraContextProvider>
                                    <MapConfigContextProvider>
                                        <MapEditorContextProvider>
                                            <UserDataContextProvider>
                                                {children}
                                            </UserDataContextProvider>
                                        </MapEditorContextProvider>
                                    </MapConfigContextProvider>
                                </MapCameraContextProvider>
                            </MapPanelsContextProvider>
                        </MapInfoContextProvider>
                    </ColorToolContextProvider>
                </UiContextProvider>
            </UserAuthContextProvider>
        </SizingContextProvider>
    );
}