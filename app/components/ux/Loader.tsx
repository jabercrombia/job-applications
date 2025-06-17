
'use client'

import { Loader2 } from "lucide-react"

export default function Loading({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2 className="animate-spin text-gray-500" size={size} />
    </div>
  )
}
