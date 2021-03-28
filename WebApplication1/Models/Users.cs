using System;
using System.Collections.Generic;

namespace WebApplication1.Models
{
    public partial class Users
    {
        public int Uid { get; set; }
        public string UName { get; set; }
        public string UEmail { get; set; }
        public string UPassword { get; set; }
        public string UType { get; set; }
        public string UAddress { get; set; }
        public string UContact { get; set; }
    }
}
