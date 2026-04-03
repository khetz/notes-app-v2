import { Component } from '@angular/core';
import { NoteCard } from '../note-card/note-card';

@Component({
  selector: 'app-note-list',
  imports: [NoteCard],
  templateUrl: './note-list.html',
  styleUrl: './note-list.css',
})
export class NoteList {}
