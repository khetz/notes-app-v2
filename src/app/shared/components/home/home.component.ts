import { Component } from '@angular/core';
import { SidebarComponent } from '../../../features/notes/components/sidebar.component/sidebar.component';
import { NoteList } from '../../../features/notes/components/note-list/note-list';

@Component({
  selector: 'app-home.component',
  imports: [SidebarComponent, NoteList],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

}
