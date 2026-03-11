export type Faction = 'autobot' | 'decepticon'

export interface TransformerStats {
  strength: number
  intelligence: number
  speed: number
  endurance: number
  rank: number
  courage: number
  firepower: number
  skill: number
}

export interface Transformer {
  id: string
  name: string
  faction: Faction
  rank: string
  altMode: string
  description: string
  abilities: string[]
  stats: TransformerStats
  quote?: string
}

export const transformersDatabase: Transformer[] = [
  {
    id: 'optimus-prime',
    name: 'Optimus Prime',
    faction: 'autobot',
    rank: 'Autobot Commander',
    altMode: 'Peterbilt 379 Semi-Truck',
    description: 'Optimus Prime is the noble leader of the Autobots. He is a courageous and compassionate warrior who believes freedom is the right of all sentient beings. His dedication to protecting life and standing against tyranny has made him a legendary figure across the galaxy.',
    abilities: ['Ion Blaster', 'Energon Axe', 'Matrix of Leadership', 'Combat Shield'],
    stats: { strength: 10, intelligence: 10, speed: 8, endurance: 10, rank: 10, courage: 10, firepower: 8, skill: 10 },
    quote: 'Freedom is the right of all sentient beings.'
  },
  {
    id: 'bumblebee',
    name: 'Bumblebee',
    faction: 'autobot',
    rank: 'Scout',
    altMode: 'Chevrolet Camaro',
    description: 'Bumblebee is one of the smallest and most courageous Autobots. Despite his size, his determination and bravery make him an invaluable member of the team. He serves as a scout and is known for his close bond with humans.',
    abilities: ['Plasma Cannon', 'Stinger Blasters', 'Enhanced Agility', 'Stealth Mode'],
    stats: { strength: 5, intelligence: 8, speed: 9, endurance: 7, rank: 7, courage: 10, firepower: 6, skill: 8 },
    quote: 'I may be small, but I am mighty!'
  },
  {
    id: 'megatron',
    name: 'Megatron',
    faction: 'decepticon',
    rank: 'Decepticon Leader',
    altMode: 'Cybertronian Jet / Fusion Cannon',
    description: 'Megatron is the ruthless leader of the Decepticons. Once a gladiator in the pits of Kaon, he rose to power through sheer brutality and cunning. He believes that the strong should rule the weak and will stop at nothing to conquer Cybertron and beyond.',
    abilities: ['Fusion Cannon', 'Dark Energon Manipulation', 'Combat Mastery', 'Tactical Genius'],
    stats: { strength: 10, intelligence: 10, speed: 7, endurance: 10, rank: 10, courage: 9, firepower: 10, skill: 10 },
    quote: 'Peace through tyranny!'
  },
  {
    id: 'starscream',
    name: 'Starscream',
    faction: 'decepticon',
    rank: 'Air Commander',
    altMode: 'F-22 Raptor',
    description: 'Starscream is the treacherous second-in-command of the Decepticons. He constantly schemes to overthrow Megatron and take leadership for himself. Despite his cowardly nature, he is an exceptionally skilled aerial combatant.',
    abilities: ['Null Rays', 'Cluster Bombs', 'Supersonic Flight', 'Aerial Combat Master'],
    stats: { strength: 7, intelligence: 9, speed: 10, endurance: 6, rank: 9, courage: 4, firepower: 9, skill: 9 },
    quote: 'Megatron has fallen! I, Starscream, am now your leader!'
  },
  {
    id: 'ironhide',
    name: 'Ironhide',
    faction: 'autobot',
    rank: 'Weapons Specialist',
    altMode: 'GMC TopKick Pickup Truck',
    description: 'Ironhide is the Autobots\' weapons specialist and one of Optimus Prime\'s oldest friends. He is tough, gruff, and always ready for battle. His extensive arsenal and combat experience make him one of the most formidable Autobot warriors.',
    abilities: ['Plasma Cannons', 'Heavy Artillery', 'Titanium Armor', 'Combat Veteran'],
    stats: { strength: 9, intelligence: 7, speed: 5, endurance: 10, rank: 8, courage: 10, firepower: 10, skill: 9 },
    quote: 'High-grade weapons coming through!'
  },
  {
    id: 'soundwave',
    name: 'Soundwave',
    faction: 'decepticon',
    rank: 'Communications Officer',
    altMode: 'Cybertronian Satellite / Boombox',
    description: 'Soundwave is Megatron\'s most loyal follower and the Decepticons\' communications expert. He monitors all transmissions and deploys his minicons for espionage. His cold, calculating nature and unwavering loyalty make him invaluable to the Decepticon cause.',
    abilities: ['Sonic Attacks', 'Mind Reading', 'Minicon Deployment', 'Electronic Warfare'],
    stats: { strength: 8, intelligence: 10, speed: 6, endurance: 8, rank: 8, courage: 7, firepower: 7, skill: 10 },
    quote: 'Soundwave superior. Autobots inferior.'
  },
  {
    id: 'ratchet',
    name: 'Ratchet',
    faction: 'autobot',
    rank: 'Chief Medical Officer',
    altMode: 'Search and Rescue Vehicle',
    description: 'Ratchet is the Autobots\' chief medical officer. Though he prefers healing to fighting, he will defend his patients fiercely. His medical expertise has saved countless Autobot lives, and his grumpy demeanor hides a deeply caring spark.',
    abilities: ['Medical Tools', 'EMP Generator', 'Field Repairs', 'Surgical Precision'],
    stats: { strength: 4, intelligence: 10, speed: 5, endurance: 6, rank: 7, courage: 8, firepower: 4, skill: 10 },
    quote: 'I needed that!'
  },
  {
    id: 'shockwave',
    name: 'Shockwave',
    faction: 'decepticon',
    rank: 'Military Operations Commander',
    altMode: 'Cybertronian Tank / Laser Cannon',
    description: 'Shockwave is a cold, emotionless scientist driven purely by logic. He serves as guardian of Cybertron when Megatron is away and conducts horrific experiments in the name of Decepticon supremacy. His single optic is the last thing many Autobots ever see.',
    abilities: ['Arm Cannon', 'Logic Processor', 'Scientific Genius', 'Space Bridge Technology'],
    stats: { strength: 9, intelligence: 10, speed: 5, endurance: 9, rank: 9, courage: 10, firepower: 10, skill: 9 },
    quote: 'Logical. Logical. Logical.'
  }
]

export function findTransformer(query: string): Transformer | undefined {
  const normalizedQuery = query.toLowerCase()
  return transformersDatabase.find(t => 
    t.name.toLowerCase().includes(normalizedQuery) ||
    normalizedQuery.includes(t.name.toLowerCase())
  )
}

export function getTransformersByFaction(faction: Faction): Transformer[] {
  return transformersDatabase.filter(t => t.faction === faction)
}
