using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArchitecture.Domain.Entities;
public class UserToken
{
    [Key, Column(Order = 0)]
    public string UserId { get; set; }
    [Key, Column(Order = 1)]
    public string UserRefreshToken { get; set; }
    public DateTime RefreshTokenExpiryTime { get; set; }
}
