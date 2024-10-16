﻿using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
	public class BuggyController : BaseApiController
	{
		[HttpGet("not-found")]
		public ActionResult GetNotFound()
		{
			return NotFound();
		}
		[HttpGet("bad-request")]
		public ActionResult GetBadRequest()
		{
			return BadRequest(new ProblemDetails{Title="This is a Bad Request"});
		}
		[HttpGet("unauthorised")]
		public ActionResult GetUnauthorised()
		{
			return Unauthorized();
			
		}
		[HttpGet("validation-error")]
		public ActionResult GetValidationError()
		{
			ModelState.AddModelError("Problem1", "This is first Problem");
			ModelState.AddModelError("Problem2", "This is Second Problem");
			return ValidationProblem();
		}
		[HttpGet("server-error")]
		public ActionResult GetServerError()
		{
			throw new Exception("This is Server exception");
		}
	}
}
