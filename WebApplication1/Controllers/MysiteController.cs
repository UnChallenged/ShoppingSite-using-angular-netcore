using Microsoft.AspNetCore.Mvc;

namespace WebApplication1.Controllers
{

    [ApiController]
    public class MysiteController : ControllerBase
    {

        /* DbAccessLayer objmysite = new DbAccessLayer();
         [HttpGet]
         [Route("api/admin/addproducts/getcatlist")]
         [Authorize(Policy = Policies.Admin)]
         public IEnumerable<Categories> Index()
         {
             return objmysite.getcategories();
         }

         [HttpPost]
         [Route("api/admin/addproducts/add")]
         public int addproduct([FromBody] Products product)
         {

             return objmysite.addproduct(product);
         }
         [HttpGet]
         [Route("api/admin/manageproducts/getproducts")]
         public IEnumerable<Products> manageproducts()
         {
             return objmysite.getproducts();
         }
         [HttpDelete]
         [Route("api/admin/manageproducts/delete/{id}")]
         public int Delete(int id)
         {
             return objmysite.Deleteproduct(id);
         }*/

    }
}