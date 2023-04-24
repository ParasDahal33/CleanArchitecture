using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArchitecture.Domain.Entities;
public class CarModel: BaseAuditableEntity
{
    public int CarId { get; set; }
    public string ModelName { get; set; }

    public IList<Brand> Brands { get; private set; } = new List<Brand>();
}
