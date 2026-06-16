import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GifService } from '../../services/gifs.service';
import { List } from '../../components/list/list';

@Component({
  selector: 'gif-history',
  imports: [List],
  templateUrl: './history.html',
})
export default class History {
  // query = inject(ActivatedRoute).params.subscribe((params) => {
  //   console.log(params);
  // });
  gifService = inject(GifService);
  query = toSignal(inject(ActivatedRoute).params.pipe(map((params) => params['query'])));

  gifsByKey = computed(() => {
    return this.gifService.getHistoryGifs(this.query());
  });
}
