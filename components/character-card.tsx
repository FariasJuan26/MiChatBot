'use client'

import { cn } from '@/lib/utils'
import type { Transformer } from '@/lib/transformers-data'
import { Shield, Zap, Brain, Gauge, Star, Heart, Crosshair, Wrench, Car, X } from 'lucide-react'

interface CharacterCardProps {
  transformer: Transformer
  onClose: () => void
}

const statIcons = {
  strength: Shield,
  intelligence: Brain,
  speed: Gauge,
  endurance: Heart,
  rank: Star,
  courage: Zap,
  firepower: Crosshair,
  skill: Wrench
}

const statLabels = {
  strength: 'STR',
  intelligence: 'INT',
  speed: 'SPD',
  endurance: 'END',
  rank: 'RNK',
  courage: 'CRG',
  firepower: 'FPW',
  skill: 'SKL'
}

export function CharacterCard({ transformer, onClose }: CharacterCardProps) {
  const isAutobot = transformer.faction === 'autobot'
  
  const colors = isAutobot ? {
    accent: 'from-blue-500 to-cyan-400',
    glow: 'shadow-blue-500/30',
    border: 'border-blue-500/40',
    text: 'text-blue-400',
    bg: 'bg-blue-500',
    statBar: 'bg-gradient-to-r from-blue-600 to-cyan-500'
  } : {
    accent: 'from-purple-500 to-fuchsia-400',
    glow: 'shadow-purple-500/30',
    border: 'border-purple-500/40',
    text: 'text-purple-400',
    bg: 'bg-purple-500',
    statBar: 'bg-gradient-to-r from-purple-600 to-fuchsia-500'
  }

  return (
    <div className={cn(
      'h-full flex flex-col glass carbon-fiber rounded-lg border overflow-hidden',
      colors.border,
      `shadow-xl ${colors.glow}`
    )}>
      {/* Header */}
      <div className={cn(
        'relative p-4 border-b',
        colors.border
      )}>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded hover:bg-muted/50 transition-colors lg:hidden"
        >
          <X className="w-4 h-4" />
        </button>
        
        {/* Faction Badge */}
        <div className={cn(
          'inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider mb-3',
          'border',
          colors.border,
          colors.text
        )}>
          <div className={cn('w-2 h-2 rounded-full animate-pulse', colors.bg)} />
          {transformer.faction}
        </div>
        
        {/* Name and Rank */}
        <h2 className={cn(
          'text-2xl font-bold tracking-wide',
          'font-[var(--font-orbitron)]',
          colors.text
        )}>
          {transformer.name}
        </h2>
        <p className="text-sm text-muted-foreground font-mono">{transformer.rank}</p>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Avatar Placeholder */}
        <div className={cn(
          'relative w-full aspect-square max-w-[200px] mx-auto rounded-lg overflow-hidden',
          'border-2',
          colors.border,
          `shadow-lg ${colors.glow}`
        )}>
          <div className={cn(
            'absolute inset-0 bg-gradient-to-br opacity-20',
            colors.accent
          )} />
          <div className="absolute inset-0 flex items-center justify-center carbon-fiber">
            <div className={cn(
              'text-6xl font-bold opacity-50',
              'font-[var(--font-orbitron)]',
              colors.text
            )}>
              {transformer.name.charAt(0)}
            </div>
          </div>
          
          {/* Scan effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div className={cn(
              'absolute inset-x-0 h-1 bg-gradient-to-r opacity-30',
              colors.accent,
              'animate-scan'
            )} />
          </div>
        </div>

        {/* Alt Mode */}
        <div className={cn(
          'flex items-center gap-3 p-3 rounded-lg border',
          colors.border,
          'bg-background/30'
        )}>
          <Car className={cn('w-5 h-5', colors.text)} />
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Alt Mode</p>
            <p className="text-sm font-medium">{transformer.altMode}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div>
          <h3 className={cn(
            'text-xs uppercase tracking-wider mb-3 font-mono',
            colors.text
          )}>
            Combat Statistics
          </h3>
          <div className="space-y-2">
            {Object.entries(transformer.stats).map(([key, value]) => {
              const Icon = statIcons[key as keyof typeof statIcons]
              return (
                <div key={key} className="flex items-center gap-2">
                  <Icon className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs font-mono w-8 text-muted-foreground">
                    {statLabels[key as keyof typeof statLabels]}
                  </span>
                  <div className="flex-1 h-2 bg-background/50 rounded-full overflow-hidden border border-muted/30">
                    <div 
                      className={cn('h-full rounded-full transition-all duration-500', colors.statBar)}
                      style={{ width: `${value * 10}%` }}
                    />
                  </div>
                  <span className={cn('text-xs font-mono w-4', colors.text)}>{value}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Abilities */}
        <div>
          <h3 className={cn(
            'text-xs uppercase tracking-wider mb-3 font-mono',
            colors.text
          )}>
            Abilities
          </h3>
          <div className="flex flex-wrap gap-2">
            {transformer.abilities.map((ability, i) => (
              <span 
                key={i}
                className={cn(
                  'px-2 py-1 text-xs rounded border',
                  colors.border,
                  'bg-background/30'
                )}
              >
                {ability}
              </span>
            ))}
          </div>
        </div>

        {/* Quote */}
        {transformer.quote && (
          <blockquote className={cn(
            'relative p-4 rounded-lg border-l-2 italic text-sm text-muted-foreground',
            colors.border,
            'bg-background/20'
          )}>
            "{transformer.quote}"
          </blockquote>
        )}
      </div>
    </div>
  )
}
