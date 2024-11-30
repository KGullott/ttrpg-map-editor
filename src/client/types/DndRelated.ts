export enum CreatureSize {
    Tiny = 'Tiny',
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
    Huge = 'Huge',
    Gargantuan = 'Gargantuan'
}

export enum DieTypes {
    d20 = 20,
    d12 = 12,
    d10 = 10,
    d8 = 8,
    d6 = 6,
    d4 = 4,
    d100 = 100
}

export enum SpellTypes {
    toHitDamage = 'To Hit',
    savingThrow = 'Saving Throw',
    toHitWithSave = 'To Hit With Save'
}

export interface Statistics {
    STR: number;
    DEX: number;
    CON: number;
    INT: number;
    WIS: number;
    CHA: number;
}

export interface Health {
    max: number;
    current: number;
}

export interface Abilities {
    acrobatics: number;
    animalHandling: number;
    arcana: number;
    athletics: number;
    deception: number;
    history: number;
    insight: number;
    intimidation: number;
    investigation: number;
    medicine: number;
    nature: number;
    perception: number;
    performance: number;
    persuasion: number;
    religion: number;
    slightOfHand: number;
    stealth: number;
    survival: number
}

export interface Damage {
    dieType: DieTypes;
    numDie: number;
}

export interface Weapon {
    toHit: number;
    damage: Damage
}

// TODO: figure out conditional types for this
export interface Spell {
    spellType: SpellTypes
}

export interface Actions {
    [key: string]: Weapon | Spell
}