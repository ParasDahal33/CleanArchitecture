using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Domain.Events.BrandEvents;

namespace CleanArchitecture.Domain.Entities;
public class Brand : BaseAuditableEntity
{
    public string Name { get; set; }
    public IList<CarModel> cars { get; private set; } = new List<CarModel>();
  
}
