using Application.DTOs.Post;
using AutoMapper;
using Domain;

namespace Infrastructure.MapProfiles
{
    public class PostProfile : Profile
    {
        public PostProfile()
        {
            CreateMap<PostModel, Post>().ReverseMap();           
            CreateMap<CreatePostModel, Post>().ReverseMap();            
        }

        public static MapperConfiguration GetConfiguration()
        {
            return new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<PostProfile>();
            });
        }
    }
}
