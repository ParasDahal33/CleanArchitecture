using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Domain.Events.BrandEvents;
using MediatR;
using Microsoft.Extensions.Logging;

namespace CleanArchitecture.Application.Brands.EventHandlers;
public class BrandCreatedEventHandler : INotificationHandler<BrandsAddedEvent>
{
    private readonly ILogger<BrandCreatedEventHandler> _logger;

    public BrandCreatedEventHandler(ILogger<BrandCreatedEventHandler> logger)
    {
        _logger = logger;
    }

    public Task Handle(BrandsAddedEvent notification, CancellationToken cancellationToken)
    {
        _logger.LogInformation("CleanArchitecture Domain Event:{DomainEvent}", notification.GetType().Name);
        return Task.CompletedTask;
    }
}
