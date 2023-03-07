using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.Authentication.Commands.ConfirmEmail;
using CleanArchitecture.Application.Common.Exceptions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Common.Utils.EmailConfiguration;
using CleanArchitecture.Infrastructure.Identity;
using MailKit.Net.Smtp;
using MimeKit;

namespace CleanArchitecture.Infrastructure.Services;
public class EmailService : IEmailService
{
    private readonly EmailConfiguration _emailConfig;

    public EmailService(EmailConfiguration emailConfig)
    {
        _emailConfig= emailConfig;
    }

    ///<summary>
    ///   Sends message 
    ///</summary>
    ///<param name="message"></param>
    public async Task SendEmailAsync(Message message)
    {
        var mailMessage = CreateEmailMessage(message);
        await SendAsync(mailMessage);
    }

  
    ///<summary>
    ///   Creates the message to be sent to the email. 
    ///</summary>
    ///<returns>The message to be sent to the email.</returns>
    ///<param name="message"></param>

    private MimeMessage CreateEmailMessage(Message message)
    {
        var emailMessage = new MimeMessage();
        emailMessage.From.Add(new MailboxAddress(_emailConfig.Alias, _emailConfig.From));
        emailMessage.To.AddRange(message.To);
        emailMessage.Subject = message.Subject;

        var bodyBuilder = new BodyBuilder { HtmlBody = string.Format("<div style=\"color: black\">{0}</div>", message.Content) };

        if (message.Attachments != null && message.Attachments.Any())
        {
            byte[] fileBytes;

            foreach (var attachment in message.Attachments)
            {
                using (var ms = new MemoryStream())
                {
                    attachment.CopyTo(ms);
                    fileBytes = ms.ToArray();
                }
                bodyBuilder.Attachments.Add(attachment.FileName, fileBytes, ContentType.Parse(attachment.ContentType));
            }
        }
        emailMessage.Body = bodyBuilder.ToMessageBody();
        return emailMessage;
    }
    ///<summary>
    ///   Sends the message to be sent to the email. 
    ///</summary>
    ///<param name="message"></param>
    private async Task SendAsync(MimeMessage mailMessage)
    {
        using (var client = new SmtpClient())
        {
            try
            {
                await client.ConnectAsync(_emailConfig.SmtpServer, _emailConfig.Port, false);
                client.AuthenticationMechanisms.Remove("XOAUTH2");
                await client.AuthenticateAsync(_emailConfig.UserName, _emailConfig.Password);
                await client.SendAsync(mailMessage);
            }
            catch
            {
                throw new KeyNotFoundException("Error while sending email");
            }
            finally
            {
                await client.DisconnectAsync(true);
                client.Dispose();
            }
        }
    }
}
