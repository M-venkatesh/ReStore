using API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class ProductsController : BaseApiController
	{
		private readonly StoreContext _storeContext;
		public ProductsController(StoreContext storeContext)
		{
			_storeContext = storeContext;
		}
		[HttpGet]
		public async Task<IActionResult> GetAllProducts()
		{
			var products =await _storeContext.Products.ToListAsync();
			return Ok(products);
		}
		[HttpGet("{id}")]
		public async Task<IActionResult> GetProduct(int id)
		{
			var product =await _storeContext.Products.FindAsync(id);
			if(product==null) return NotFound();
			return Ok(product);
		}
	}
}
