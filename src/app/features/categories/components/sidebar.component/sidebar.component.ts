import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/category.model';
import { UserInterfaceService } from '../../../../core/ui-state/user-interface.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {

  @Output() categorySelected = new EventEmitter<Category | null>();

  userInterfaceService = inject(UserInterfaceService);

  categoryService = inject(CategoryService);
  categories = this.categoryService.categories;

  ngOnInit(): void {
    this.categoryService.getCategories();
  }

  setSelectedCategory(categoryId: number | null) {
    this.categoryService.selectCategory(categoryId)
  }

  addCategory() {
    this.userInterfaceService.setModalState({ type: 'addCategory' });
  }

  editCategory(category: Category) {
    this.userInterfaceService.setModalState({ type: 'editCategory', category: category })
  }

  deleteCategory(category: Category) {
    this.userInterfaceService.setModalState({ type: 'deleteCategory', category: category })
  }
}
