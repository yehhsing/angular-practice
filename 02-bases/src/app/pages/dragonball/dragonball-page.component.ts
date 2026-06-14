import { NgClass } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

interface Character {
  id: number;
  name: string;
  power: number;
}

@Component({
  templateUrl: './dragonball-page.component.html',
  imports: [NgClass],
})
export class DragonBallPageComponent {
  name = signal('Gohan');
  power = signal(0);
  characters = signal<Character[]>([
    {
      id: 1,
      name: 'Goku',
      power: 9001,
    },
  ]);

  powerClases = computed(() => {
    return {
      'text-danger': true,
    };
  });

  addCharacter() {
    if (!this.name() || !this.power() || this.power() <= 0) {
      return;
    }
    this.characters.update((characters) => [
      ...characters,
      {
        id: Math.random(),
        name: this.name(),
        power: this.power(),
      },
    ]);
  }
}
