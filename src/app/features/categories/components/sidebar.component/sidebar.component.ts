import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CategoryService } from '../../services/categories.service';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/category.model';
import { UserInterfaceService } from '../../../../core/ui-state/user-interface.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  
  @Output() categorySelected = new EventEmitter<Category | null>();

  userInterfaceService = inject(UserInterfaceService);

  categoryService = inject(CategoryService);
  selectedCategoryId: number | null = null;
  categories$ = this.categoryService.getCategories();

  setSelectedCategory(category: Category | null) {
    this.selectedCategoryId = category?.id ?? null;
    this.categorySelected.emit(category);
  }

  addCategory() {
    this.userInterfaceService.setModalState({ type: 'addCategory'});
  }
}
