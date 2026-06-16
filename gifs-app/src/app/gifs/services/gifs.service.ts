import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';

function loadFromLocalStorage(): Record<string, Gif[]> {
  console.log(localStorage.length);
  let temp: Record<string, Gif[]> = {};
  for (let index = 0; index < localStorage.length; index++) {
    const key = localStorage.key(index) ?? '';
    const dataObject = JSON.parse(localStorage.getItem(key) ?? '');
    console.log(key, dataObject);
    temp[key] = dataObject || [];
  }
  return temp;
}

@Injectable({ providedIn: 'root' })
export class GifService {
  private readonly http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());

  searchHistoryKeys = computed<string[]>(() => Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendingGifs();
    console.log('servicio  creado');
  }

  loadTrendingGifs() {
    this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
        params: {
          api_key: environment.giphyApiKey,
          limit: 20,
        },
      })
      .subscribe((resp) => {
        const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
        this.trendingGifs.set(gifs);
        this.trendingGifsLoading.set(false);
      });
  }

  searchGifs(query: string): Observable<Gif[]> {
    return this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
        params: {
          api_key: environment.giphyApiKey,
          limit: 20,
          q: query,
        },
      })
      .pipe(
        // tap((resp) => console.log({ tap1: resp })),
        // tap((resp) => console.log({ tap2: resp })),
        // tap((resp) => console.log({ tap3: resp })),
        // map((resp) => console.log({ map: resp })),
        map(({ data }) => data),
        map((items) => GifMapper.mapGiphyItemsToGifArray(items)),

        // TODO: Historial
        tap((items) => {
          this.searchHistory.update((history) => ({
            ...history,
            [query.toLowerCase()]: items,
          }));
          for (const [key, customArray] of Object.entries(this.searchHistory())) {
            console.log(`searchKey: ${key} - searchGifs ${customArray.length}`);
            if (!localStorage.getItem(key)) {
              localStorage.setItem(key, JSON.stringify(customArray));
            }
          }
        }),
      );
    // .subscribe((resp) => {
    //   const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
    //   console.log({ resp });

    // });
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? [];
  }
}
