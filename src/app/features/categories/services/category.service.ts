import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
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
  private _selectedCategoryId = signal<number | null>(null);
  selectedCategoryId = this._selectedCategoryId.asReadonly();
  selectedCategory = computed(() => {
    let selectedCategoryId = this.selectedCategoryId();

    if (selectedCategoryId == null)
      return null;

    return this.categories()
      .find(c => c.id == selectedCategoryId) ?? null;
  });

  selectCategory(categoryId: number | null) {
    this._selectedCategoryId.set(categoryId);
  }

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

  editCategory(request: Category) {
    this.http.put<Category>(`${this.categoriesUrl}${request.id}`, request)
    .subscribe(updatedCategory => {
      this._categories.update(
        list => list.map(c => c.id == updatedCategory.id ? updatedCategory : c)
      );
    })
  }

  deleteCategory(categoryId: number) {
    this.http.delete(`${this.categoriesUrl}${categoryId}`)
    .subscribe(() => {
      this._categories.update(
        list => list.filter(c => c.id != categoryId))

      if (this.selectedCategoryId() == categoryId)
        this.selectCategory(null);
    })
  }
}
