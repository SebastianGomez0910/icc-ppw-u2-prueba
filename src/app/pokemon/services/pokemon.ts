import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private base = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  getPokemonList(offset: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.base}/pokemon?offset=${offset}&limit=${limit}`);
  }

  getPokemonDetail(id: string): Observable<any> {
    return this.http.get<any>(`${this.base}/pokemon/${id}`);
  }
}
