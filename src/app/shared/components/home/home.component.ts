import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../features/categories/components/sidebar.component/sidebar.component';
import { NoteList } from '../../../features/notes/components/note-list/note-list';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { NoteService } from '../../../features/notes/services/note.service';
import { CategoryService } from '../../../features/categories/services/categories.service';
import { CommonModule } from '@angular/common';
import { Note } from '../../../features/notes/models/note.model';
import { NoteEditor } from "../../../features/notes/components/note-editor/note-editor";
import { Category } from '../../../features/categories/models/category.model';

@Component({
  selector: 'app-home.component',
  imports: [SidebarComponent, NoteList, CommonModule, NoteEditor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  selectedCategory$ = new BehaviorSubject<Category | null>(null);
  selectedNote$ = new BehaviorSubject<Note | null>(null);
  noteService = inject(NoteService);
  categoryService = inject(CategoryService)

  notes$ : Observable<Note[]> = this.selectedCategory$.pipe(
    switchMap(
      category =>
        category == null
          ? this.noteService.getAllNotes()
          : this.categoryService.getNoteByCategory(category.id)
    )
  )
}
