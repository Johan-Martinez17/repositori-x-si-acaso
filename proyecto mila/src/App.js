import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';  
import { UserContext } from './context/UserContext';
import ProtectedRoute from './componentes/ProtectedRouter'; 
import Logout from './componentes/logout';
import Carrito from './componentes/cliente/Pedidos/Carrito';
import Index from "./paginas/auth/inicio";
import Login from './componentes/auth/login';
import BarraAdmin from './componentes/barras/BarraAdministrador';
import BarraCliente from './componentes/barras/BarraCliente';
import BarraMesero from './componentes/barras/BarraMesero';
import FormularioRegistro from './componentes/auth/registrocliente';
import BarraNormal from "./componentes/barras/barra_normal";
import ConsultaUsuarios from "./componentes/administrador/usuarios/consultausarios";
import Footer from "./componentes/Footer/footer";
import InicioMesa from "./componentes/cliente/reservas/InicioReservaMesa";
import ReservaLocal from "./componentes/cliente/reservas/reservalocal";
import FormularioRegiEmp from './componentes/administrador/usuarios/regsitroempleados';
import EditarUsuario from './componentes/administrador/usuarios/editarusuarios';
import RegistroProductos from './componentes/administrador/Productos/RegistrarProductos';
import GestionReservaMesa from "./componentes/administrador/Reservas/GestionReservaMesa";
import GestionReservasCliente from "./componentes/cliente/reservas/reservascliente";
import RegistroEventosCliente from "./componentes/cliente/eventos/EventosCliente";
import RegistroEventos from "./componentes/administrador/eventos/RegistroEventos";
import GestionEventos from "./componentes/administrador/eventos/ModificarEventos";
import FormularioInscripcion from "./componentes/cliente/eventos/FormularioInscripcion";
import ProductosCliente from './componentes/cliente/Productos/productos'
import GestionProductos from './componentes/administrador/Productos/GestionProductos';
import Servicios from './componentes/servicios'
import EditarEventos from './componentes/administrador/eventos/EditarEventos';
import MisInscripciones from './componentes/cliente/eventos/MisInscripciones';

const App = () => {
  const { role } = useContext(UserContext);

  console.log("Current Role:", role); // Debugging statement

  let NavBarComponent = BarraNormal; // Default value

  if (role === 'administrador') {
    NavBarComponent = BarraAdmin;
  } else if (role === 'Cliente') {
    NavBarComponent = BarraCliente;
  } else if (role === 'mesero') {
    NavBarComponent = BarraMesero;
  }

  return (
    <>
      <NavBarComponent />
      <main>
        <Routes>
          {/* Rutas públicas */}
          <Route path='/' element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrocliente" element={<FormularioRegistro />} />

          {/* Rutas protegidas para administradores */}
          <Route path="/consultausarios" element={
            <ProtectedRoute>
              <ConsultaUsuarios />
            </ProtectedRoute>
          } />
          <Route path="/regsitroempleados" element={
            <ProtectedRoute>
              <FormularioRegiEmp />
            </ProtectedRoute>
          } />
          <Route path="/editarusuarios/:usuarioId" element={
            <ProtectedRoute>
              <EditarUsuario />
            </ProtectedRoute>
          } />
          <Route path="/RegistrarProductos" element={
            <ProtectedRoute>
              <RegistroProductos />
            </ProtectedRoute>
          } />
          <Route path="/GestionProductos" element={
            <ProtectedRoute>
              <GestionProductos />
            </ProtectedRoute>
          } />

          
          <Route path="/InicioReservaMesa" element={
            <ProtectedRoute>
              <InicioMesa />
            </ProtectedRoute>
          } />
          <Route path="/reservalocal" element={
            <ProtectedRoute>
              <ReservaLocal />
            </ProtectedRoute>
          } />
          <Route path="/productos" element={
            <ProtectedRoute>
              <ProductosCliente />
            </ProtectedRoute>
          } />

          <Route path="/Carrito" element={
            <ProtectedRoute>
              <Carrito />
            </ProtectedRoute>
          } />

          <Route path="/GestionReservaMesa" element={
            <ProtectedRoute>
              <GestionReservaMesa/>
            </ProtectedRoute>
          } />

          <Route path="/GestionReservaLocal" element={
            <ProtectedRoute>
              <ReservaLocal/>
            </ProtectedRoute>
          } />

          <Route path="/reservascliente" element={
            <ProtectedRoute>
              <GestionReservasCliente/>
            </ProtectedRoute>
          } />

          <Route path="/EventosCliente" element={
            <ProtectedRoute>
              <RegistroEventosCliente/>
            </ProtectedRoute>
          } />

          <Route path="/RegistroEventos" element={
            <ProtectedRoute>
              <RegistroEventos/>
            </ProtectedRoute>
          } />

          <Route path="/ModificarEventos" element={
            <ProtectedRoute>
              <GestionEventos/>
            </ProtectedRoute>
          } />

          <Route path="/FormularioInscripcion" element={
            <ProtectedRoute>
              <FormularioInscripcion/>
            </ProtectedRoute>
          } />

          <Route path="/EditarEventos/:id" element={
            <ProtectedRoute>
              <EditarEventos/>
            </ProtectedRoute>
          } />

          <Route path="/MisInscripciones" element={
            <ProtectedRoute>
              <MisInscripciones></MisInscripciones>
            </ProtectedRoute>
          } />




          {/* Ruta para cerrar sesión */}
          <Route path="/logout" element={<Logout />} />
          <Route path="/servicios" element={<Servicios />} />
        </Routes>

        <Footer/>
      </main>
    </>
  );
};

export default App;
