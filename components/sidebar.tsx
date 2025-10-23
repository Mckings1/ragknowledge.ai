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

/**
 * Sidebar Component
 * Matches the premium dashboard UI layout — clean, glassy, minimal.
 */
export function Sidebar() {
  const pathname = usePathname()

  // Core navigation routes
  const navItems = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/upload", label: "Uploads", icon: Upload },
    { href: "/chat", label: "Chat", icon: MessageSquare },
    { href: "/library", label: "Library", icon: Library },
  ]

  return (
    <aside className="w-72 h-screen flex flex-col bg-slate-900/80 backdrop-blur-xl border-r border-slate-800/60 shadow-[inset_-1px_0_0_rgba(255,255,255,0.05)]">
      {/* ===== BRAND SECTION ===== */}
      <div className="p-6 border-b border-slate-800/60">
        <Link
          href="/"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-900/30">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-white text-lg leading-tight">
              Research AI
            </h1>
            <p className="text-xs text-slate-400">Intelligent Assistant</p>
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
                    ? "bg-slate-800/70 text-white border border-slate-700/50 shadow-sm shadow-slate-800/40"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">{item.label}</span>
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* ===== SYSTEM STATUS ===== */}
      <div className="px-4 py-3 border-t border-slate-800/60">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <p className="text-xs font-semibold text-slate-300">
              System Status
            </p>
          </div>
          <p className="text-xs text-slate-400">All systems operational</p>
          <p className="text-xs text-slate-400 mt-1">12 documents indexed</p>
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <div className="p-4 border-t border-slate-800/60 bg-slate-900/60 backdrop-blur-md space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 rounded-lg transition-all duration-200"
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 rounded-lg transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </Button>
      </div>
    </aside>
  )
}
