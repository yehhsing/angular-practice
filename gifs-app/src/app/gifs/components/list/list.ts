import { Component, input } from '@angular/core';
import { ListItem } from './list-item/list-item';

@Component({
  selector: 'gif-list',
  imports: [ListItem],
  templateUrl: './list.html',
})
export class List {
  listItems = input.required<string[]>();
}
