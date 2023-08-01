using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Domain.Events.TypeEvent;
using MediatR;
using Microsoft.Extensions.Logging;

namespace CleanArchitecture.Application.Type.EventHandlers;
public class TypeAddedEventHanlder : INotificationHandler<TypeAddedEvent>
{
    private readonly ILogger<TypeAddedEventHanlder> _logger;

    public TypeAddedEventHanlder(ILogger<TypeAddedEventHanlder> logger)
    {
        _logger = logger;
    }
    public Task Handle(TypeAddedEvent notification, CancellationToken cancellationToken)
    {
        _logger.LogInformation("CleanArchitecture Doman Event: {DomainEvent}", notification.GetType().Name);
        return Task.CompletedTask;
    }
}
