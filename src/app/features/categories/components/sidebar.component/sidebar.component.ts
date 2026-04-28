import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CategoryService } from '../../services/categories.service';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  categoryService = inject(CategoryService);
  selectedCategoryId: number | null = null;
  categories$ = this.categoryService.getCategories();
  @Output() categorySelected = new EventEmitter<Category | null>();

  setSelectedCategory(category: Category | null) {
    this.selectedCategoryId = category?.id ?? null;
    this.categorySelected.emit(category);
  }
}
