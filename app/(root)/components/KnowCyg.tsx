'use client'

import { useRef, useState } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'

export default function ChipAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const chipRef = useRef<HTMLDivElement>(null)
  const textBgRef = useRef<SVGRectElement>(null)

  // Use state for values instead of useTransform
  const [h1Opacity, setH1Opacity] = useState(1)
  const [h1MarginTop, setH1MarginTop] = useState(0)
  const [svgOpacity, setSvgOpacity] = useState(0)
  const [textBgOpacity, setTextBgOpacity] = useState(1)
  const [chipOpacity, setChipOpacity] = useState(1)
  const [chipSize, setChipSize] = useState(() => {
    // 避免 SSR/CSR 不一致,使用安全的初始值
    if (typeof window !== 'undefined') {
      return 500 + window.innerWidth * 20 * 0
    }
    return 500
  })
  const [isTransparent, setIsTransparent] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Use useMotionValueEvent instead of onChange
  useMotionValueEvent(scrollYProgress, 'change', value => {
    // Calculate values based on scroll progress
    if (value <= 0.1) {
      setH1Opacity((0.1 - value) / 0.1)
      setH1MarginTop(value * 1000 * -1)
    } else {
      setH1Opacity(0)
    }

    if (value <= 0.2) {
      setSvgOpacity((value - 0.1) / 0.1)
    } else {
      setSvgOpacity(1)
    }

    if (value >= 0.23) {
      setTextBgOpacity((0.23 - value) / 0.5)
      setIsTransparent(true)
    } else {
      setTextBgOpacity(1)
      setIsTransparent(false)
    }

    if (value >= 0.32) {
      setChipOpacity((0.32 - value) / 0.05)
    } else {
      setChipOpacity(1)
    }

    // Calculate chip size with cubic easing
    const cubicValue = value * value * value
    setChipSize(500 + window.innerWidth * 20 * cubicValue)
  })

  return (
    <section ref={sectionRef} className="bg-black h-[250vh] m-0">
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <div className="iframe-container absolute top-1/2 -translate-y-1/2 left-0 right-0">
          <iframe
            width="1920"
            height="960"
            src="https://www.youtube.com/embed/l3Gkmro5piU?autoplay=1&mute=1&loop=1&playlist=l3Gkmro5piU"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        <h1
          style={{
            opacity: h1Opacity,
            marginTop: `${h1MarginTop}px`,
          }}
          className="absolute top-0 left-0 text-white z-20 font-sans text-6xl md:text-8xl font-semibold tracking-tight text-center w-full top-1/2 -translate-y-1/2 m-0">
          帶你見識
          <br />
          熙歌的魅力
        </h1>

        <div
          ref={chipRef}
          style={{
            width: `${chipSize}px`,
            height: `${chipSize}px`,
            opacity: chipOpacity,
            backgroundColor: isTransparent ? 'transparent' : 'black',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 min-w-[500px] min-h-[500px] shadow-[0px_0px_0px_100vw_black,0px_0px_0px_30px_black_inset]">
          <svg
            style={{ opacity: svgOpacity }}
            className="absolute w-full h-full"
            data-name="圖層 9"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1107.18 1090.52">
            <rect
              ref={textBgRef}
              style={{ opacity: textBgOpacity }}
              className="fill-white"
              x="85.61"
              y="334.79"
              width="919.31"
              height="422.03"
            />
            <g className="fill-black">
              <path d="m187.71,534.71c-72.49,27.75-90.1,56.71-8.26,28.78,6.38-6.77,10.08-14.97,10.13-23.03,5.56,5.87,13.89,9.33,23.2,9.89,79.29-35.56,47.4-45.15-25.07-15.64Z" />
              <path d="m597.49,530.45c-25.06-1.65-28.49,47.34-.05,46.68,8.01,0,14.39-4.5,16.43-10.65,1.54-4.39.67-14.79.89-19.48.05-9.37-6.85-16.59-17.27-16.55Z" />
              <path d="m206.59,581.47c-14.52-14.51-30.77-10.01-48.26-3.16,28.69,35.11,83.68,13.36,80.63-31.85-17.18,6.64-31.83,15.2-32.37,35.01Z" />
              <path d="m976.75,34.52H114.15c-44.08,0-80.15,36.07-80.15,80.15v862.61c0,44.08,36.07,80.15,80.15,80.15h862.61c44.08,0,80.15-36.07,80.15-80.15V114.67c0-44.08-36.07-80.15-80.15-80.15ZM252.82,539.61c7.21,59.43-73.98,91.47-109.31,43.18-70.36,20.77-77.88,2.57-12.29-30.43-8.17-60.3,74.56-92.95,109.79-43.37,70.46-20.74,77.36-2.29,11.81,30.62Zm147.43,59.49c-123.09-5.14-75.78-152.85,36.7-115.31l-6.32,20.89c-90.8-30.83-94.88,97.4.05,68.66l4.62,20.72c-5.55,2.34-18.54,5.04-35.05,5.04Zm117.95-30.82c-20.75,46.54-29.94,60.95-64.87,67.24l-6.63-22.24c9.79-1.74,24.61-8.16,27.96-18.87,0-.99-.27-2.26-1.37-4.36l-36.48-77.63h34.27c3.97,11.32,16.94,46.58,19.84,57.47h.65c2.88-10.71,13.35-46.21,16.69-57.47h33.03l-23.08,55.85Zm127.51-30.56c-1.9,23.63,7.53,70.38-15.14,85.38-19.51,14.11-55.62,12.67-76.16,3.92l6.15-20c18.93,9.37,58.9,12.58,54.67-21.44h-.41c-22.94,24.83-71.74,5.02-68.97-30.36-2.79-38.56,50.59-59.77,72.39-32.65h.41l1.04-10.15h26.88c-.47,5.48-.85,12.65-.85,25.29Zm118.92,59.57h-31v-47.03c0-10.93-4.58-18.42-15.75-18.42-11.28.54-16.72,7.43-16.78,16.49,0,0,0,48.96,0,48.96h-31c-.13-18.18.49-68.24-.81-84.86h26.85l1.43,11.76h.65c4.02-5.47,14.15-13.67,30.77-13.67,46.62-1.93,34.2,56.03,35.64,86.77Zm92.43,0l-1.42-11.98h-.65c-3.89,5.24-13.17,13.88-31.03,13.88-45.96,2.48-33.47-56.33-34.98-86.77h31v45.6c0,12.42,4.68,19.85,15.59,19.85,10.87-.61,16.12-6.61,16.52-14.88,0,0,0-50.57,0-50.57h31c.14,17.83-.5,68.89.81,84.86h-26.85Zm77.37,1.82c-12.98,0-24.65-2.5-32.24-5.97l5.61-18.84c6.75,3.9,38.3,12.55,39.88-.7,0-4.39-3.17-6.52-14.61-9.81-46.97-11.9-31.02-53.99,12.11-53.27,11.65,0,21.96,2.33,28.04,4.95l-5.39,18.17c-5.32-2.92-32.41-10.12-33.46,2.05,0,4.06,3.95,6.21,16.15,9.8,44.34,11.74,31.31,55.65-16.09,53.63Z" />
            </g>
            <path
              d="m975.23,0c63.04,0,114.26,50.59,115.27,113.38l.02,1.91v859.94c0,63.04-50.59,114.26-113.38,115.27l-1.91.02H115.29c-63.04,0-114.26-50.59-115.27-113.38l-.02-1.91V115.29C0,52.25,50.59,1.03,113.38.02l1.91-.02h859.94Zm-1.4,33.81H114.51c-44.12,0-79.98,35.41-80.69,79.37v1.33s-.01,859.33-.01,859.33c0,44.12,35.41,79.98,79.37,80.69h1.33s859.33.01,859.33.01c44.12,0,79.98-35.41,80.69-79.37v-1.33s.01-859.33.01-859.33c0-44.12-35.41-79.98-79.37-80.69h-1.33Z"
              className="fill-white"></path>
          </svg>
        </div>
      </div>
    </section>
  )
}
