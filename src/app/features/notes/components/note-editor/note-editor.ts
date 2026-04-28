import { Component, Input } from '@angular/core';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-note-editor',
  imports: [],
  templateUrl: './note-editor.html',
  styleUrl: './note-editor.css',
})
export class NoteEditor {
  @Input() note: Note | null = null;
}
