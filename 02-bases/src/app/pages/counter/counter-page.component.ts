import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  templateUrl: './counter-page.component.html',
  styles: `
    button {
      padding: 5px;
      margin: 5px 10px;
      width: 50px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterPageComponent {
  count = 10;
  counterSignal = signal(10);

  constructor() {
    setInterval(() => {
      this.count += 1;
      // this.counterSignal.update((current) => current + 1);
      console.log('tick');
    }, 2000);
  }

  increaseBy(value: number) {
    this.count += value;
    // this.counterSignal.set(this.counterSignal() + value);
    this.counterSignal.update((current) => current + value);
  }
  reset() {
    this.count = 0;
    this.counterSignal.set(0);
  }
}
