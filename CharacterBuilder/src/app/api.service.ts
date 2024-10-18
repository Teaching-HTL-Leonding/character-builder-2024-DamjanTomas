import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export type Character = {
  eye: Eye,
  hasHammer: boolean,
  mouth: Mouth,
  rightHand: RightHand,
  hasTail: boolean,
  imageUrl: string
}
export type Eye = "NoEye" | "HalfOpen" | "Closed" | "Open";
export type Mouth = "NoMouth" | "Happy" | "Normal" | "Unhappy";
export type RightHand = "NoHand" | "Normal" | "Victory";
export type CharacterResponse = {
  url: string;
  data: { url: Character }[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private httpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:5110/build-image-url';

  buildCharacter(characterOptions: any): Promise<CharacterResponse> {
    return firstValueFrom(
      this.httpClient.post<CharacterResponse>(
        this.apiUrl,
        characterOptions
      )
    ).catch((error) => {
      console.error('Error building character:', error);
      throw error;
    });
  }
}
