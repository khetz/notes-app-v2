import { Component, computed, DestroyRef, effect, inject, signal } from '@angular/core';
import { UserInterfaceService } from '../../../../core/ui-state/user-interface.service';
import { CreateCategoryRequest } from '../../models/create-category-request.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-modal',
  imports: [],
  templateUrl: './category-modal.html',
  styleUrl: './category-modal.css',
})
export class CategoryModal {
  userInterfaceService = inject(UserInterfaceService);
  categoryService = inject(CategoryService);
  private readonly destroyRef = inject(DestroyRef);
  categoryName = signal('');

  title = computed(() => {
    const modalState = this.userInterfaceService.modalState();

    if (!modalState) return '';

    switch (modalState.type) {
      case "addCategory":
        return 'Add Category';
      case 'editCategory':
        return 'Edit Category';
    }
  });

  constructor() {
    effect(() => {
      const modalState = this.userInterfaceService.modalState();

      if (modalState?.type == "editCategory") {
         this.categoryName.set(modalState.category.name);
      }

      this.categoryName.set('');
    })
  }

  closeModal() {
    this.userInterfaceService.setModalState(null);
  }

  save() {
    const modalState = this.userInterfaceService.modalState();

    if (modalState?.type == "addCategory") {
      const request: CreateCategoryRequest = {
        name: this.categoryName()
      }

      this.categoryService.createCategory(request);
    }
    else if (modalState?.type == "editCategory") {
      // generate edit request
    }

    this.userInterfaceService.setModalState(null);
  }
}
