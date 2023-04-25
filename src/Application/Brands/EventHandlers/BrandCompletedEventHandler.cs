using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Domain.Entities;
using CleanArchitecture.Domain.Events.BrandEvents;
using MediatR;
using Microsoft.Extensions.Logging;

namespace CleanArchitecture.Application.Brands.EventHandlers;
public class BrandCompletedEventHandler : INotificationHandler<BrandCompletedEvent>
{
    private readonly ILogger<Brand> _logger;

    public BrandCompletedEventHandler(ILogger<Brand> logger)
    {
        _logger= logger;
    }

    public Task Handle(BrandCompletedEvent notification, CancellationToken cancellationToken)
    {
        _logger.LogInformation("CleanArchitecture Domain Event: {DomainEvent}", notification.GetType().Name);
        return Task.CompletedTask;
    }

}
