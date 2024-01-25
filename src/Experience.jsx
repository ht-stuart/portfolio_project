import { CameraControls, Text, Html, ContactShadows, PresentationControls, Float, Environment, useGLTF } from '@react-three/drei'
import { Camera } from 'three'
import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber';

export default function Experience() {
    const computer = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf')


    const sphere = useRef();
    const controls = useRef();

    useFrame((state, delta) => {
        sphere.current.rotation.y += delta * 0.2
    })

    const intro = async () => {
        controls.current.dolly(-22)
        controls.current.smoothTime = 1.6
        controls.current.dolly(22, true)
        controls.current.minDistance = 2
        controls.current.maxDistance = 6
        controls.current.minPolarAngle = Math.PI / 6
        controls.current.maxPolarAngle = Math.PI - Math.PI / 6
        controls.current.minAzimuthAngle = -Math.PI / 4
        controls.current.maxAzimuthAngle = Math.PI / 4
    }

    useEffect(() => {

        intro();


    }, []);

        const ballClick = () => {
        sphere.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`)
    }

    return <>


        <Environment preset='city' />


        <color args={['#241a1a']} attach="background" />


        <PresentationControls
            global
            rotation={[.14, .1, .0]}
            polar={[-0.4, 0.2]}
            azimuth={[-1, 0.75]}
            config={{ mass: 2, tension: 400 }}
            snap={{ ass: 2, tension: 400 }}
        >


            <Float rotationIntensity={0.3}>


                <rectAreaLight
                    width={2.5}
                    height={1.65}
                    intensity={65}
                    color={"#d9d9c3"}
                    rotation={[0.1, Math.PI, 0]}
                    position={[0, .55, -1.15]}
                />

                <mesh
                    ref={sphere}
                    position={[3, -1, 0]}
                    scale={.5}
                    onClick={ballClick}
                >

                    <sphereGeometry args={[1.5, 32, 16]} />
                    <meshBasicMaterial wireframe />
                </mesh>


                <primitive
                    object={computer.scene}
                    position-y={- 1.2}
                >
                    <Html
                        transform
                        wrapperClass="htmlScreen"
                        distanceFactor={1.17}
                        position={[0, 1.56, -1.4]}
                        rotation-x={-.256}
                    >
                        <iframe src='https://lemon-wave-0a644de1e.4.azurestaticapps.net/' />
                    </Html>


                </primitive>
                <Text
                    font={"./Arimo-VariableFont_wght.ttf"}
                    fontSize={.5}
                    position={[2, .75, .75]}
                    rotation-y={-1.25}
                    children={'HAROLD\rSTUART'}
                    textAlign="center"
                >

                </Text>
            </Float>
        </PresentationControls>

        <CameraControls
            ref={controls}
        >
        </CameraControls>

        <ContactShadows position-y={-1.4}
            opacity={0.4}
            scale={5}
            blur={2.4}
        />
    </>


}