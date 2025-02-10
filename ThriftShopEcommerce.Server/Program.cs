
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using ThriftShopEcommerce.Server.Data;
using ThriftShopEcommerce.Server.Model;

namespace ThriftShopEcommerce.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            //Database Service
            builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            builder.Services.AddAuthorization();
            builder.Services.AddIdentityApiEndpoints<User>()
                .AddEntityFrameworkStores<ApplicationDbContext>();

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            //builder.Services.AddOpenApi();

            // Register Swagger
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            app.UseDefaultFiles();
            app.MapStaticAssets();
            app.MapIdentityApi<User>();

            #region CustomEndPoints
                //Logout
                app.MapPost("/logout", async (SignInManager<User> signInManager) =>
                {
                    await signInManager.SignOutAsync();
                    return Results.Ok();
                }).RequireAuthorization();

                //Ping Auth
                app.MapPost("/pingauth", async (ClaimsPrincipal user) =>
                {
                    var email = user.FindFirstValue(ClaimTypes.Email);  //Get authenticated user's email
                    return Results.Json(new { Email = email });         //Return the authenticated user's email as plaintext response
                }).RequireAuthorization();
            #endregion

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                //app.MapOpenApi();
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
