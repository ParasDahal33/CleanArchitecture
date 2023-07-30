using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Domain.Events.BrandEvents;

namespace CleanArchitecture.Domain.Events.ModelEvents;
public class ModelCompletedEvent : BaseEvent
{
    public ModelCompletedEvent(CarModel carModel) 
    { 
        CarModels = carModel;
    }
    public CarModel CarModels { get; init;}
}
