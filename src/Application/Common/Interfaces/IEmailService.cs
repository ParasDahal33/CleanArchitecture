using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.Authentication.Commands.ConfirmEmail;
using CleanArchitecture.Application.Authentication.Commands.SendEmailConfirmation;
using Microsoft.AspNetCore.Http;
using MimeKit;

namespace CleanArchitecture.Application.Common.Interfaces;
public interface IEmailService
{
    Task SendEmailAsync(Message message);
}

public class Message
{

    public List<MailboxAddress> To { get; set; }
    public string Subject { get; set; }
    public string Content { get; set; }
    public IFormFileCollection Attachments { get; set; }

    public Message(IEnumerable<EmailAddress> to, string subject, string content, IFormFileCollection attachments)
    {
        To = new List<MailboxAddress>();

        To.AddRange(to.Select(x => new MailboxAddress(x.DisplayName, x.Address)));
        Subject = subject;
        Content = content;
        Attachments = attachments;
    }
}

public class EmailAddress
{
    public string Address { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
}
