# Real-Time Post Like System with Server-Sent Events (SSE)

This project demonstrates a **real-time feature** using **.NET Core (Backend)** and **JavaScript** (or **Angular**) for the frontend. When a user "likes" a post, all connected clients receive the update via **Server-Sent Events (SSE)**.

---

## Backend - .NET Core

- **Like Post**: `POST /api/posts/{id}/like` to increment a post's like count.
- **Real-Time Updates**: `GET /api/subscribe` streams updates to clients via SSE.
- **Rate Limiting**: Updates are throttled using `System.Reactive` (1 update per 2 seconds).
- **In-Memory Store**: Posts stored in `ConcurrentDictionary<int, Post>`.

### Key Components:
- **`Post`**: Represents a post with `id`, `content`, and `likes`.
- **`DataStore`**: In-memory store with a reactive subject.
- **`BroadcastService`**: Emits throttled post updates.
- **`PostsController`**: Handles post data and likes.
- **`SubscribeController`**: Streams live updates.

---

## Frontend - JavaScript

- **SSE Subscription**: Connects to `/api/subscribe` for live updates.
- **Like Button**: Triggers the backend to update the like count.
- **Auto Update**: UI updates in real-time when the backend broadcasts new likes.
- **Error Handling**: Displays reconnection issues.

---

## How to Use

1. **Run Backend**: `dotnet run`
2. **Open Frontend**: Access `http://localhost:<port>/index.html`
3. **Test**: Click "Like" to trigger real-time updates.



