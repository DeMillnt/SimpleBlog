namespace Application.Const
{
    public static class Roles
    {
        public const string Admin = "Admin";
        public const string User = "User";

        public static List<string> GetRoles()
        {
            return new (){ Admin, User };
        }
    }

}
