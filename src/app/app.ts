import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserInterfaceService } from './core/ui-state/user-interface.service';
import { CategoryModal } from './features/categories/components/category-modal/category-modal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CategoryModal],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('notes-app');

  userInterfaceService = inject(UserInterfaceService);

  closeCategoryModal() {
    this.userInterfaceService.setModalState(null);
  }
}
