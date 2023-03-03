using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArchitecture.Application.Authentication.Commands.ConfirmEmail;
public class EmailConfirmResponse
{
    public string Id { get; set; } = string.Empty;

    public string ResetToken { get; set; } = string.Empty;
}
