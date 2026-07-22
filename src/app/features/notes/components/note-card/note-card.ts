import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { Note } from '../../models/note.model';
import { format } from 'date-fns';
import { NoteService } from '../../services/note.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-note-card',
  imports: [],
  templateUrl: './note-card.html',
  styleUrl: './note-card.css',
})
export class NoteCard {
  note = input.required<Note>();
  analysing = signal(false);
  summary = signal('');
  tags = signal<string[]>([]);

  private noteService = inject(NoteService);
  private destroyRef = inject(DestroyRef);

  formatNoteContent(content: string) {
    return content.substring(0, 10) + "...";
  }

  formatDatetime(datetime: string) {
    return format(datetime, 'yyyy-MM-dd HH:mm')
  }

  analyse() {
    this.analysing.set(true);
    this.noteService.analyse(this.note().id)
      .pipe(finalize(() => {
        this.analysing.set(false);

      }),
        takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: result => {
          this.summary.set(result.summary);
          this.tags.set(result.tags);
        },
      })
  }
}
