using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebSocketDemo.Models
{
    public class ChatContext : DbContext
    {
        public ChatContext(DbContextOptions<ChatContext> options) : base(options)
        {

        }
        public DbSet<Conversation> conversations { get; set; }
        public DbSet<User> users { get; set; }
        public DbSet<ChatDetail> chatDetails { get; set; }
    }
}
