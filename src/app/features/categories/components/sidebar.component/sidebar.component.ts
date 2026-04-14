import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CategoryService } from '../../services/categories.service';
import { CommonModule } from '@angular/common';

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
  @Output() categorySelected = new EventEmitter<number | null>();

  setSelectedCategoryId(categoryId: number | null) {
    this.selectedCategoryId = categoryId;
    this.categorySelected.emit(this.selectedCategoryId);
  }
}
