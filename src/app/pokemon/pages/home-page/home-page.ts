import { CommonModule } from '@angular/common';
import { Component, inject, signal, resource } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PokemonService } from '../../services/pokemon';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.css'],
})
export class HomePageComponent {
  
  private pokemonService = inject(PokemonService);
  private router = inject(Router);

  offset = signal(0);
  limit = signal(20);

  pokemonResource = resource({
    params: () => ({
      offset: this.offset(),
      limit: this.limit(),
    }),

    loader: async ({ params }) => {
      return await firstValueFrom(
        this.pokemonService.getPokemonList(params.offset, params.limit)
      );
    }
  });

  totalPokemons = () => this.pokemonResource.value()?.count ?? 0;

  pokemonList = () =>
    this.pokemonResource.value()?.results ?? [];

  getPokemonId(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 2];
  }

  getImgUrl(url: string): string {
    const id = this.getPokemonId(url);
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }

  nextPage() { this.offset.update(v => v + 20); }
  prevPage() { this.offset.update(v => Math.max(0, v - 20)); }
  logout() { this.router.navigate(['/login']); }
}
