import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type PokemonListItem = { name: string; url: string };
export type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
};

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private http = inject(HttpClient);
  private base = 'https://pokeapi.co/api/v2/pokemon';

  getPokemons(offset: number, limit = 20): Observable<PokemonListResponse> {
    const url = `${this.base}?offset=${offset}&limit=${limit}`;
    return this.http.get<PokemonListResponse>(url);
  }
}
