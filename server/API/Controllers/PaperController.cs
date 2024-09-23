using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Service;


namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaperController : ControllerBase // Corrected to "PaperController"
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
        public ActionResult<List<PaperDto>> GetAllPapers(int limit = 10, int startAt = 0) // Update method signature
        {
            var papers = _service.GetAllPapers(limit, startAt); // Fetch papers
            return Ok(papers); // Return DTOs
        }
    }
}