"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Home,
  Upload,
  Library,
  MessageSquare,
  Settings,
  Brain,
  PlusCircle,
  User,
} from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/upload", label: "Uploads", icon: Upload },
    { href: "/library", label: "Library", icon: Library },
    { href: "/chat", label: "Chat", icon: MessageSquare },
  ]

  return (
    <aside className="w-72 h-screen flex flex-col bg-[#4b5563]/30 backdrop-blur-xl border-r border-[#1b1d22]/60 shadow-[inset_-1px_0_0_rgba(255,255,255,0.05)]">
      {/* ===== BRAND + NEW CHAT ===== */}
      <div className="p-6 space-y-6">
        <Link href="/">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#1b1d22]/50 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="font-semibold text-white text-lg leading-tight">Research AI</h1>
              <p className="text-xs text-[#a1a1aa]">Intelligent Assistant</p>
            </div>
          </div>
        </Link>
        
      </div>

      {/* ===== NAVIGATION LINKS ===== */}
      <nav className="flex-1 overflow-y-auto px-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-xl justify-start transition-all duration-200",
                  isActive
                    ? "bg-[#1c1e23]/70 text-white border border-[#1b1d22]/50 shadow-sm shadow-gray-800/40"
                    : "text-[#a1a1aa] hover:text-white hover:bg-[#2a2d33]"
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">{item.label}</span>
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* ===== CHAT SESSIONS + RESEARCHER USER ===== */}
      <div className="p-6 space-y-4 mt-auto">
        {/* Placeholder for chat sessions can be added here */}

        {/* Researcher User card */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#1b1d22]/50">
          <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-gray-300" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">Researcher User</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white hover:bg-white/10 rounded-lg"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </aside>
  )
}
