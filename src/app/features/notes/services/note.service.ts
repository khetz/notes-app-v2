import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  notesUrl = environment.apiUrl + 'notes/';
  http = inject(HttpClient);

  getNote(id: number) {
    return this.http.get(`${this.notesUrl}${id}`);
  }
}
