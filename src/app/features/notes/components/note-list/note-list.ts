import { Component, DestroyRef, effect, EventEmitter, inject, Output, signal } from '@angular/core';
import { CategoryService } from '../../../categories/services/category.service';
import { Note } from '../../models/note.model';
import { NoteService } from '../../services/note.service';
import { NoteCard } from '../note-card/note-card';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-note-list',
  imports: [NoteCard],
  templateUrl: './note-list.html',
  styleUrl: './note-list.css',
})
export class NoteList {
  @Output() noteSelected = new EventEmitter<Note | null>();

  notes = signal<Note[]>([]);

  categoryService = inject(CategoryService);
  noteService = inject(NoteService);
  destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      let categoryId = this.categoryService.selectedCategoryId();

      if (categoryId == null) {
        this.loadAllNotes();
        return;
      }

      this.loadNotesByCategoryId(categoryId);
    })
  }

  setSelectedNote(note: Note | null) {
    this.noteSelected.emit(note);
  }

  loadAllNotes() {
    this.noteService.getAllNotes()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (notes: Note[]) => {
        this.notes.set(notes);
      }
    })
  }

  loadNotesByCategoryId(categoryId: number) {
    this.categoryService.getNoteByCategory(categoryId)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (notes: Note[]) => {
        this.notes.set(notes);
      }
    })
  }
}

