using System.Collections.Concurrent;
using System.Reactive.Subjects;
using ReactiveLikeApiDemo.Models;

namespace ReactiveLikeApiDemo.Services
{
    public static class DataStore
    {
        public static ConcurrentDictionary<int, Post> Posts = new();
        public static Subject<Post> PostSubject = new();

        static DataStore()
        {
            Posts.TryAdd(
                1,
                new Post
                {
                    Id = 1,
                    Content = "Hello World!",
                    Likes = 0,
                }
            );
            Posts.TryAdd(
                2,
                new Post
                {
                    Id = 2,
                    Content = "Reactive Demo",
                    Likes = 0,
                }
            );
        }
    }
}