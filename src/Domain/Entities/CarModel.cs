using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArchitecture.Domain.Entities;
public class CarModel: BaseAuditableEntity
{
    public string ModelName { get; set; }
    public Brand Brands { get; set; }
}
