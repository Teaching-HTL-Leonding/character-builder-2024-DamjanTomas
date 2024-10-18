import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ApiService, Character, CharacterResponse, Eye, Mouth, RightHand } from '../api.service';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-build',
  standalone: true,
  imports: [JsonPipe, FormsModule, CommonModule],
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.css']
})
export class BuildComponent {
  eye = signal<Eye>('Open');
  hasHammer = signal<boolean>(false);
  mouth = signal<Mouth>('Unhappy');
  rightHand = signal<RightHand>('Victory');
  hasTail = signal<boolean>(false);
  imageUrl = signal<string | null>(null);

  character: Character | null = null;
  private apiService = inject(ApiService);

  async buildCharacter() {
    const characterOptions: Character = {
      eye: this.eye(),
      hasHammer: this.hasHammer(),
      mouth: this.mouth(),
      rightHand: this.rightHand(),
      hasTail: this.hasTail(),
      imageUrl: ''
    };

    try {
      const response: CharacterResponse = await this.apiService.buildCharacter(characterOptions);

      if (response && response.url && response.url.length > 0) {
        this.imageUrl.set(response.url);
        console.log('Image URL:', this.imageUrl);
      } else {
        console.warn('No character data returned or data is empty.');
        this.imageUrl.set(null);
      }
    } catch (error) {
      console.error('Error building character:', error);
      this.imageUrl.set(null);
    }
  }

  private readonly httpClient = inject(HttpClient);

  getCharactersRandomImage(): Promise<CharacterResponse> {
    return firstValueFrom(
      this.httpClient.get<CharacterResponse>(
        'http://localhost:5110/build-image-url'
      )
    )
  }

  /*getCaharctersImage() : Promise<CharacterResponse> {
    return firstValueFrom(
      this.httpClient.get<CharacterResponse>(
        `http://localhost:5110/img/${imageId}`
      )
    )
  }*/

}
