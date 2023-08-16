using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Mappings;
using CleanArchitecture.Domain.Entities;

namespace CleanArchitecture.Application.CarTypes.Queries.GetCarTypeInPagination;
public class CarTypeResponse :IMapFrom<CarType>
{
    public int Id { get; set; }
    public string TypeName { get; set; }
}
