"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, Upload, MessageSquare, Library, Settings, LogOut, Brain } from "lucide-react"

/**
 * Sidebar Navigation Component
 * Persistent left sidebar with navigation links, status indicator, and user menu
 * Uses glass morphism design with dark theme
 */
export function Sidebar() {
  const pathname = usePathname()

  // Navigation items with icons and routes
  const navItems = [
    { href: "/", label: "Home", icon: Home }, // Changed from "Dashboard" to "Home"
    { href: "/upload", label: "Upload", icon: Upload },
    { href: "/chat", label: "Chat", icon: MessageSquare },
    { href: "/chat-history", label: "Chat History", icon: Library },
  ]

  return (
    <aside className="w-72 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-r border-slate-700/50 flex flex-col backdrop-blur-sm">
      {/* ===== LOGO SECTION ===== */}
      {/* Brand logo and app name */}
      <div className="p-6 border-b border-slate-700/50">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          {/* Logo icon with gradient background */}
          <div className="w-10 h-10 bg-slate-600 rounded-xl flex items-center justify-center shadow-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          {/* App name and tagline */}
          <div>
            <h1 className="font-bold text-white text-lg">Research AI</h1>
            <p className="text-xs text-slate-400">Intelligent Assistant</p>
          </div>
        </Link>
      </div>

      {/* ===== NAVIGATION MENU ===== */}
      {/* Main navigation links with active state highlighting */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  // Base styles for all nav items
                  "w-full justify-start gap-3 rounded-lg transition-all duration-200",
                  // Active state: highlighted background and blue text
                  isActive
                    ? "bg-slate-700/60 text-slate-100 border border-slate-600/50"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40",
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
      {/* Status indicator showing system health and document count */}
      <div className="p-4 border-t border-slate-700/50">
        <div className="bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-xs font-semibold text-slate-300">System Status</p>
          </div>
          <p className="text-xs text-slate-400">All systems operational</p>
          <p className="text-xs text-slate-400 mt-1">12 documents indexed</p>
        </div>
      </div>

      {/* ===== FOOTER MENU ===== */}
      {/* Settings and sign out buttons */}
      <div className="p-4 border-t border-slate-700/50 space-y-2">
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
