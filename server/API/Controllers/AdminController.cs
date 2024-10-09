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
        
        [HttpPut]
        [Route("updateStatus")]
        public ActionResult UpdateOrderStatus([FromQuery] int orderId, [FromQuery] string newStatus) 
        {
            if (string.IsNullOrEmpty(newStatus) || orderId <= 0)
            {
                return BadRequest("Invalid order status update request.");
            }
            
            var success = _service.UpdateOrderStatus(orderId, newStatus);
            
            return Ok(); 
        }
        
        [HttpPut]
        [Route("edit-paper")]
        public async Task<ActionResult<PaperDto>> EditPaper([FromBody] PaperDto paperDto)
        {
            if (paperDto.Id == 0)
            {
                return BadRequest("Invalid paper data.");
            }

            var updatedPaper = await _service.EditPaperAsync(paperDto);
            if (updatedPaper == null)
            {
                return NotFound("Paper not found.");
            }

            return Ok(updatedPaper);
        }
       

    }
}