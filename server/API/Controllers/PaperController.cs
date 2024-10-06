using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        [Route("papers")]
        public ActionResult<List<PaperDto>> GetAllPapers(int limit = 10, int startAt = 0) 
        {
            var papers = _service.GetAllPapers(limit, startAt);
            return Ok(papers); 
        }
        
        [HttpGet]
        [Route("")]
        public ActionResult<int> GetTotalPapersCount() 
        {
            var totalCount = _service.GetTotalPapersCount();
            return Ok(totalCount);
        }
        
        [HttpGet]
        [Route("orders-history")]
        public ActionResult<List<OrderDto>> GetCustomerOrders(int id) 
        {
            var orders = _service.GetCustomerOrders(id);
            return Ok(orders); 
        }
        
        [HttpPost]
        [Route("")]
        public async Task<ActionResult<OrderResponseDto>> CreateOrder([FromBody] CreateOrderDto dto)
       {
          var result = await _service.CreateOrder(dto);
          return Ok(result);
          
       }
        [HttpGet]
        [Route("search")]
        public async Task<IActionResult> SearchItems([FromQuery] string query)
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                return BadRequest("Search query cannot be empty.");
            }
            var results = await _service.SearchItemsAsync(query);

            return Ok(results);
        }

    }
}