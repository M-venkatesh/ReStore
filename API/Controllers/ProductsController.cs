using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

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
		public async Task<ActionResult<List<Product>>> GetAllProducts
			([FromQuery]ProductParams productParams)
		{
			var query = _storeContext.Products
				.Sort(productParams.OrderBy)
				.Search(productParams.SearchTerm)
				.Filter(productParams.Brands,productParams.Types)
				.AsQueryable();

			var products = await PagedList<Product>.ToPagedList(query,
				productParams.PageNumber,productParams.PageSize);

			Response.AddPaginationHeader(products.MetaData);
			return products;
		}
		[HttpGet("{id}")]
		public async Task<IActionResult> GetProduct(int id)
		{
			var product =await _storeContext.Products.FindAsync(id);
			if(product==null) return NotFound();
			return Ok(product);
		}

		[HttpGet("filters")]
		public async Task<IActionResult> GetFilters()
		{
			var brands = await _storeContext.Products.Select(x => x.Brand).Distinct().ToListAsync();
			var types = await _storeContext.Products.Select(x => x.Type).Distinct().ToListAsync();

			return Ok(new { brands, types });
		}
	}
}
