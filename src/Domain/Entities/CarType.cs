using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArchitecture.Domain.Entities;
public class CarType : BaseAuditableEntity
{
    public string TypeName { get; set; }
    public IList<CarModel> cars { get; private set; } = new List<CarModel>();
}
