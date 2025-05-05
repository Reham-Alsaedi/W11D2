import { Component, OnInit } from '@angular/core';
import { Post, PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  highlightedPostIds: Set<number> = new Set();

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe(data => {
      this.posts = data;
    });

    this.postService.getPostUpdates().subscribe(updatedPost => {
      const index = this.posts.findIndex(p => p.id === updatedPost.id);
      if (index > -1) {
        this.posts[index] = updatedPost;
      } else {
        this.posts.push(updatedPost);
      }

      // إضافة الـ highlight مؤقتًا
      this.highlightedPostIds.add(updatedPost.id);
      setTimeout(() => this.highlightedPostIds.delete(updatedPost.id), 2000);
    });
  }

  onLike(postId: number) {
    this.postService.likePost(postId).subscribe();
  }

  isHighlighted(postId: number): boolean {
    return this.highlightedPostIds.has(postId);
  }
}
