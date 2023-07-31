using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArchitecture.Domain.Events.TypeEvent;
public class TypeDeletedEvent : BaseEvent
{
    public TypeDeletedEvent(CarType carType)
    {
        CarTypes = carType;
    }

    public CarType CarTypes { get; }
}
