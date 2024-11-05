using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    [Table(name:"Basket")]
    public class Basket
    {
        public int Id { get; set; }
        public string buyerId { get; set; }
        public List<BasketItem> items { get; set; } = new();

        public void AddItem(Product product, int quantity)
        {
            if (items.All(item => item.productId != product.Id))
            {
                items.Add(new BasketItem { product = product, quantity = quantity });
            }
            var existingItem = items.FirstOrDefault(item => item.productId == product.Id);
            if (existingItem != null) existingItem.quantity += quantity;
        }
        public void RemoveItem(int productId,int quantity)
        {
            var item = items.FirstOrDefault(item=>item.productId==productId);
            if(item==null) return;
            item.quantity-=quantity;
            if(item.quantity==0) items.Remove(item);
        }
    }


}