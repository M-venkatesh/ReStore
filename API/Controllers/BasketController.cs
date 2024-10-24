using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController:BaseApiController
    {
        public StoreContext _context;
        public BasketController(StoreContext context)
        {
            _context = context;
        }
        [HttpGet(Name ="GetBasket")]
        public async Task<ActionResult<BasketDTO>> GetBasket()
        {
            var basket = await RetrieveBasket();
            if (basket == null) return NotFound();
            return MapToBasketDTO(basket);
        }

        
        [HttpPost]
        public async Task<ActionResult<BasketDTO>> AddItemToBasket(int productId, int quantity)
        {
            var basket = await RetrieveBasket();
            if(basket == null) basket = CreateBasket();
            var data = Request.Cookies["buyerId"];
            var product = await _context.Products.FindAsync(productId);
            if(product == null) return BadRequest(new ProblemDetails { Title="Product Not Found"});
            basket.AddItem(product,quantity);

            var result = await _context.SaveChangesAsync() > 0;
            if(result) return CreatedAtRoute("GetBasket",MapToBasketDTO(basket));
            return BadRequest(new ProblemDetails{Title="Problem Adding Item to Basket"});
        }
        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId,int quantity)
        {
            var basket = await RetrieveBasket();
            if(basket == null) return NotFound();
            basket.RemoveItem(productId,quantity);
            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();
            return BadRequest(new ProblemDetails{Title="Problem removing item from basket"});
        }
        private async Task<Basket> RetrieveBasket()
        {
            return await _context.Baskets
                                .Include(i => i.items)
                                .ThenInclude(p => p.product)
                                .FirstOrDefaultAsync(x => x.buyerId == Request.Cookies["buyerId"]);
        }

        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions{IsEssential = true,Expires = DateTime.Now.AddDays(30),SameSite=SameSiteMode.None,Secure=true};
            Response.Cookies.Append("buyerId",buyerId,cookieOptions);

			var basket = new Basket{buyerId = buyerId};
            _context.Baskets.Add(basket);
            return basket;
        }
        private BasketDTO MapToBasketDTO(Basket basket)
        {
            return new BasketDTO
            {
                Id = basket.Id,
                BuyerId = basket.buyerId,
                items = basket.items.Select(item => new BasketItemDTO
                {
                    ProductId = item.productId,
                    Name = item.product.Name,
                    price = item.product.Price,
                    PictureUrl = item.product.PictureUrl,
                    Type = item.product.Type,
                    Brand = item.product.Brand,
                    Quantity = item.quantity
                }).ToList()
            };
        }

    }
}