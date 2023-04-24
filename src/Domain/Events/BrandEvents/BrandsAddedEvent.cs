using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArchitecture.Domain.Events.BrandEvents;
public class BrandsAddedEvent :BaseEvent
{
    public BrandsAddedEvent(Brand brand) 
    { 
        Brands = brand;
    }

    public Brand Brands { get;}
}
