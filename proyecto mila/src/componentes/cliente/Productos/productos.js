import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import '../../barras/BarraCliente';
import BarraCliente from '../../barras/BarraCliente';
import Footer from "../../../componentes/Footer/footer";

const ProductosCliente = () => {
  const [productos, setProductos] = useState([]);
  const [categoria, setCategoria] = useState('');
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [ordenamiento, setOrdenamiento] = useState('asc'); // Estado para el orden (ascendente o descendente)
  const [productosNoEncontrados, setProductosNoEncontrados] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/productos') 
      .then(respuesta => {
        setProductos(respuesta.data);
        setProductosNoEncontrados(false); // Reiniciar el estado cuando se cargan productos
      })
      .catch(error => {
        console.error('Error al cargar productos:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo cargar los productos.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  }, []);

  const productosFiltrados = productos
    .filter(producto => {
      const coincideCategoria = categoria ? producto.categoria === categoria : true;
      const coincideBusqueda = producto.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase());
      return coincideCategoria && coincideBusqueda;
    })
    .sort((a, b) => { // Ordenar productos por precio
      if (ordenamiento === 'asc') {
        return a.precio - b.precio; // Orden ascendente
      } else {
        return b.precio - a.precio; // Orden descendente
      }
    });

  // Actualizar el estado si no se encuentran productos después de la búsqueda
  useEffect(() => {
    setProductosNoEncontrados(terminoBusqueda && productosFiltrados.length === 0);
  }, [terminoBusqueda, productosFiltrados]);

  const productosAgrupadosPorCategoria = productosFiltrados.reduce((acumulador, producto) => {
    if (!acumulador[producto.categoria]) {
      acumulador[producto.categoria] = [];
    }
    acumulador[producto.categoria].push(producto);
    return acumulador;
  }, {});

  const ordenCategorias = [
    'entradas',
    'plato fuerte',
    'cocteles',
    'bebidas calientes',
    'bebidas frías',
    'postres'
  ];

  const TarjetaProducto = ({ producto }) => {
    const [cantidad, setCantidad] = useState(1);

    const aumentarCantidad = () => {
      if (cantidad < 10) {
        setCantidad(cantidad + 1);
      }
    };

    const disminuirCantidad = () => {
      if (cantidad > 1) {
        setCantidad(cantidad - 1);
      }
    };

    const agregarAlCarrito = () => {
      Swal.fire({
        title: `¡${producto.nombre} añadido al carrito!`,
        icon: 'success',
        confirmButtonText: 'OK'
      });
    };

    return (
      <div className="rounded overflow-hidden shadow-lg flex flex-col transform hover:scale-105 transition duration-300 ease-in-out mt-12"> 
      
      <div className="relative w-full h-64">
        <img
          className="w-full h-full object-cover"
          src={producto.imagen}
          alt={producto.nombre}
        />
        <div className="absolute inset-0 bg-gray-900 opacity-25 hover:bg-transparent transition duration-300"></div>
        <Link
          className="text-xs absolute top-0 right-0 bg-yellow-500 px-4 py-2 text-black mt-3 mr-3 transition duration-500 ease-in-out no-underline"
        >
          {producto.categoria}
        </Link>
      </div>

        <div className="px-6 py-4 flex-1">
          <p className="font-medium text-lg inline-block hover:text-yellow-500 transition duration-500 ease-in-out mb-2">{producto.nombre}</p>
          <p className="text-gray-500 text-sm mb-2">
            {producto.descripcion}
          </p>
          <p className="text-gray-900 font-semibold text-lg"> $ {producto.precio} COP</p>
          <p className="text-gray-500 text-sm mt-2 hidden">ID: {producto.id}</p> 
        </div>
        <div className="px-6 py-3 flex items-center justify-between bg-gray-100">
          <div className="flex items-center">
            <button 
              onClick={disminuirCantidad} 
              className="text-lg px-3 py-1 text-gray-900 border border-gray-400 rounded hover:bg-gray-200 transition duration-300">
              -
            </button>
            <span className="mx-2">{cantidad}</span>
            <button 
              onClick={aumentarCantidad} 
              className="text-lg px-3 py-1 text-gray-900 border border-gray-400 rounded hover:bg-gray-200 transition duration-300">
              +
            </button>
          </div>
          <button 
            onClick={agregarAlCarrito} 
            className="flex items-center bg-yellow-500 hover:bg-yellow-300 text-black px-4 py-2 rounded transition duration-500 ease-in-out">
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13h.4m12 0a1 1 0 01-1 1H9m4 6a2 2 0 100-4 2 2 0 000 4zm0 0h4m-4 0H9"></path>
            </svg>
            Añadir al carrito
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
        <BarraCliente/>
      <div className="border-b mb-5 flex justify-between text-sm">
        <div className="text-black flex items-center pb-2 pr-2 border-b-2 border-black uppercase">
          <span className="font-semibold inline-block">Seleccione una Categoría</span>
        </div>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="text-black hover:underline"
        >
          <option value="">Todas</option>
          {ordenCategorias.map(cat => (
            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
          ))}
        </select>
      </div>

      {/* Contenedor para el input de búsqueda y el botón de ordenar */}
      <div className="mb-5 flex justify-between items-center space-x-4"> 
        <div className="flex-1 relative">
          <input
            type="text"
            value={terminoBusqueda}
            onChange={(e) => setTerminoBusqueda(e.target.value)}
            placeholder="Buscar por nombre"
            className="w-full p-2 border border-gray-300 rounded"
          />
          {terminoBusqueda && (
            <button
              onClick={() => setTerminoBusqueda('')}
              className="absolute right-2 top-2 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              X
            </button>
          )}
        </div>
        <button 
          onClick={() => setOrdenamiento(ordenamiento === 'asc' ? 'desc' : 'asc')}
          className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-300 transition duration-500 ease-in-out"
        >
          Ordenar por precio: {ordenamiento === 'asc' ? 'Menor a Mayor' : 'Mayor a Menor'}
        </button>
      </div>

      {/* Mostrar mensaje si no se encontraron productos después de la búsqueda */}
      {productosNoEncontrados ? (
        <p className="text-center text-gray-500 text-lg">No se encontraron productos con el término de búsqueda.</p>
      ) : (
        <>
          {/* Mostrar todas las categorías con sus productos en el orden deseado */}
          {ordenCategorias.map(cat => (
            productosAgrupadosPorCategoria[cat] && (
              <div key={cat} className="mb-8">
                <h2 className="text-3xl font-bold mb-4 text-center text-black capitalize">
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </h2>
                <div className="border-b-2 border-yellow-500 mb-6"></div> {/* Línea amarilla más delgada */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                  {productosAgrupadosPorCategoria[cat].map(producto => (
                    <TarjetaProducto key={producto.id} producto={producto} />
                  ))}
                </div>
              </div>
            )
          ))}
          
          {/* Mostrar productos filtrados por categoría */}
          {categoria && !Object.keys(productosAgrupadosPorCategoria).includes(categoria) && (
            <div>
              <h2 className="text-3xl font-bold mb-4 text-center text-black">
                {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
              </h2>
              <div className="border-b-2 border-yellow-500 mb-6"></div> {/* Línea amarilla más delgada */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                {productosFiltrados.length > 0 ? (
                  productosFiltrados.map(producto => (
                    <TarjetaProducto key={producto.id} producto={producto} />
                  ))
                ) : (
                  <p className="text-center text-gray-500 text-lg">No se encontraron productos.</p> 
                )}
              </div>
              <Footer/>
            </div>
          )}
        </>
        
      )}
      
    </div>
  );
};

export default ProductosCliente;
