using Application.DTOs;
using Application.DTOs.Post;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using Infrastructure.Context;
using Infrastructure.MapProfiles;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services
{
    public class PostService : IPostService
    {
        private readonly ApplicationDbContext _db;
        private readonly IMapper _mapper;

        public PostService(ApplicationDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public Task CreateAsync(CreatePostModel postModel, string userId)
        {
            var post = _mapper.Map<Post>(postModel);
            post.UserId = userId;
            _db.Add(post);
            return _db.SaveChangesAsync();
        }

        public Task<PostModel> GetPostAsync(int postId, CancellationToken cancellation = default)
        {
            return _db.Posts.ProjectTo<PostModel>(PostProfile.GetConfiguration()).FirstAsync(p => p.Id == postId, cancellation);
        }

        public async Task<PageResponse<PostModel>> GetPostsAsync(int pageIndex, int pageSize, CancellationToken cancellationToken)
        {
            var posts = _db.Posts.AsQueryable().Skip(pageIndex * pageSize).Take(pageSize);
            return new()
            {
                Total = await posts.CountAsync(cancellationToken),
                Content = await posts.ProjectTo<PostModel>(PostProfile.GetConfiguration()).ToListAsync(cancellationToken)
            };
        }

        public async Task RemoveAsync(int postId, string userId)
        {
            var post = await _db.Posts.FirstOrDefaultAsync(p => p.Id == postId && p.UserId == userId);

            if (post is null)
            {
                throw new Exception("Post is not found");
            }

            _db.Posts.Remove(post);
            await _db.SaveChangesAsync();
        }

        public async Task UpdateAsync(UpdatePostModel updatePost, string userId)
        {
            var post = await _db.Posts.FirstOrDefaultAsync(p => p.Id == updatePost.Id && p.UserId == userId);

            if (post is null)
            {
                throw new Exception("Post is not found");
            }

            post.Update(updatePost.Title, updatePost.Content);

            _db.Posts.Update(post);
            await _db.SaveChangesAsync();
        }
    }
}
