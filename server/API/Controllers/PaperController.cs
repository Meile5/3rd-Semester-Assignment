using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Service;


namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaperController : ControllerBase 
    {
        private readonly IPaperService _service;
        private readonly IOptionsMonitor<AppOptions> _options;

        public PaperController(IPaperService service, IOptionsMonitor<AppOptions> options)
        {
            _service = service;
            _options = options;
        }

        [HttpGet]
        [Route("")]
        public ActionResult<List<PaperDto>> GetAllPapers(int limit = 10, int startAt = 0) 
        {
            var papers = _service.GetAllPapers(limit, startAt);
            return Ok(papers); // Return DTOs
        }
        
        [HttpGet]
        [Route("orders")]
        public ActionResult<List<PaperDto>> GetAllOrders() 
        {
            var orders = _service.GetAllOrders();
            return Ok(orders); 
        }
        
        [HttpPost]
        [Route("")]
        public async Task<ActionResult> CreateOrder([FromBody] CreateOrderRequest request)
    {
   //      if (request == null || request.OrderEntries == null || !request.OrderEntries.Any())
  //  {
  //      return BadRequest("Order data is required.");
  //  }
        await _service.CreateOrder(request);
        return Created("", new { message = "Order and entries saved successfully." });
     }

    }
}