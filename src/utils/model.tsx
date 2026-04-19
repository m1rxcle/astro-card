import { forwardRef, useEffect } from "react"
import { useGLTF, useTexture } from "@react-three/drei"
import { gsap } from "gsap"

const Model = forwardRef(function Model({ onReady, isInteractive, ...props }: { onReady?: () => void; props?: any; isInteractive?: any }, ref: any) {
	useGLTF(`models/credit-card.glb`)
	const frontTexture = useTexture(`textures/front-card.png`)
	const backTexture = useTexture(`textures/back-card.png`)

	useEffect(() => {
		if (onReady) onReady()
	}, [])

	const handelMove = (e: any) => {
		if (!isInteractive.current) return
		if (!ref || !("current" in ref) || !ref.current) return

		const x = (e.uv.x - 0.01) * 0.04
		const y = (e.uv.y - 0.01) * 0.04

		gsap.to(ref.current.rotation, {
			y: x,
			x: -y,
			duration: 0.4,
			ease: "power3.out",
		})
	}

	const resetTilt = () => {
		if (!isInteractive.current) return
		if (!ref || !("current" in ref) || !ref.current) return
		gsap.to(ref.current.rotation, {
			y: 0,
			x: 0,
			duration: 0.4,
			ease: "power3.out",
		})
	}

	return (
		<group rotation={[0, 0, 0.1]} ref={ref} {...props} scale={0.5} position={[0, 0, 0]}>
			<mesh
				castShadow
				receiveShadow
				position={[0, 0, 0.01]}
				onPointerMove={handelMove}
				onPointerLeave={() => {
					resetTilt()
				}}
			>
				<planeGeometry args={[4, 2.125]} /> {/* пропорции карты */}
				<meshStandardMaterial map={frontTexture} metalness={0.2} roughness={0.2} />
			</mesh>
			<mesh castShadow receiveShadow rotation={[0, Math.PI, 0]} position={[0, 0, -0.01]}>
				<planeGeometry args={[4, 2.125]} />
				<meshStandardMaterial map={backTexture} metalness={0.2} roughness={0.2} />
			</mesh>
		</group>
	)
})

useGLTF.preload(`models/credit-card.glb`)

export default Model
