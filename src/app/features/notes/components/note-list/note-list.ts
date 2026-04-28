import { Component, Input } from '@angular/core';
import { NoteCard } from '../note-card/note-card';
import { Note } from '../../models/note.model';
import { Category } from '../../../categories/models/category.model';

@Component({
  selector: 'app-note-list',
  imports: [NoteCard],
  templateUrl: './note-list.html',
  styleUrl: './note-list.css',
})
export class NoteList {
  @Input() notes: Note[] = [];
  @Input() category: Category | null = null;
}
