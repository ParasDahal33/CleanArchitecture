

namespace CleanArchitecture.Domain.Events.BrandEvents;
public class BrandDeletedEvent : BaseEvent
{
    public BrandDeletedEvent(Brand brand) 
    { 
        
        Brands = brand;
    }  

    public Brand Brands { get; init; }
}
