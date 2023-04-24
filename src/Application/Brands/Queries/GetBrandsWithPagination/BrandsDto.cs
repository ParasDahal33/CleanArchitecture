using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Mappings;
using CleanArchitecture.Domain.Entities;

namespace CleanArchitecture.Application.Brands.Queries.GetBrandsWithPagination;
public class BrandsDto: IMapFrom<Brand>
{
    public int Id { get; set; }
    public string Name { get; set; }
    
}
