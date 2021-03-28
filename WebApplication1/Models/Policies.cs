using Microsoft.AspNetCore.Authorization;

namespace WebApplication1.Models
{
    public static class Policies
    {
        public const string Admin = "admin";
        public const string Customer = "customer";

        public static AuthorizationPolicy AdminPolicy()
        {
            return new AuthorizationPolicyBuilder().RequireAuthenticatedUser().RequireRole(Admin).Build();
        }

        public static AuthorizationPolicy CustomerPolicy()
        {
            return new AuthorizationPolicyBuilder().RequireAuthenticatedUser().RequireRole(Customer).Build();
        }
    }
}
