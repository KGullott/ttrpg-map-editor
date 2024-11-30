import type { Image, CreatureSize, Statistics, Health, Abilities, Actions } from '../types'

type CharacterProps = {
    image: Image;
    size: CreatureSize,
    statistics: Statistics;
    health: Health;
    abilities: Abilities;
    savingThrows: Abilities;
    actions: Actions;
}

export class Character {
    public readonly image: Image;
    public readonly size: CreatureSize;
    public readonly statistics: Statistics;
    public health: Health;
    public abilities: Abilities;
    public readonly savingThrows: Abilities;
    public readonly actions: Actions;

    constructor(props: CharacterProps) {
        this.image = props.image;
        this.size = props.size;
        this.statistics = props.statistics;
        this.health = props.health;
        this.abilities = props.abilities
        this.savingThrows = props.savingThrows;
        this.actions = props.actions;
    }

    updateHealth(amount: number, type: 'damage' | 'healing') {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        type === 'damage' ? this.health.current -= amount : this.health.current += amount;
    }
}