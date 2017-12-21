using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebSocketDemo.Models
{
    public class Conversation
    {
        public int Id { get; set; }
        public User Creator { get; set; }
        public DateTime CreateTime { get; set; }
        public List<User> members { get; set; }
        public List<ChatDetail> chatDetails { get; set; }
    }
    public class User
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
    }
    public class ChatDetail
    {
        public int Id { get; set; }
        public Conversation conversation { get; set; }
        public int CreateTime { get; set; }
        public User FromUser{ get; set; }
        public User ToUser { get; set; }
        public string Contents { get; set; }
    }
}
