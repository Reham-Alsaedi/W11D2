using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactiveLikeApiDemo.Services;

namespace ReactiveLikeApiDemo.Controllers
{
    [ApiController]
    [Route("api/subscribe")]
    public class SubscribeController : ControllerBase
    {
        [HttpGet]
        //Streams real-time post updates to the client using Server-Sent Events (SSE), subscribing to a broadcast service and sending serialized post updates with throttling support.
        public async Task Subscribe(CancellationToken token)
        {
            Response.Headers.Add("Content-Type", "text/event-stream");
            var tcs = new TaskCompletionSource();

            var subscription = BroadcastService.Subscribe(async post =>
            {
                var json = JsonSerializer.Serialize(post);
                await Response.WriteAsync($"data: {json}\n\n");
                await Response.Body.FlushAsync();
            });

            token.Register(() =>
            {
                subscription.Dispose();
                tcs.TrySetResult();
            });

            await tcs.Task;
        }
    }
}
