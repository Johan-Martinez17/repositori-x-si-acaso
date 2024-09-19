import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCarrito } from '../../../context/CarritoContext'; 

const Carrito = () => {
    const { carrito, setCarrito } = useCarrito();

    useEffect(() => {
        const usuarioId = localStorage.getItem('userId');
        if (usuarioId) {
            const carritoData = JSON.parse(localStorage.getItem(`carrito_${usuarioId}`)) || [];
            setCarrito(carritoData);
        }
    }, [setCarrito]);

    const handleEliminar = (id) => {
        const nuevoCarrito = carrito.filter((producto) => producto.id !== id);
        setCarrito(nuevoCarrito);
        const usuarioId = localStorage.getItem('userId');
        if (usuarioId) {
            localStorage.setItem(`carrito_${usuarioId}`, JSON.stringify(nuevoCarrito));
        }
    };

    const handleCantidadChange = (id, cantidad) => {
        const nuevoCarrito = carrito.map((producto) =>
            producto.id === id ? { ...producto, cantidad: Math.max(1, Math.min(10, cantidad)) } : producto
        );
        setCarrito(nuevoCarrito);
        const usuarioId = localStorage.getItem('userId');
        if (usuarioId) {
            localStorage.setItem(`carrito_${usuarioId}`, JSON.stringify(nuevoCarrito));
        }
    };

    const calcularTotal = () => {
        return carrito.reduce((total, producto) => total + parseFloat(producto.precio) * producto.cantidad, 0).toFixed(3);
    };

    const handleProcederAlPago = () => {
        localStorage.setItem('datosCarrito', JSON.stringify(carrito));
    };

    return (
        <div className="container mx-auto px-4 py-8 my-5">
            <h1 className="text-3xl font-semibold mb-6">Carrito de Compras</h1>
            {carrito.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-xl mb-4">El carrito está vacío.</p>
                </div>
            ) : (
                <div>
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-600">Producto</th>
                                <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-600">Cantidad</th>
                                <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-600">Precio</th>
                                <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-600">Total</th>
                                <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-600">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carrito.map((producto) => (
                                <tr key={producto.id}>
                                    <td className="py-4 px-4 border-b">
                                        <div className="flex items-center">
                                            <img src={producto.imagen} alt={producto.nombre} className="w-20 h-20 object-cover mr-4" />
                                            <span className="text-sm font-medium">{producto.nombre}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 border-b">
                                        <input
                                            type="number"
                                            value={producto.cantidad}
                                            min="1"
                                            max="10"
                                            onChange={(e) => handleCantidadChange(producto.id, parseInt(e.target.value, 10))}
                                            className="w-20 p-2 border border-gray-300 rounded"
                                        />
                                    </td>
                                    <td className="py-4 px-4 border-b"> ${parseFloat(producto.precio).toFixed(3)}</td>
                                    <td className="py-4 px-4 border-b">${(producto.precio * producto.cantidad).toFixed(3)}</td>
                                    <td className="py-4 px-4 border-b">
                                        <button
                                            onClick={() => handleEliminar(producto.id)}
                                            className="bg-red-600 text-white py-1 px-2 rounded hover:bg-red-500 transition"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-6 flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Subtotal: ${calcularTotal()}</h2>
                        <Link 
                            to="/datos-entrega"
                            onClick={handleProcederAlPago}
                            className="px-5 py-3 bg-gradient-to-r from-green-700 to-green-500 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
                        >
                            Proceder al Pago
                        </Link>
                    </div>
                </div>
            )}
            <div className="mt-6 text-center">
                <Link 
                    to="/cliente-dash" 
                    className="px-5 py-3 bg-gray-500 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
                >
                    Seguir Comprando
                </Link>
            </div>
        </div>
    );
};

export default Carrito;
