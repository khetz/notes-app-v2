import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../models/note.model';
import { NoteAnalysis } from '../models/note-analysis.model';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  notesUrl = environment.apiUrl + 'notes/';
  http = inject(HttpClient);

  getNote(id: number) {
    return this.http.get(`${this.notesUrl}${id}`);
  }

  getAllNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.notesUrl);
  }

  searchNotes(query: string): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.notesUrl}search`, {
      params: { query }
    })
  }

  analyse(id: number) {
    return this.http.post<NoteAnalysis>(`${this.notesUrl}${id}/analyse`, {});
  }
}
