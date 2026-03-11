'use client'

import { cn } from '@/lib/utils'
import type { Faction, Transformer } from '@/lib/transformers-data'
import { transformersDatabase } from '@/lib/transformers-data'
import { Shield, Skull, ChevronLeft, ChevronRight } from 'lucide-react'

interface FactionSidebarProps {
  faction: Faction
  onFactionChange: (faction: Faction) => void
  recentCharacters: Transformer[]
  onCharacterSelect: (transformer: Transformer) => void
  isCollapsed: boolean
  onToggle: () => void
}

export function FactionSidebar({
  faction,
  onFactionChange,
  recentCharacters,
  onCharacterSelect,
  isCollapsed,
  onToggle
}: FactionSidebarProps) {
  const isAutobot = faction === 'autobot'

  return (
    <div className={cn(
      'relative h-full glass carbon-fiber border-r border-border/50 transition-all duration-300',
      isCollapsed ? 'w-16' : 'w-64'
    )}>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className={cn(
          'absolute -right-3 top-6 z-10 w-6 h-6 rounded-full',
          'glass border border-border/50 flex items-center justify-center',
          'hover:bg-muted/50 transition-colors'
        )}
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>

      <div className="p-4 h-full flex flex-col">
        {/* Logo / Title */}
        <div className={cn(
          'mb-6 pb-4 border-b border-border/30',
          isCollapsed && 'flex justify-center'
        )}>
          {isCollapsed ? (
            <div className={cn(
              'w-8 h-8 rounded hexagon flex items-center justify-center',
              isAutobot ? 'bg-blue-500/20' : 'bg-purple-500/20'
            )}>
              {isAutobot ? (
                <Shield className="w-4 h-4 text-blue-400" />
              ) : (
                <Skull className="w-4 h-4 text-purple-400" />
              )}
            </div>
          ) : (
            <>
              <h1 className={cn(
                'text-lg font-bold tracking-wider',
                'font-[var(--font-orbitron)]',
                isAutobot ? 'text-blue-400' : 'text-purple-400'
              )}>
                CYBERTRONIAN
              </h1>
              <p className="text-xs text-muted-foreground font-mono">ARCHIVES v2.0</p>
            </>
          )}
        </div>

        {/* Faction Selector */}
        <div className={cn(
          'mb-6',
          isCollapsed && 'flex flex-col items-center gap-2'
        )}>
          {!isCollapsed && (
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
              Select Faction
            </p>
          )}
          <div className={cn(
            'flex gap-2',
            isCollapsed && 'flex-col'
          )}>
            <button
              onClick={() => onFactionChange('autobot')}
              className={cn(
                'flex-1 p-3 rounded-lg border transition-all duration-300',
                'flex items-center justify-center gap-2',
                faction === 'autobot' 
                  ? 'border-blue-500/50 bg-blue-500/10 shadow-lg shadow-blue-500/20' 
                  : 'border-border/30 hover:border-blue-500/30 hover:bg-blue-500/5',
                isCollapsed && 'flex-initial p-2'
              )}
            >
              <Shield className={cn(
                'w-5 h-5',
                faction === 'autobot' ? 'text-blue-400' : 'text-muted-foreground'
              )} />
              {!isCollapsed && (
                <span className={cn(
                  'text-sm font-medium',
                  faction === 'autobot' ? 'text-blue-400' : 'text-muted-foreground'
                )}>
                  Autobots
                </span>
              )}
            </button>
            <button
              onClick={() => onFactionChange('decepticon')}
              className={cn(
                'flex-1 p-3 rounded-lg border transition-all duration-300',
                'flex items-center justify-center gap-2',
                faction === 'decepticon' 
                  ? 'border-purple-500/50 bg-purple-500/10 shadow-lg shadow-purple-500/20' 
                  : 'border-border/30 hover:border-purple-500/30 hover:bg-purple-500/5',
                isCollapsed && 'flex-initial p-2'
              )}
            >
              <Skull className={cn(
                'w-5 h-5',
                faction === 'decepticon' ? 'text-purple-400' : 'text-muted-foreground'
              )} />
              {!isCollapsed && (
                <span className={cn(
                  'text-sm font-medium',
                  faction === 'decepticon' ? 'text-purple-400' : 'text-muted-foreground'
                )}>
                  Decepticons
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Recent Characters */}
        {!isCollapsed && (
          <div className="flex-1 overflow-hidden flex flex-col">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
              Recent Characters
            </p>
            <div className="flex-1 overflow-y-auto space-y-2">
              {recentCharacters.length === 0 ? (
                <p className="text-xs text-muted-foreground/50 italic">
                  No characters viewed yet
                </p>
              ) : (
                recentCharacters.map((char) => (
                  <button
                    key={char.id}
                    onClick={() => onCharacterSelect(char)}
                    className={cn(
                      'w-full flex items-center gap-3 p-2 rounded-lg border transition-all',
                      'hover:bg-muted/30',
                      char.faction === 'autobot' 
                        ? 'border-blue-500/20 hover:border-blue-500/40' 
                        : 'border-purple-500/20 hover:border-purple-500/40'
                    )}
                  >
                    {/* Hexagonal Avatar */}
                    <div className={cn(
                      'w-8 h-8 hexagon flex items-center justify-center text-xs font-bold',
                      char.faction === 'autobot' 
                        ? 'bg-blue-500/20 text-blue-400' 
                        : 'bg-purple-500/20 text-purple-400'
                    )}>
                      {char.name.charAt(0)}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium truncate">{char.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{char.rank}</p>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        )}

        {/* All Characters Quick Access */}
        {isCollapsed && (
          <div className="flex-1 overflow-y-auto space-y-2">
            {transformersDatabase.filter(t => t.faction === faction).slice(0, 5).map((char) => (
              <button
                key={char.id}
                onClick={() => onCharacterSelect(char)}
                className={cn(
                  'w-full p-2 rounded-lg border transition-all',
                  'hover:bg-muted/30',
                  char.faction === 'autobot' 
                    ? 'border-blue-500/20 hover:border-blue-500/40' 
                    : 'border-purple-500/20 hover:border-purple-500/40'
                )}
                title={char.name}
              >
                <div className={cn(
                  'w-8 h-8 mx-auto hexagon flex items-center justify-center text-xs font-bold',
                  char.faction === 'autobot' 
                    ? 'bg-blue-500/20 text-blue-400' 
                    : 'bg-purple-500/20 text-purple-400'
                )}>
                  {char.name.charAt(0)}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
