using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace CleanArchitecture.Infrastructure.Identity;

public class ApplicationUser : IdentityUser
{
    [StringLength(255)]
    [Required]
    public string? FullName { get; set; }
    [Required]
    public UserStatus UserStatus { get; set; }
    public DateTime PasswordChangeDate { get; set; }
    [Required]
    public DateTime AccountCreatedDate { get; set; }
    public DateTime ExpiryDate { get; set; }
    public DateTime PwdExpiry { get; set; }

    [NotMapped]
    public string? Role { get; set; }
    [NotMapped]
    public string? RoleId { get; set; }
    [NotMapped]
    public IEnumerable<SelectListItem>? RoleList { get; set; }
}

public enum UserStatus
{ 
    InActive,
    Active
}