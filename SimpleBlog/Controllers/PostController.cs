using Application.DTOs.Post;
using Application.Interfaces;
using Infrastructure.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostService _postService;

        public PostController(IPostService postService)
        {
            _postService = postService;
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreatePost(CreatePostModel post)
        {
            await _postService.CreateAsync(post, User.GetUserID());
            return NoContent();
        }

        [HttpGet]
        public async Task<IActionResult> GetPosts(int pageIndex = 0, int pageSize = 10, CancellationToken token = default)
        {
            return Ok(await _postService.GetPostsAsync(pageIndex, pageSize, token));
        }

        [HttpGet("post")]
        public async Task<IActionResult> GetPost(int postId, CancellationToken cancellation = default)
        {
            return Ok(await _postService.GetPostAsync(postId, cancellation));
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> UpdatePost(UpdatePostModel post)
        {
            await _postService.UpdateAsync(post, User.GetUserID());
            return NoContent();
        }

        [Authorize]
        [HttpDelete]
        public async Task<IActionResult> DeletePost(int postId)
        {
            await _postService.RemoveAsync(postId, User.GetUserID());
            return NoContent();
        }
    }
}
