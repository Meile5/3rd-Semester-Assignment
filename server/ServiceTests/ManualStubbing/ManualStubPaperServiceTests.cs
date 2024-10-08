using DataAccess.Models;
using Microsoft.Extensions.Logging.Abstractions;
using Service;
using Service.Validators;

namespace ServiceTests.ManualStubbing;

public class ManualStubPaperServiceTests
{
    private readonly PaperService _paperService;
    

    public ManualStubPaperServiceTests()
    {
        _paperService = new PaperService(NullLogger<PaperService>.Instance, 
            new StubPaperRepository(),
            new CreateOrderValidator(), 
            null);
    }
    
}