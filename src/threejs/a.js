import ReactDOM from 'react-dom'
import React, { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

import { PerspectiveCamera } from '@react-three/drei'

import Model1 from './models/Model1'
import Model2 from './models/Model2'



const Scene = () => {
    return (
        <Canvas>
            <ambientLight intensity={0.7} />
            <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
       

            <PerspectiveCamera makeDefault position={[3.200, 4.984, 2.3]} rotation={[0, 0, 0]}></PerspectiveCamera>

            <Suspense fallback={null}>
              <Model2/> 
            </Suspense>
        </Canvas>
    )
}

export default Scene