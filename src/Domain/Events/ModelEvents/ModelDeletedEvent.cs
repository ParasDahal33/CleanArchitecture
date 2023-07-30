using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArchitecture.Domain.Events.ModelEvents;
public class ModelDeletedEvent : BaseEvent
{
    public ModelDeletedEvent(CarModel carModel  )
    {
        CarModels = carModel;
    }

    public CarModel CarModels { get; init; }
}
