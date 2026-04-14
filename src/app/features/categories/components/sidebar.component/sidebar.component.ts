import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  categoryService = inject(CategoriesService);
  selectedCategoryId: number | null = null;
  categories$ = this.categoryService.getCategories();

  setSelectedCategoryId(categoryId: number | null) {
    this.selectedCategoryId = categoryId;
  }
}
