﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Domain.Events.ModelEvents;

namespace CleanArchitecture.Domain.Entities;
public class CarModel: BaseAuditableEntity
{
    public string ModelName { get; set; }
    public Brand Brands { get; set; }
    public CarType Types { get; set; }
    
}
