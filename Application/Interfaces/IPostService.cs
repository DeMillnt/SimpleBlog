using Application.DTOs;
using Application.DTOs.Post;

namespace Application.Interfaces
{
    public interface IPostService
    {
        public Task CreateAsync(CreatePostModel post, string userId);
        public Task<PageResponse<PostModel>> GetPostsAsync(PageRequest pageRequest, CancellationToken cancellation = default);
        public Task<PostModel> GetPostAsync(int postId, CancellationToken cancellation = default);
        public Task UpdateAsync(UpdatePostModel post, string userId);
        public Task RemoveAsync(int postId, string userId);
    }
}
