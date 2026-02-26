namespace backend.Model
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public UserType UserType { get; set; }
    }

    public enum UserType
    {
        Admin,
        User
    }
}
