import * as React from "react"
import { Canvas } from "@react-three/fiber"
import Model from "../utils/model"
import { Environment, OrbitControls } from "@react-three/drei"
import { Suspense, useEffect, useRef } from "react"
import type { Group } from "three"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Scene() {
	const cardRef = useRef<Group>(null)
	const isInteractive = useRef<boolean>(true)
	const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768)

	useEffect(() => {
		if (isMobile) return

		let ctx: gsap.Context | null = null
		let rafId = 0
		let disposed = false
		let autoSpin: gsap.core.Tween | null = null

		const initWhenReady = () => {
			if (disposed) return

			const card = cardRef.current
			const stage = document.querySelector("#card-stage")
			if (!card || !stage) {
				rafId = requestAnimationFrame(initWhenReady)
				return
			}

			ctx = gsap.context(() => {
				gsap.set(stage, { x: 0, y: 0 })
				gsap.set(card.position, { x: 0, y: 0, z: 0 })
				gsap.set(card.rotation, { x: 0, y: 0, z: 0.1 })
				gsap.set(card.scale, { x: 0.5, y: 0.5, z: 0.5 })
				gsap
					.timeline({
						scrollTrigger: {
							trigger: "#main",
							start: "top 25%",
							endTrigger: "#features",
							end: "top 55%",
							scrub: 2,
						},
					})
					.to(stage, { x: -200, y: 380, ease: "none" }, 0)
					.to(card.rotation, { x: 0, y: 0, z: Math.PI / 2, ease: "none" }, 0)
					.to(card.scale, { x: 0.35, y: 0.35, z: 0.35, ease: "none" }, 0)

				ScrollTrigger.create({
					trigger: "#features",
					start: "top 90%",
					end: "top 5%",
					pin: "#card-stage",
					pinSpacing: false,
					onEnter: () => {
						isInteractive.current = false
						if (autoSpin) return
						autoSpin = gsap.to(card.rotation, {
							y: `+=${Math.PI * 2}`,
							duration: 6,
							ease: "none",
							repeat: -1,
						})
					},
					onEnterBack: () => {
						isInteractive.current = false
						if (autoSpin) return
						autoSpin = gsap.to(card.rotation, {
							y: `+=${Math.PI / 2}`,
							duration: 6,
							ease: "none",
							repeat: -1,
						})
					},

					onLeaveBack: () => {
						isInteractive.current = true
						autoSpin?.kill()
						autoSpin = null
					},
				})
			})

			ScrollTrigger.refresh()
		}

		initWhenReady()

		return () => {
			disposed = true
			if (rafId) cancelAnimationFrame(rafId)
			autoSpin?.kill()
			ctx?.revert()
		}
	}, [])

	return (
		<div
			id="card-stage"
			className="absolute right-0 top-30 w-105 h-90 lg:right-[0px] lg:top-[-200px] lg:w-[1000px] lg:h-[800px] pointer-events-none z-30 "
		>
			<Canvas className="relative" camera={{ position: [0, 0, 3], fov: 35 }}>
				<directionalLight position={[0, -5, 25]} intensity={0.1} />
				<Environment preset="warehouse" />
				<Suspense>
					<Model
						isInteractive={isInteractive}
						ref={cardRef}
						onReady={() => {
							window.dispatchEvent(new Event("scene-ready"))
						}}
					/>
				</Suspense>
				<OrbitControls enabled={false} />
			</Canvas>
			<div className="absolute w-200 h-200 top-0 right-10 bg-[#D61F26]/5 blur-3xl rounded-full -z-10"></div>
		</div>
	)
}
