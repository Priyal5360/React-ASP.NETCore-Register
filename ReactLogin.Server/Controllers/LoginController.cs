using System.Data;
using System.Data.SqlClient;
using Microsoft.AspNetCore.Mvc;
using ReactLogin.Server.Model;

namespace ReactLogin.Server.Controllers
{
    [Route("api/Login")]

    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        SqlConnection con;
        SqlCommand cmd;
        public LoginController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        [Route("Register")]
        public IActionResult Register([FromBody] Register register)
        {
            if (register.password != register.conpassword)
            {
                return BadRequest("Password do not match !!");
            }
            string connectionString = _configuration.GetConnectionString("DefaultConnection");

            using (con = new SqlConnection(connectionString))
            { 
                cmd = con.CreateCommand();
                string msg = string.Empty;
                try
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "sp_register";
                    cmd.Parameters.AddWithValue("@username", register.username);
                    cmd.Parameters.AddWithValue("@email", register.email);
                    cmd.Parameters.AddWithValue("@password", register.password);
                    cmd.Parameters.AddWithValue("@conpassword", register.conpassword);

                    con.Open();
                    int i = cmd.ExecuteNonQuery();
                    con.Close();

                    if (i > 0)
                    {
                        msg = "Data inserted";
                    }
                    else
                    {
                        msg = "Error";
                    }
                }
                catch (Exception ex)
                {
                    msg = ex.Message;
                }
                return new OkObjectResult(msg);
            }
        }
    }
}
