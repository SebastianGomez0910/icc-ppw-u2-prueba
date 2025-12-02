import { Component, inject, input, resource } from '@angular/core';
import { PokemonService } from '../../services/pokemon';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-pokemon-detail-page',
  imports: [],
  templateUrl: './pokemon-detail-page.html',
  styleUrls: ['./pokemon-detail-page.css'],
})
export class PokemonDetailPageComponent {
  private pokemonService = inject(PokemonService);
  
  id = input.required<string>();

  pokemonResource = resource({
    params: () => ({ id: this.id() }),
    
    loader: async ({ params }) => {
      return firstValueFrom(
        this.pokemonService.getPokemonDetail(params.id)
      );
    }
  });

  hasHiddenAbility(abilities: any[]): boolean {
    return abilities.some(a => a.is_hidden);
  }
}
