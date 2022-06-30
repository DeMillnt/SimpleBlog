using Application.DTOs.Auth;

namespace Application.Interfaces
{
    public interface IAuthService
    {
        public Task<AuthResponse> SignUp(SignUpRequest request);
        public Task<AuthResponse> SignIn(SignInRequest request);
    }
}
