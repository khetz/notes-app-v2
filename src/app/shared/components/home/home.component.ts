import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SidebarComponent } from '../../../features/categories/components/sidebar.component/sidebar.component';
import { CategoryService } from '../../../features/categories/services/category.service';
import { NoteEditor } from "../../../features/notes/components/note-editor/note-editor";
import { NoteList } from '../../../features/notes/components/note-list/note-list';
import { Note } from '../../../features/notes/models/note.model';
import { NoteService } from '../../../features/notes/services/note.service';

@Component({
  selector: 'app-home.component',
  imports: [SidebarComponent, NoteList, CommonModule, NoteEditor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  selectedNote$ = new BehaviorSubject<Note | null>(null);
  noteService = inject(NoteService);
  categoryService = inject(CategoryService)
}
