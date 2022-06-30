namespace Domain
{
    public class Post
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string UserId { get; set; }

        public void Update(string title, string content)
        {
            this.Title = title;
            this.Content = content;
        }
    }
}
