using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using WebSocketDemo.Models;

namespace WebSocketDemo.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly ChatContext _context;
        public UsersController(ChatContext context)
        {
            _context = context;
            //if (_context.users.Count() == 0)
            //{
            //    _context.users.Add(new User { UserName = "秋无迹" });
            //    _context.SaveChanges();
            //}
        }
        // GET api/users
        [HttpGet]
        public IEnumerable<User> Get()
        {
            return _context.users;
        }

        // GET api/users/5
        [HttpGet("{id}")]
        public User Get(int id)
        {
            return _context.users.Find(id);
        }

        // GET api/otherUsers/5
        [HttpGet("others/{id}")]
        public IEnumerable<User> GetOtherUsers(int id)
        {
            return _context.users.Where(u => u.UserId != id);
        }
        [HttpGet("others1/{id}")]
        public async Task<IEnumerable<User>> GetOtherUsers1(int id)
        {
            if (HttpContext.WebSockets.IsWebSocketRequest)
            {
                WebSocket webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
                await Echo(id, webSocket);
            }
            else
            {
                HttpContext.Response.StatusCode = 400;
            }
            return _context.users.Where(u => u.UserId != id);
        }
        private async Task Echo(int id, WebSocket webSocket)
        {
            var buffer = new byte[1024 * 4];
            WebSocketReceiveResult result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
            while (!result.CloseStatus.HasValue)
            {
                var sendBuffer = new ArraySegment<byte>(Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(_context.users.Where(u => u.UserId != id))));
                await webSocket.SendAsync(sendBuffer, result.MessageType, result.EndOfMessage, CancellationToken.None);

                result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
            }
            await webSocket.CloseAsync(result.CloseStatus.Value, result.CloseStatusDescription, CancellationToken.None);
        }
        // POST api/users
        [HttpPost]
        public int Post(string userName)
        {
            int index = _context.users.Add(new User { UserName = userName }).Entity.UserId;
            _context.SaveChanges();
            return index;
        }

        // PUT api/users/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/users/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
