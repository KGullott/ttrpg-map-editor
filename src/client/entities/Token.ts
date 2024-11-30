import { Character } from './Character';
import { IconOverlay } from '../types';

export class Token {
    public readonly character: Character;
    public auraRadius: number;
    public iconOverlay: IconOverlay;

    constructor({ character }: { character: Character }) {
        this.character = character
        this.auraRadius = 0
        this.iconOverlay = IconOverlay.None
    }

    setAuraRadius(newAuraRadius: number) {
        this.auraRadius = newAuraRadius;
    }

    getHealthBar() {
        const ratio = this.character.health.current / this.character.health.current
        // figure out syntax for rendering this
        return ratio;
    }

    renderToken() { }

}