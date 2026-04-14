import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../features/categories/components/sidebar.component/sidebar.component';
import { NoteList } from '../../../features/notes/components/note-list/note-list';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { NoteService } from '../../../features/notes/services/note.service';
import { CategoryService } from '../../../features/categories/services/categories.service';
import { CommonModule } from '@angular/common';
import { Note } from '../../../features/notes/models/note.model';

@Component({
  selector: 'app-home.component',
  imports: [SidebarComponent, NoteList, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  selectedCategoryId$ = new BehaviorSubject<number | null>(null);
  noteService = inject(NoteService);
  categoryService = inject(CategoryService)

  notes$ : Observable<Note[]> = this.selectedCategoryId$.pipe(
    switchMap(
      categoryId =>
        categoryId == null
          ? this.noteService.getAllNotes()
          : this.categoryService.getNoteByCategory(categoryId)
    )
  )
}
