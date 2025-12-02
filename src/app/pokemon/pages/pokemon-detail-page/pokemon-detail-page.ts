import { CommonModule } from '@angular/common';
import { Component, inject, resource } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { PokemonService } from '../../services/pokemon';

@Component({
  selector: 'app-pokemon-detail-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pokemon-detail-page.html',
  styleUrls: ['./pokemon-detail-page.css'],
})
export class PokemonDetailPageComponent {
  private pokemonService = inject(PokemonService);
  private route = inject(ActivatedRoute);

  pokemonResource = resource({
    params: () => ({ id: this.route.snapshot.paramMap.get('id') ?? '' }),

    loader: async ({ params }) => {
      if (!params.id) {
        throw new Error('ID de Pokémon no proporcionado');
      }
      return await firstValueFrom(
        this.pokemonService.getPokemonDetail(params.id)
      );
    }
  });

  hasHiddenAbility(abilities: any[] = []): boolean {
    return abilities.some(a => a.is_hidden);
  }
}
