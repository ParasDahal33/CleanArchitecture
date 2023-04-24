using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArchitecture.Domain.Entities;
public class Brand: BaseAuditableEntity
{
    public int BrandId { get; set; }
    public string Name { get; set; }
    public CarModel Cars { get; set; } = null!;
}
