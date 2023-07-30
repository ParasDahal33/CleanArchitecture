using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Domain.Events.ModelEvents;
using MediatR;
using Microsoft.Extensions.Logging;

namespace CleanArchitecture.Application.Model.EventHandlers;
public class ModelCompletedEventHandler : INotificationHandler<ModelCompletedEvent>
{
    private readonly ILogger<ModelCompletedEventHandler> _logger;
    public ModelCompletedEventHandler(ILogger<ModelCompletedEventHandler> logger)
    {
        _logger = logger;
    }
    public Task Handle(ModelCompletedEvent notification, CancellationToken cancellationToken)
    {
        _logger.LogInformation("CleanArchitecture Domain Event: {DomainEvent}", notification.GetType().Name);
        return Task.CompletedTask;
    }
}
