using System;
using System.Reactive.Linq;
using System.Reactive.Subjects;
using ReactiveLikeApiDemo.Models;

namespace ReactiveLikeApiDemo.Services
{
    public static class BroadcastService
    {
        private static readonly TimeSpan BroadcastInterval = TimeSpan.FromSeconds(2);
        private static readonly IConnectableObservable<Post> _rateLimitedStream;

        static BroadcastService()
        {
            _rateLimitedStream = DataStore.PostSubject
                .GroupBy(p => p.Id)
                .SelectMany(group => group.Throttle(BroadcastInterval))
                .Publish();

            _rateLimitedStream.Connect();
        }

        public static IDisposable Subscribe(Action<Post> onNext)
        {
            return _rateLimitedStream.Subscribe(onNext);
        }
    }
}

