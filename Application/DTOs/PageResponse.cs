namespace Application.DTOs
{
    public class PageResponse<T>
    {
        public int Total { get; set; }
        public List<T> Content { get; set; }
    }
}
