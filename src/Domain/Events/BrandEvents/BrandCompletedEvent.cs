using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArchitecture.Domain.Events.BrandEvents;
public class BrandCompletedEvent : BaseEvent
{
    public BrandCompletedEvent(Brand brand)
    {
        Brands = brand;
    }

    public Brand Brands { get; init; }
}
