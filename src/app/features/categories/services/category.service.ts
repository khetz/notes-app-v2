import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Note } from '../../notes/models/note.model';
import { Category } from '../models/category.model';
import { CreateCategoryRequest } from '../models/create-category-request.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  http = inject(HttpClient);
  categoriesUrl = environment.apiUrl + 'categories/';

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl)
  }

  getNoteByCategory(categoryId: number): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.categoriesUrl}${categoryId}/notes`)
  }

  createCategory(request: CreateCategoryRequest): Observable<void> {
    return this.http.post<void>(`${this.categoriesUrl}`, request);
  }
}
