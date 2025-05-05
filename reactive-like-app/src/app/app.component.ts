import { Component } from '@angular/core';
import { PostListComponent } from './components/post-list/post-list.component';
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-root',
  imports: [PostListComponent, HttpClientModule],
  standalone: true,
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'reactive-like-app';
}
