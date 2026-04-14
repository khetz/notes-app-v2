import { Component, Input } from '@angular/core';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-note-card',
  imports: [],
  templateUrl: './note-card.html',
  styleUrl: './note-card.css',
})
export class NoteCard {
  @Input() note!: Note;

  formatNoteContent(content: string) {
    return content.substring(0,10) + "...";
  }
}
