import { Component, DestroyRef, effect, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { CategoryService } from '../../../categories/services/category.service';
import { Note } from '../../models/note.model';
import { NoteService } from '../../services/note.service';
import { NoteCard } from '../note-card/note-card';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-note-list',
  imports: [NoteCard, FormsModule],
  templateUrl: './note-list.html',
  styleUrl: './note-list.css',
})
export class NoteList {
  @Output() noteSelected = new EventEmitter<Note | null>();

  searchQuery = signal('');
  isSearching = signal(false);

  notes = signal<Note[]>([]);
  private debounceTimer: any;

  categoryService = inject(CategoryService);
  noteService = inject(NoteService);
  destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      const query = this.searchQuery();
      clearTimeout(this.debounceTimer);

      if (query.trim()) {
        this.debounceTimer = setTimeout(() => {
          this.isSearching.set(true);
          this.noteService.searchNotes(query)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(results => {
              this.notes.set(results);
              this.isSearching.set(false);
            })
        }, 400);
      }
      else {
        let categoryId = this.categoryService.selectedCategoryId();

        if (categoryId == null) {
          this.loadAllNotes();
          return;
        }

        this.loadNotesByCategoryId(categoryId);
      }
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

  clearSearch() {
    this.searchQuery.set('');
  }
}

