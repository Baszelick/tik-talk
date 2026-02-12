import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DADATA_TOKEN } from './dadata-token';
import { map } from 'rxjs';
import { DadataSuggestions } from '../interfaces/dadata.interface';

@Injectable({
  providedIn: 'root'
})

export class DadataService {
  #apiUrl = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address"
  #http = inject(HttpClient)

  getSuggestions(query:string) {
    return this.#http
      .post<{ suggestions: DadataSuggestions[] }>(
        this.#apiUrl,
        { query },
        {
          headers: {
            Authorization: `Token ${DADATA_TOKEN}`,
          },
        }
      )
      .pipe(
        map((res) => {
          return Array.from(
            new Set(
              res.suggestions.map(
                (suggestion: DadataSuggestions) => {
                  return suggestion.data.city
                }
              )))
        })
      );
  }
}
