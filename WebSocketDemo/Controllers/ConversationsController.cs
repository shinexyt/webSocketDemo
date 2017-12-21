using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebSocketDemo.Models;

namespace WebSocketDemo.Controllers
{
    [Produces("application/json")]
    [Route("api/Conversations")]
    public class ConversationsController : Controller
    {
        private readonly ChatContext _context;

        public ConversationsController(ChatContext context)
        {
            _context = context;
        }

        // GET: api/Conversations
        [HttpGet]
        public IEnumerable<Conversation> Getconversations()
        {
            return _context.conversations;
        }

        // GET: api/Conversations/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetConversation([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var conversation = await _context.conversations.SingleOrDefaultAsync(m => m.Id == id);

            if (conversation == null)
            {
                return NotFound();
            }

            return Ok(conversation);
        }

        // PUT: api/Conversations/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutConversation([FromRoute] int id, [FromBody] Conversation conversation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != conversation.Id)
            {
                return BadRequest();
            }

            _context.Entry(conversation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ConversationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Conversations
        [HttpPost]
        public async Task<IActionResult> PostConversation([FromBody] Conversation conversation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.conversations.Add(conversation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetConversation", new { id = conversation.Id }, conversation);
        }

        // DELETE: api/Conversations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteConversation([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var conversation = await _context.conversations.SingleOrDefaultAsync(m => m.Id == id);
            if (conversation == null)
            {
                return NotFound();
            }

            _context.conversations.Remove(conversation);
            await _context.SaveChangesAsync();

            return Ok(conversation);
        }

        private bool ConversationExists(int id)
        {
            return _context.conversations.Any(e => e.Id == id);
        }
    }
}