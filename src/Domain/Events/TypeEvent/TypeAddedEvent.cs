using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArchitecture.Domain.Events.TypeEvent;
public class TypeAddedEvent : BaseEvent
{
    public TypeAddedEvent(CarType carType)
    {
        CarTypes = carType;
    }

    public CarType CarTypes { get; }
}
