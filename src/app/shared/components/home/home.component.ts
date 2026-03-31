import { Component } from '@angular/core';
import { SidebarComponent } from '../../../features/notes/components/sidebar.component/sidebar.component';

@Component({
  selector: 'app-home.component',
  imports: [SidebarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

}
