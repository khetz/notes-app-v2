import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
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
  private _categories = signal<Category[]>([]);
  categories = this._categories.asReadonly();

  getCategories() {
    this.http.get<Category[]>(this.categoriesUrl)
    .subscribe(categories => {
      this._categories.set(categories);
    })
  }

  getNoteByCategory(categoryId: number): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.categoriesUrl}${categoryId}/notes`)
  }

  createCategory(request: CreateCategoryRequest) {
    this.http.post<Category>(`${this.categoriesUrl}`, request)
    .subscribe(created => {
      this._categories.update(list => [...list, created]);
    });
  }
}
