using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CommonController<T> : ControllerBase where T : BaseEntity
    {
        private readonly IGenericRepository<T> repo;

        public CommonController(IGenericRepository<T> repo)
        {
            this.repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<T>>> GetAllItems()
        {
            return Ok(await repo.ListAsync());
        }
    }
}