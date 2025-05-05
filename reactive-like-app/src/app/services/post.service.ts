import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import 'eventsource-polyfill';

export interface Post {
  id: number;
  content: string;
  likes: number;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postUpdates$ = new Subject<Post>();

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.connectToSSE();
    }
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('http://localhost:65400/api/posts');
  }

  likePost(id: number): Observable<Post> {
    return this.http.post<Post>(`http://localhost:65400/api/posts/${id}/like`, {});
  }

  getPostUpdates(): Observable<Post> {
    return this.postUpdates$.asObservable();
  }

  private connectToSSE() {
    if (typeof window !== 'undefined' && window.EventSource) {
      const eventSource = new EventSource('http://localhost:65400/api/subscribe');

      eventSource.onmessage = (event) => {
        const post: Post = JSON.parse(event.data);
        this.postUpdates$.next(post);
      };

      eventSource.onerror = (err) => {
        console.error('SSE error:', err);
        eventSource.close();

        // محاولة إعادة الاتصال بعد 5 ثوانٍ
        setTimeout(() => this.connectToSSE(), 5000);
      };
    }
  }
}

