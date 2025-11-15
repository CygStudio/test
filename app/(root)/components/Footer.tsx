'use client'

import { useState, useEffect } from 'react'

export default function Footer() {
  // 使用 useState + useEffect 避免 hydration mismatch
  const [year, setYear] = useState(2025)

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return (
    <footer className="relative text-center w-full bg-[#BBFBD0] mb-6">
      <p className="">
        Copyright © {year} 熙歌慶生網頁
        <span className="hidden sm:inline"> ｜</span>
        <br className="sm:hidden" />
        by
        <a href="https://sid.tw" target="_blank" rel="noopener noreferrer">
          【叭噗叭噗】排氣管 Sid.tw
        </a>
      </p>
    </footer>
  )
}
