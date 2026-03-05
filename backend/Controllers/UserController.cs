using backend.Context;
using backend.Model;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class UserController : ControllerBase
    {
        private readonly DataContext _context;

        public UserController(DataContext context)
        {
            _context = context;
        }

        [HttpPost]
        public Response Login([FromBody] LoginRequest user)
        {
            Response response = new();
            var code = 200;
            try
            {
                response.Data = _context.User.FirstOrDefault(u => u.Email == user.User && u.Password == user.Password);
            }
            catch
            {
                code = 500;
                response.Message = "Sorry something went wrong, try again later";
                response.Data = null;
            }
            response.StatusCode = code;
            return response;
        }

        [HttpPost]
        public Response AddUser([FromBody] User user)
        {
            Response response = new();
            var code = 200;
            try
            {
                _context.User.Add(user);
                _context.SaveChanges();
                response.Data = true;
            }
            catch
            {
                code = 500;
                response.Message = "Sorry something went wrong, try again later";
                response.Data = false;
            }
            response.StatusCode = code;
            return response;
        }


        [HttpPost]
        public Response UpdateUser([FromBody] User user)
        {
            Response response = new();
            var code = 200;
            try
            {
                _context.User.Update(user);
                _context.SaveChanges();
                response.Data = true;
            }
            catch
            {
                code = 500;
                response.Message = "Sorry something went wrong, try again later";
                response.Data = false;
            }
            response.StatusCode = code;
            return response;
        }

        [HttpPost]
        public Response DeleteUser([FromBody] User user)
        {
            Response response = new();
            var code = 200;
            try
            {
                _context.User.Remove(user);
                _context.SaveChanges();
                response.Data = true;
            }
            catch
            {
                code = 500;
                response.Message = "Sorry something went wrong, try again later";
                response.Data = false;
            }
            response.StatusCode = code;
            return response;

        }

        [HttpGet]
        public Response GetAllUsers()
        {
            Response response = new();
            var code = 200;
            try
            {
                response.Data = _context.User.ToList();
            }
            catch(Exception ex) 
            {
                code = 500;
                response.Message = "Sorry something went wrong, try again later";
                response.Data = null;
            }
            response.StatusCode = code;
            return response;
        }

        [HttpGet("{id}")]
        public Response GetUser(int id)
        {

            Response response = new();
            var code = 200;
            try
            {
                response.Data = _context.User.FirstOrDefault(u => u.Id == id);
            }
            catch
            {
                code = 500;
                response.Message = "Sorry something went wrong, try again later";
                response.Data = null;
            }
            response.StatusCode = code;
            return response;
        }
    }
}
