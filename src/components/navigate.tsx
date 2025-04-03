"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface NavLinkProps {
  href: string
  children: React.ReactNode
}

const NavLink = ({ href, children }: NavLinkProps) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        "relative px-4 py-2 text-sm font-regular transition-colors rounded-full",
        "after:absolute after:bottom-0 after:left-0 after:right-0 after:mx-auto after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-3/5",
        isActive ? "text-white" : "text-gray-500 hover:text-indigo-200",
      )}
    >
      {children}
    </Link>
  )
}

export default function CentralNavbar() {
  return (
    <div className="fixed left-1/2 top-5 z-50 -translate-x-1/2">
      <nav className="flex items-center space-x-1 rounded-full bg-white/5 px-4 py-2 backdrop-blur-md">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/about">About</NavLink>
        <NavLink href="/story">Story</NavLink>
        <NavLink href="/slang">Slang</NavLink>
      </nav>
    </div>
  )
}

