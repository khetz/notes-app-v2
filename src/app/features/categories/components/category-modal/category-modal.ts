import { Component, computed, DestroyRef, effect, inject, signal } from '@angular/core';
import { UserInterfaceService } from '../../../../core/ui-state/user-interface.service';
import { CategoryService } from '../../services/category.service';
import { CreateCategoryRequest } from '../../models/create-category-request.model';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

  saveCategory() {
    const modalState = this.userInterfaceService.modalState();

    if (modalState?.type == "addCategory") {
      const request: CreateCategoryRequest = {
        name: this.categoryName()
      }

      this.categoryService.createCategory(request)
        .pipe(
          finalize(() => { this.userInterfaceService.setModalState(null) }),
          takeUntilDestroyed(this.destroyRef)
        ).subscribe();
    }
    else if (modalState?.type == "editCategory") {
      // generate edit request
    }
  }
}
