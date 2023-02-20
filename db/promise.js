const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'SoloKukos',
  password: '123',
  port: 5432,
})

const getTypeUsers = (request, response) => {
    
    const { correo, contrasena } = request.body;

    pool.query('SELECT "TipoUsuario" FROM public."Usuarios" where "Correo"=$1 AND "Contrasena"=$2;',[correo, contrasena], (error, results) => {
      if (error) {
        throw error
      }
      response.header('Access-Control-Allow-Origin', '*');
      response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      response.status(200).json(results.rows)
    })
}

const getCategorys = (request, response) => {  
    pool.query('SELECT C."Id", C."Categoria" AS title FROM public."Categorias" C ORDER BY "Id" ASC ;', (error, results) => {
      if (error) {
        throw error
      }
      response.header('Access-Control-Allow-Origin', '*');
      response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      response.status(200).json(results.rows);
    })
}

const getIdCategory = (request, response) => {
    
    const { categoria } = request.body;
    console.log(categoria);
    pool.query('SELECT * FROM public."Categorias" where "Categoria"=$1;',[categoria], (error, results) => {
      if (error) {
        throw error
      }
      response.header('Access-Control-Allow-Origin', '*');
      response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      response.status(200).json(results.rows);
    })
}

const createCategory = (request, response) => {
    
    const { categoria } = request.body;

    pool.query('INSERT INTO public."Categorias"("Categoria") VALUES ($1) RETURNING "Id";',[categoria], (error, results) => {
      if (error) {
        throw error
      }
      response.header('Access-Control-Allow-Origin', '*');
      response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      results.text = "Se inserto correctamente";
      const res = {message:results.text, id:results.rows[0].Id}
      response.status(200).json(res);
    })
}

const deleteCategory = (request, response) => {
    
  const { categoria } = request.body;

  pool.query('DELETE FROM public."Categorias" WHERE "Categoria" = $1;',[categoria], (error, results) => {
    if (error) {
      throw error
    }
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    results.text = "Se elemino correctamente";
    const res = {message:results.text}
    response.status(200).json(res);
  })
}

const getProducts = (request, response) => {  
  pool.query('SELECT P."Id", P."Nombre", P."Precio", P."Referencia",P."Talla",P."Color",P."IdCategoria",P."UrlImages",C."Categoria" FROM public."Productos" P JOIN public."Categorias" C ON P."IdCategoria"= C."Id";', (error, results) => {
    if (error) {
      throw error
    }
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    response.status(200).json(results.rows);
  })
}

const getProductCategory = (request, response) => {
  
  const { idcategoria } = request.body;

  pool.query('SELECT * FROM public."Productos" WHERE "IdCategoria" = $1;',[idcategoria], (error, results) => {
    if (error) {
      throw error
    }
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    response.status(200).json(results.rows);
  })

}

const createProduct = (request, response) => {
  
  const { nombre,precio,referencia,talla,color,idcategoria,urlimages } = request.body;

  pool.query('INSERT INTO public."Productos"("Nombre", "Precio", "Referencia", "Talla", "Color", "IdCategoria", "UrlImages") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING "Id";',[nombre,precio,referencia,talla,color,idcategoria,urlimages], (error, results) => {
    if (error) {
      throw error
    }
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    results.text = "Se inserto correctamente";
    const res = {message:results.text, id:results.rows[0].Id}
    response.status(200).json(res);
  })
}

const updateProduct = (request, response) => {
  
  const { nombre,precio,referencia,talla,color,idcategoria,urlimages,id } = request.body;

  pool.query('UPDATE public."Productos" SET "Nombre"=$1, "Precio"=$2, "Referencia"=$3, "Talla"=$4, "Color"=$5, "IdCategoria"=$6, "UrlImages"=$7 WHERE "Id"=$8 RETURNING "Id";',[nombre,precio,referencia,talla,color,idcategoria,urlimages,id], (error, results) => {
    if (error) {
      throw error
    }
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    results.text = "Se actualizo correctamente";
    const res = {message:results.text, id:results.rows[0].Id}
    response.status(200).json(res);
  })
}

const deleteProduct = (request, response) => {
  
  const { id } = request.body;
  pool.query('DELETE FROM public."Productos" WHERE "Id"=$1;',[id], (error, results) => {
    if (error) {
      throw error
    }
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    results.text = "Se elimino correctamente";
    const res = {message:results.text}
    response.status(200).json(res);
  })
}

module.exports = {
  getTypeUsers,
  getCategorys,
  getIdCategory,
  createCategory,
  deleteCategory,
  getProducts,
  getProductCategory,
  createProduct,
  updateProduct,
  deleteProduct,
}