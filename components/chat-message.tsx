'use client'

import { cn } from '@/lib/utils'
import { Bot, User } from 'lucide-react'
import type { Faction } from '@/lib/transformers-data'

interface ChatMessageProps {
  content: string
  role: 'user' | 'assistant'
  faction: Faction
  isNew?: boolean
}

export function ChatMessage({ content, role, faction, isNew }: ChatMessageProps) {
  const isUser = role === 'user'
  
  const factionColors = {
    autobot: {
      accent: 'from-blue-500 to-cyan-400',
      glow: 'shadow-blue-500/30',
      border: 'border-blue-500/30',
      text: 'text-blue-400'
    },
    decepticon: {
      accent: 'from-purple-500 to-fuchsia-400',
      glow: 'shadow-purple-500/30',
      border: 'border-purple-500/30',
      text: 'text-purple-400'
    }
  }

  const colors = factionColors[faction]

  return (
    <div 
      className={cn(
        'flex gap-3 p-4',
        isNew && 'animate-message-appear',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {/* Avatar */}
      <div 
        className={cn(
          'relative flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center',
          'glass carbon-fiber',
          colors.border,
          !isUser && `shadow-lg ${colors.glow}`
        )}
      >
        {isUser ? (
          <User className="w-5 h-5 text-muted-foreground" />
        ) : (
          <Bot className={cn('w-5 h-5', colors.text)} />
        )}
        
        {/* Scan line effect for bot */}
        {!isUser && (
          <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
            <div 
              className={cn(
                'absolute inset-x-0 h-1 bg-gradient-to-r opacity-50',
                colors.accent,
                'animate-scan'
              )} 
            />
          </div>
        )}
      </div>

      {/* Message Content */}
      <div 
        className={cn(
          'relative max-w-[80%] p-4 rounded-lg',
          'glass carbon-fiber',
          isUser 
            ? 'border border-muted-foreground/20' 
            : cn('border', colors.border),
          !isUser && `shadow-lg ${colors.glow}`
        )}
      >
        {/* Corner accents */}
        <div className={cn(
          'absolute top-0 left-0 w-2 h-2 border-t border-l rounded-tl-lg',
          colors.border
        )} />
        <div className={cn(
          'absolute top-0 right-0 w-2 h-2 border-t border-r rounded-tr-lg',
          colors.border
        )} />
        <div className={cn(
          'absolute bottom-0 left-0 w-2 h-2 border-b border-l rounded-bl-lg',
          colors.border
        )} />
        <div className={cn(
          'absolute bottom-0 right-0 w-2 h-2 border-b border-r rounded-br-lg',
          colors.border
        )} />
        
        <p className="text-sm leading-relaxed font-sans whitespace-pre-wrap">
          {content}
        </p>
      </div>
    </div>
  )
}
