using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Service;


namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase 
    {
        private readonly IAdminService _service;

        public AdminController(IAdminService service)
        {
            _service = service;
           
        }
       
        
        [HttpGet]
        [Route("orders-history-allCustomers")]
        public ActionResult<List<OrderDto>> GetAllOrders() 
        {
            var orders = _service.GetAllOrders();
            return Ok(orders); 
        }
        
        [HttpPost]
        [Route("create-paper")]
        public async Task<ActionResult<PaperDto>> CreatePaper([FromBody] PaperDto paperDto)
        {
                await _service.CreatePaperAsync(paperDto);
                return Ok(paperDto);
        }
       

    }
}