import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'gif-list-item',
  imports: [],
  templateUrl: './list-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItem {
  imageUrl = input.required<string>();
}
