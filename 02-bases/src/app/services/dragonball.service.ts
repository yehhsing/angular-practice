import { effect, Injectable, signal } from '@angular/core';
import { Character } from '../interfaces/character-interface';

function loadFromLocalStorage(): Character[] {
  const characters = localStorage.getItem('characters');
  return characters ? JSON.parse(characters) : [];
}

@Injectable({ providedIn: 'root' })
export class DragonBallService {
  characters = signal<Character[]>(loadFromLocalStorage());

  saveToLocalStorage = effect(() => {
    console.log(`Character count ${this.characters().length}`);
    localStorage.setItem('characters', JSON.stringify(this.characters()));
  });

  addCharacter(x: Character) {
    this.characters.update((list) => [...list, x]);
  }
}

// DI, va a trabajar como singleton, van a tener la misma instancia?
