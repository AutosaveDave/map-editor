import React from 'react';
import UserToolBar from './UserToolBar';
import MapObjects from '../MapObjects/MapObjects';
import UserModal from './UserModal';
import ToolsOverlay from './ToolsOverlay';
import { Canvas } from '@react-three/fiber';
import { useSizing } from '../../context/SizingContext';

export default function AppArea() {

    const { canvasHeight } = useSizing();

    return (
        <>
            <section style={{height:"100vh", width:"100vw", overflow:'hidden'}} >
                <UserToolBar className="bg-secondary" />
                <Canvas shadows style={{height:`${canvasHeight()}px`, width:"100%"}} >
                    <MapObjects/>
                </Canvas>
                
                <UserModal/>
            </section>

            <ToolsOverlay/>
        </>
    );
}
