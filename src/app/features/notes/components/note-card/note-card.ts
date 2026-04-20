import { Component, Input } from '@angular/core';
import { Note } from '../../models/note.model';
import { format } from 'date-fns';

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

  formatDatetime(datetime: string) { 
    return format(datetime, 'yyyy-MM-dd HH:mm')
  }
}
