import { Component, inject } from '@angular/core';
import { CharacterList } from '../../components/dragonball/character-list/character-list';
import { CharacterAdd } from '../../components/dragonball/character-add/character-add';
import { DragonBallService } from '../../services/dragonball.service';

@Component({
  templateUrl: './dragonball-super-page.component.html',
  selector: 'dragonball-super',
  imports: [CharacterList, CharacterAdd],
})
export class DragonBallSuperPageComponent {
  // constructor(public dragonballService: DragonBallService) {}

  public dragonballService = inject(DragonBallService);
}
