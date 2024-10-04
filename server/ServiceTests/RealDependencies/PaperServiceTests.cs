using DataAccess;
using DataAccess.Interfaces;
using Microsoft.Extensions.Logging.Abstractions;
using PgCtx;
using SharedTestDependencies;
using Service;

namespace ServiceTests.RealDependencies
{
    public class PaperServiceTests
    {
        private readonly PgCtxSetup<PaperContext> _pgCtxSetup = new();
        private readonly IPaperService _paperService;

        public PaperServiceTests()
        {
            IPaperRepository paperRepository = new PaperRepository(_pgCtxSetup.DbContextInstance);
            _paperService = new PaperService(NullLogger<PaperService>.Instance, paperRepository, _pgCtxSetup.DbContextInstance);
        }

        [Fact]
        public void GetAllPapers_ReturnsAllPapers()
        {
            var paper = TestObjects.CreatePaper();
            var paper2 = TestObjects.CreatePaper();
            
            _pgCtxSetup.DbContextInstance.Papers.AddRange(paper, paper2);
            _pgCtxSetup.DbContextInstance.SaveChanges();
            
            var result = _paperService.GetAllPapers(10, 0);

            Assert.NotNull(result);
            Assert.Equal(2, result.Count); 

            // Verify that the papers in the result are the ones added
            Assert.Contains(result, p => p.Name == paper.Name); 
            Assert.Contains(result, p => p.Name == paper2.Name);
           
        }
    }
}