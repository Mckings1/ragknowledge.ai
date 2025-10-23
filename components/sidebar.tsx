"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Home,
  Upload,
  MessageSquare,
  Library,
  Settings,
  LogOut,
  Brain,
} from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/upload", label: "Uploads", icon: Upload },
    { href: "/chat", label: "Chat", icon: MessageSquare },
    { href: "/library", label: "Library", icon: Library },
  ]

  return (
    <aside className="w-72 h-screen flex flex-col bg-[#4b5563]/30 backdrop-blur-xl border-r border-[#1b1d22]/60 shadow-[inset_-1px_0_0_rgba(255,255,255,0.05)]">
      {/* ===== BRAND SECTION ===== */}
      <div className="p-6 border-b border-[#1b1d22]/60">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 -glass from-gray-500 via-gray-400 to-gray-300 rounded-xl flex items-center justify-center shadow-lg shadow-gray-900/30">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-white text-lg leading-tight">Research AI</h1>
            <p className="text-xs text-[#a1a1aa]">Intelligent Assistant</p>
          </div>
        </Link>
      </div>

      {/* ===== NAVIGATION LINKS ===== */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 rounded-xl transition-all duration-200 hover:translate-x-1",
                  isActive
                    ? "bg-[#1c1e23]/70 text-white border border-[#1b1d22]/50 shadow-sm shadow-gray-800/40"
                    : "text-[#a1a1aa] hover:text-white hover:nav-item:hover"
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">{item.label}</span>
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* ===== FOOTER ===== */}
      <div className="p-4 border-t border-[#1b1d22]/60 bg-[#0f1115]/30 backdrop-blur-md space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-[#a1a1aa] hover:text-white hover:bg-[#1b1d22]/50 rounded-lg transition-all duration-200"
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-[#a1a1aa] hover:text-white hover:bg-[#1b1d22]/50 rounded-lg transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </Button>
      </div>
    </aside>
  )
}
