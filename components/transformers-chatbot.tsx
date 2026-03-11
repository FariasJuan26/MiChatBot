'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { FactionSidebar } from './faction-sidebar'
import { ChatMessage } from './chat-message'
import { CharacterCard } from './character-card'
import { 
  type Faction, 
  type Transformer, 
  findTransformer, 
  transformersDatabase 
} from '@/lib/transformers-data'
import { Zap, Menu, X, Bot } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  isNew?: boolean
}

function generateResponse(input: string, faction: Faction): { response: string; character?: Transformer } {
  const lowerInput = input.toLowerCase()
  
  // Find if any character is mentioned
  const mentionedCharacter = findTransformer(input)
  
  if (mentionedCharacter) {
    return {
      response: `📊 ACCESSING DATABANK: ${mentionedCharacter.name.toUpperCase()}

${mentionedCharacter.description}

🔧 ALT MODE: ${mentionedCharacter.altMode}

⚔️ ABILITIES: ${mentionedCharacter.abilities.join(', ')}

${mentionedCharacter.quote ? `💬 "${mentionedCharacter.quote}"` : ''}

[Technical data has been loaded in the side panel for detailed analysis.]`,
      character: mentionedCharacter
    }
  }

  // General questions
  if (lowerInput.includes('autobot') && lowerInput.includes('decepticon')) {
    return {
      response: `⚔️ FACTION ANALYSIS

The Autobots and Decepticons are two opposing factions from the planet Cybertron:

🔵 AUTOBOTS - Led by Optimus Prime
• Believe in freedom and protecting all life
• Generally transform into civilian vehicles
• Fight to defend Earth and Cybertron
• Motto: "Freedom is the right of all sentient beings"

🟣 DECEPTICONS - Led by Megatron  
• Seek conquest and dominion over all
• Often transform into military vehicles
• Will use any means to achieve power
• Motto: "Peace through tyranny"

The war between them has lasted millions of years, spanning across galaxies.`
    }
  }

  if (lowerInput.includes('cybertron')) {
    return {
      response: `🌍 PLANET CYBERTRON - DATAFILE

Cybertron is the homeworld of all Transformers, a massive metallic planet in a distant solar system.

KEY DATA:
• Population: Formerly billions of Cybertronians
• Status: Varies by continuity (often war-torn or dying)
• Notable Locations: Iacon (Autobot stronghold), Kaon (Decepticon territory), The Pits (gladiatorial arenas)
• Core: Primus, the creator god of the Transformers

The Great War between Autobots and Decepticons devastated Cybertron, forcing many to flee to other worlds, including Earth.`
    }
  }

  if (lowerInput.includes('energon')) {
    return {
      response: `⚡ ENERGON - SUBSTANCE ANALYSIS

Energon is the lifeblood of all Transformers - both their fuel source and the basic building block of Cybertronian life.

TYPES:
• Standard Energon - Common fuel source (blue/pink glow)
• Dark Energon - Corrupted variant, associated with Unicron (purple glow)
• Synthetic Energon - Artificially created, unstable
• Red Energon - Grants temporary super-speed

Energon can be found in crystal form on various planets and is the primary resource both factions fight over.`
    }
  }

  if (lowerInput.includes('matrix') || lowerInput.includes('leadership')) {
    return {
      response: `💎 MATRIX OF LEADERSHIP

The Matrix of Leadership is an ancient artifact of immense power, passed down through generations of Autobot leaders.

PROPERTIES:
• Contains the collective wisdom of past Primes
• Can light the darkest hour
• Capable of defeating Unicron
• Only opens for a true Prime

BEARERS:
• Prima (First holder)
• Sentinel Prime
• Optimus Prime (Current)

"'Til All Are One" - The phrase that unlocks its power.`
    }
  }

  if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hola')) {
    const greeting = faction === 'autobot' 
      ? `🔵 Greetings, friend. I am the Cybertronian Archives AI, aligned with the Autobot cause.

I can provide information about any Transformer - their history, abilities, alt modes, and combat statistics.

Try asking about:
• Specific characters (e.g., "Tell me about Optimus Prime")
• Factions ("Compare Autobots and Decepticons")
• Cybertron history
• Energon and artifacts

How may I assist you today?`
      : `🟣 Salutations. I am the Cybertronian Archives AI, currently operating under Decepticon protocols.

I possess extensive data on all Transformers - their weaknesses, capabilities, and tactical value.

Query options:
• Character analysis (e.g., "What can you tell me about Megatron?")
• Faction intelligence
• Cybertronian technology
• Strategic resources like Energon

State your inquiry.`
    
    return { response: greeting }
  }

  if (lowerInput.includes('who are you') || lowerInput.includes('what are you')) {
    return {
      response: `🤖 SYSTEM IDENTIFICATION

I am the Cybertronian Archives AI - a comprehensive database containing information about the Transformers universe.

MY CAPABILITIES:
• Character profiles and statistics
• Faction histories and conflicts  
• Cybertron geography and culture
• Artifact and technology data
• Combat analysis

I can access data on any known Transformer. Simply mention their name and I will retrieve their complete file.

Current Mode: ${faction === 'autobot' ? '🔵 Autobot' : '🟣 Decepticon'} Interface`
    }
  }

  // List characters
  if (lowerInput.includes('list') || lowerInput.includes('characters') || lowerInput.includes('all transformers')) {
    const autobots = transformersDatabase.filter(t => t.faction === 'autobot')
    const decepticons = transformersDatabase.filter(t => t.faction === 'decepticon')
    
    return {
      response: `📋 TRANSFORMER DATABASE

🔵 AUTOBOTS:
${autobots.map(a => `• ${a.name} - ${a.rank}`).join('\n')}

🟣 DECEPTICONS:
${decepticons.map(d => `• ${d.name} - ${d.rank}`).join('\n')}

Request details on any character by mentioning their name.`
    }
  }

  // Default response
  return {
    response: `🔍 QUERY PROCESSING...

I couldn't find specific data matching your query. Here are some suggestions:

• Ask about a specific Transformer (Optimus Prime, Megatron, Bumblebee, etc.)
• Learn about the factions (Autobots vs Decepticons)
• Explore Cybertron, Energon, or the Matrix of Leadership
• Type "list characters" to see all available profiles

What would you like to know about the Transformers universe?`
  }
}

export function TransformersChatbot() {
  const [faction, setFaction] = useState<Faction>('autobot')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `🔵 CYBERTRONIAN ARCHIVES ONLINE

Welcome to the Transformers Database. I am your guide to the universe of Autobots and Decepticons.

Ask me about any Transformer - their history, abilities, alternate modes, or combat statistics.

Try: "Tell me about Optimus Prime" or "Who are the Decepticons?"

Use the faction selector to switch between Autobot and Decepticon interfaces.`
    }
  ])
  const [input, setInput] = useState('')
  const [selectedCharacter, setSelectedCharacter] = useState<Transformer | null>(null)
  const [recentCharacters, setRecentCharacters] = useState<Transformer[]>([])
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isTyping) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      isNew: true
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const { response, character } = generateResponse(input, faction)
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        isNew: true
      }

      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)

      if (character) {
        setSelectedCharacter(character)
        setRecentCharacters(prev => {
          const filtered = prev.filter(c => c.id !== character.id)
          return [character, ...filtered].slice(0, 5)
        })
      }

      // Clear isNew flag after animation
      setTimeout(() => {
        setMessages(prev => prev.map(m => ({ ...m, isNew: false })))
      }, 500)
    }, 800 + Math.random() * 400)
  }

  const handleCharacterSelect = (transformer: Transformer) => {
    setSelectedCharacter(transformer)
    setMobileMenuOpen(false)
    
    // Add to recent if not already there
    setRecentCharacters(prev => {
      const filtered = prev.filter(c => c.id !== transformer.id)
      return [transformer, ...filtered].slice(0, 5)
    })
  }

  const handleFactionChange = (newFaction: Faction) => {
    setFaction(newFaction)
    
    // Add faction change message
    const message: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: newFaction === 'autobot'
        ? `🔵 AUTOBOT INTERFACE ACTIVATED

Systems recalibrated. The Autobot Archives are now at your disposal.

"Freedom is the right of all sentient beings." - Optimus Prime`
        : `🟣 DECEPTICON INTERFACE ACTIVATED

Systems recalibrated. The Decepticon Archives are now at your disposal.

"Peace through tyranny!" - Megatron`,
      isNew: true
    }
    
    setMessages(prev => [...prev, message])
    
    setTimeout(() => {
      setMessages(prev => prev.map(m => ({ ...m, isNew: false })))
    }, 500)
  }

  const colors = faction === 'autobot' ? {
    accent: 'from-blue-500 to-cyan-400',
    glow: 'shadow-blue-500/30',
    border: 'border-blue-500/40',
    text: 'text-blue-400',
    bg: 'bg-blue-500'
  } : {
    accent: 'from-purple-500 to-fuchsia-400',
    glow: 'shadow-purple-500/30',
    border: 'border-purple-500/40',
    text: 'text-purple-400',
    bg: 'bg-purple-500'
  }

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg glass border border-border/50"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-64">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 z-10 p-1 rounded hover:bg-muted/50"
            >
              <X className="w-5 h-5" />
            </button>
            <FactionSidebar
              faction={faction}
              onFactionChange={handleFactionChange}
              recentCharacters={recentCharacters}
              onCharacterSelect={handleCharacterSelect}
              isCollapsed={false}
              onToggle={() => {}}
            />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <FactionSidebar
          faction={faction}
          onFactionChange={handleFactionChange}
          recentCharacters={recentCharacters}
          onCharacterSelect={handleCharacterSelect}
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className={cn(
          'flex items-center justify-between px-4 py-3 border-b',
          'glass carbon-fiber',
          colors.border
        )}>
          <div className="flex items-center gap-3 ml-12 lg:ml-0">
            <div className={cn(
              'w-10 h-10 rounded-lg flex items-center justify-center',
              'border',
              colors.border,
              `shadow-lg ${colors.glow}`
            )}>
              <Bot className={cn('w-5 h-5', colors.text)} />
            </div>
            <div>
              <h2 className={cn(
                'text-sm font-bold tracking-wider',
                'font-[var(--font-orbitron)]',
                colors.text
              )}>
                ARCHIVES AI
              </h2>
              <p className="text-xs text-muted-foreground font-mono">
                {faction === 'autobot' ? 'Autobot' : 'Decepticon'} Mode
              </p>
            </div>
          </div>
          
          <div className={cn(
            'flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono',
            'border',
            colors.border
          )}>
            <div className={cn('w-2 h-2 rounded-full animate-pulse', colors.bg)} />
            ONLINE
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              content={message.content}
              role={message.role}
              faction={faction}
              isNew={message.isNew}
            />
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 p-4">
              <div className={cn(
                'flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center',
                'glass carbon-fiber border',
                colors.border
              )}>
                <Bot className={cn('w-5 h-5', colors.text)} />
              </div>
              <div className={cn(
                'p-4 rounded-lg glass carbon-fiber border',
                colors.border
              )}>
                <div className="flex gap-1">
                  <span className={cn('w-2 h-2 rounded-full animate-bounce', colors.bg)} style={{ animationDelay: '0ms' }} />
                  <span className={cn('w-2 h-2 rounded-full animate-bounce', colors.bg)} style={{ animationDelay: '150ms' }} />
                  <span className={cn('w-2 h-2 rounded-full animate-bounce', colors.bg)} style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form 
          onSubmit={handleSubmit}
          className={cn(
            'p-4 border-t glass carbon-fiber',
            colors.border
          )}
        >
          <div className={cn(
            'flex gap-3 p-2 rounded-lg border',
            colors.border,
            'bg-background/30'
          )}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about any Transformer..."
              disabled={isTyping}
              className={cn(
                'flex-1 bg-transparent px-3 py-2 text-sm',
                'placeholder:text-muted-foreground/50',
                'focus:outline-none',
                'font-sans'
              )}
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className={cn(
                'px-4 py-2 rounded-lg font-bold text-sm tracking-wider transition-all duration-300',
                'font-[var(--font-orbitron)]',
                'flex items-center gap-2',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'bg-gradient-to-r hover:shadow-lg',
                colors.accent,
                `hover:${colors.glow}`,
                'text-white'
              )}
            >
              <Zap className="w-4 h-4" />
              <span className="hidden sm:inline">TRANSFORM</span>
            </button>
          </div>
        </form>
      </div>

      {/* Character Panel - Desktop */}
      <div className={cn(
        'hidden lg:block w-80 border-l border-border/50 transition-all duration-300',
        selectedCharacter ? 'translate-x-0' : 'translate-x-full w-0 overflow-hidden'
      )}>
        {selectedCharacter && (
          <CharacterCard 
            transformer={selectedCharacter} 
            onClose={() => setSelectedCharacter(null)}
          />
        )}
      </div>

      {/* Character Panel - Mobile */}
      {selectedCharacter && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedCharacter(null)}
          />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[90vw]">
            <CharacterCard 
              transformer={selectedCharacter} 
              onClose={() => setSelectedCharacter(null)}
            />
          </div>
        </div>
      )}
    </div>
  )
}
