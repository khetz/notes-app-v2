import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Category } from '../models/category.model';
import { Observable, tap } from 'rxjs';
import { Note } from '../../notes/models/note.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  http = inject(HttpClient);
  categoriesUrl = environment.apiUrl + 'categories/';

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl)
  }

  getNoteByCategory(categoryId: number): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.categoriesUrl}${categoryId}/notes`)
  }
}
