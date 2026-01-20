"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Sidebar } from "@/components/sidebar"

export function MyPageMobileBar() {
  return (
    <div className="sticky top-0 z-40 border-b bg-white">
      <div className="flex items-center gap-2 px-4 py-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="메뉴 열기">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-80 p-0">
            <SheetTitle className="sr-only">사이드바 메뉴</SheetTitle>
            <Sidebar />
          </SheetContent>
        </Sheet>

        <div className="text-sm font-semibold"></div>
      </div>
    </div>
  )
}
