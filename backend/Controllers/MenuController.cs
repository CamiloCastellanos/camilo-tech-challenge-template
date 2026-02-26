using backend.Context;
using backend.Model;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MenuController : ControllerBase
    {

        private readonly DataContext _context;

        public MenuController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public Response GetMenu()
        {
            Response response = new();
            var code = 200;
            try
            {
                response.Data = _context.Menu.ToList();
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
