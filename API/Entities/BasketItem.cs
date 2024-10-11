using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    [Table("BasketItems")]
    public class BasketItem
    {
        public int Id { get; set; }
        public int quantity { get; set; }
        public int productId { get; set; }
        public Product product { get; set; }
        public int BasketId { get; set; }
        public Basket Basket { get; set; }
    }
}