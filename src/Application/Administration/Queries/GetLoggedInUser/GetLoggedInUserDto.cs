using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Mappings;
using CleanArchitecture.Domain.Entities;

namespace CleanArchitecture.Application.Administration.Queries.GetLoggedInUser;
public class GetLoggedInUserDto : IMapFrom<ApplicationUser>
{
    public string Id { get; set; } = string.Empty;
    public string UserName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public int UserStatus { get; set; } = 0;
    public bool EmailConfirmed { get; set; } = false;
    public DateTime PasswordChangeDate { get; set; } = DateTime.MinValue;
    public DateTime AccountCreatedDate { get; set; } = DateTime.MinValue;
    public DateTime ExpiryDate { get; set; } = DateTime.MinValue;
    public DateTime PwdExpiry { get; set; } = DateTime.MinValue;
    public string Role { get; set; } = string.Empty;
}

