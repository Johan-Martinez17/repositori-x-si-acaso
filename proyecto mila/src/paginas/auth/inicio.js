import React, { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from '../../context/UserContext'; // Importa el contexto de usuario
import '../../index.css';

// Importa los componentes de barra de navegación
import BarraAdmin from '../../componentes/barras/BarraAdministrador';
import BarraCliente from '../../componentes/barras/BarraCliente';
import BarraMesero from '../../componentes/barras/BarraMesero';
import BarraNormal from "../../componentes/barras/barra_normal";

const Index = () => {
  const { role, setRole } = useContext(UserContext); // Obtén el rol del contexto
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole);
    } else {
      navigate('/'); // Redirige a la página de inicio de sesión si no hay rol
    }
  }, [setRole, navigate]);


  // Efecto para manejar la redirección al iniciar sesión
 
  const handleLogout = () => {
    localStorage.removeItem('role');
    setRole('normal');  // Restablece el rol al valor por defecto
    navigate('/login');  // Redirige al inicio o página deseada
  };

  // Determina el componente de la barra de navegación según el rol
  let NavBarComponent = BarraNormal; // Valor por defecto

  if (role === 'administrador') {
    NavBarComponent = BarraAdmin;
  } else if (role === 'Cliente') {
    NavBarComponent = BarraCliente;
  } else if (role === 'mesero') {
    NavBarComponent = BarraMesero;
  }

  return (
    <div>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mila INDEX</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />

    <NavBarComponent/>

    {/* Contenido de la página */}
    <div className="container mx-auto pt-5">
    <div className="container mx-auto pt-5">
        {/* SERVICIOS */}
        <div className="relative text-center py-[115px] pb-[35px]">
          <h4 className="tracking-widest text-black">Nuestros Servicios</h4>
          <h1 className="text-4xl font-bold">Comida Fresca &amp; Natural</h1>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[2px] h-[100px] bg-[#DA9F5B]" />
        </div>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-1/2 px-4 mb-5">
            <div className="flex items-center">
              <div className="w-2/5">
                <img className="w-full mb-3 lg:mb-0" src="https://uc3f1e35c994ae80e644e430ec4e.previews.dropboxusercontent.com/p/thumb/ACb2dBi3vPt6yJTfHfCYaULHEQfokGKDiV1tB5z9KGUTEGSecGY8QpOZRhHTiNqRrvPL9ziM19QqgXb9DCgfPWzsRrSewrQsw7wMGGvomFNpsd3pWQoAUvEt7m-c--F_ciswj3Phb3ff1MwE4fR1SPov0IA2UjFtAZAAuzzfxz7RHc2SRoinIgYyGr8z6C5CxrgQxiDQysdOs_uB9Rs4kVbbAd-zimnwd1tgq0_9-PCeVE9dte0-ZgepgpZCY19QOK6tZgj2EI_GfuK5ivbkN7EJ3Y6Az_gnhx5mncHJ4rFbNrcgzfEdtw63HJ7rpwxJsp7VHhYlpAfyqMc2tQqo5HN54pQ03AKHtVlpGICQE88dPA/p.jpeg" alt="Organización de Eventos" />
              </div>
              <div className="w-3/5 pl-4">
                <h4 className="text-xl"><i className="fa fa-calendar service-icon" />Organización de Eventos</h4>
                <p className="m-0">En Mila, ofrecemos un servicio de organización de eventos para hacer de tu ocasión especial un momento inolvidable. Nos encargamos de todos los detalles para que tú puedas disfrutar.</p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 px-4 mb-5">
            <div className="flex items-center">
              <div className="w-2/5">
                <img className="w-full mb-3 lg:mb-0" src="https://uc8eca974831184e3990418a9ff2.previews.dropboxusercontent.com/p/thumb/ACbj6Ay2136eluiRCBmvpZy4VH7zzypb-sjjo8uIPHDqzCHlD9a-65MPmdj-gKWvemxIUFYLgKPyiDA1O_MHZ8zpIU8xzkmInJDbHvoJJgviTr0ph5rAKS5teP_Eff3c4w2kKzZDlBHFEAFzUqkffEm3E8P-GYBtZUHTiZpJBTCKp_qUE-SeHNmxlLSQSweYB2EBUEkMt2vVnj46uvglVCESNZg6LW25N-gyMdyFbXogKZaWJyre1471ayvovLRF5cH27T4v-k55gFLog5mcwPmE0oI79u64UVGaVPvMnQzwD8BpZAg6A4sQBuH1g0ZrxpX-rwJ9uM3Z4NCpJh0T4D1mOPOZVfdGhKUd0PY5_p-IwQ/p.jpeg" alt="Reservas" />
              </div>
              <div className="w-3/5 pl-4">
                <h4 className="text-xl"><i className="fa fa-book service-icon" />Reservas</h4>
                <p className="m-0">Facilitamos el proceso de reservas para que siempre tengas un lugar en nuestro restaurante. Ya sea para una cena con tu pareja o una reunión familiar, puedes reservar con antelación.</p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 px-4 mb-5">
            <div className="flex items-center">
              <div className="w-2/5">
                <img className="w-full mb-3 lg:mb-0" src="https://ucefcea421dc2454f630bcbcc95d.previews.dropboxusercontent.com/p/thumb/ACZYEAXZyg0_JIVdooSJxoPm9WhQ0N-PHGWsa3_hYBOVWEeRcQhvAPPn4oIdWVH9FhAW_vWEV2TY6KMGXbKhXcm7pdENX0yZAeWwoA4LdJ7eEaKjMw_-XecfN2gjmQ4jqy9SXJpfZI2bt7iEAVOP6ACvCAaCXmrSJ60Qk9ZNwhUMoiUFLMtPwari6XtIRNFnEITJ5gORW3R6-nKJKhdRah-lR0rstKlhm_HqhZkF1agXnszQPMwp_0BuZMTdfJh627uiH3i_UPz_JGSA3Jl19P89DoIeAaFxBxFT7jbhuoRzO5ghQmAXVGrobnZ0_yJ9pdTGNTtY-qlNIrQfZ9QGzK0wIDODg6HiMK5Cx7ALqj98-g/p.jpeg" alt="Pedidos" />
              </div>
              <div className="w-3/5 pl-4">
                <h4 className="text-xl"><i className="fa fa-bullhorn service-icon" />Pedidos</h4>
                <p className="m-0">Realiza tus pedidos de manera rápida y sencilla a través de nuestro sistema en línea. Ofrecemos un servicio eficiente para que disfrutes de tus comidas favoritas sin complicaciones.</p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 px-4 mb-5">
            <div className="flex items-center">
              <div className="w-2/5">
                <img className="w-full mb-3 lg:mb-0" src="https://uc59ad10b3136bf8dab9e348b31c.previews.dropboxusercontent.com/p/thumb/ACYQAqN82A3QjSeBYophJ1IZRcoT7vzoy3U_IddXy3FzCSnNk2299o5Qfvnf1CY37Kndg3kJEAp5SOD1EoAKtSoWcmnh6KDlXTTvP6WHCVV8x6JlKwxT8j5-f4f8AeWUKC4i4n0lYhPHoSOSKLQEBi42gi1X7POt35fYECUseyd3zE0gV9YTGcWfPbpr60SBh6LF8pqNwJvhnAbMAogI3fRaFfi2iywKo9FuLkiX_CUWKX9BhXOIs0Vz_BhmrPLgMBp4zi7w2ht--UODLKL8xdPmAhaF3GONgSgO02EibQJ1NwsSyko9-jCOclUXttxXq4vn85Q_cx1BAvb52-8aP2WnkQe6JZvGgb7ZsuBmYB9qRQ/p.jpeg" alt="Disfruta con la Familia" />
              </div>
              <div className="w-3/5 pl-4">
                <h4 className="text-xl"><i className="fa fa-utensils service-icon" />Productos</h4>
                <p className="m-0">En Mila, queremos que disfrutes momentos especiales con tu familia. Nuestro ambiente acogedor y nuestro menú variado son perfectos para pasar tiempo de calidad juntos y que realices diferentes pedidos.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SOBRE NOSOTROS */}
      <div className="container mx-auto py-5">
        <div className="relative text-center py-[115px] pb-[35px]">
          <h4 className="tracking-widest text-black"><b>Sobre Nosotros</b></h4>
          <h1 className="text-4xl font-bold"><b>Sirviendo desde 2018</b></h1>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[2px] h-[100px] bg-[#DA9F5B]" />
        </div>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-1/3 px-4 py-5">
            <h1 className="text-2xl mb-3">Nuestra Misión</h1>
            <p>En Luz Mila gastro fusión, nuestra misión es ofrecer una experiencia gastronómica única que combina la tradición culinaria con la innovación moderna. Nos comprometemos a utilizar ingredientes frescos y locales, preparados con pasión y creatividad, para deleitar a nuestros clientes con platos que celebran la riqueza de la cocina regional e internacional. Buscamos crear un ambiente acogedor y sofisticado donde cada visita sea memorable y cada plato cuente una historia.</p>
          </div>
          <div className="w-full lg:w-1/3 px-4 py-5 relative min-h-[500px]">
            <img className="absolute inset-0 w-full h-full object-cover" src="https://uc6b26e94a0bcce24bd93c169d15.previews.dropboxusercontent.com/p/thumb/ACaCAHoNd35u6-R-KjPyqB5NawGtVgTLPtCawlfQwtH65iKJRSO3IfnhTj_B4vMSCS801vL_uRT39cgkDJmabOQ4e0tGO8_VrCdJVXUvDvlNDPV2vtjonaJJeB115d7cAhRLr7VibbjmFY7aDxiAlvr1n0Z1s9ht6tZlCotpTnjEaDkB18oUTT3l6YMW10AWAj1szGsErAdK7sj2tE-nxlM8-9hTirwlbVE3kkHBZzyRQFx8H16jx8n0nH_qTPMlGjUozpyWlZGraKQxJDd53uJZEsp34wwCPVvD60g5vS6fWZN0zw5WYNrJLROqz5KylQzIdbZiAz8G6BXxp_nCMSrTLrqzOXzqAzuasg0UfQmtkQ/p.png" alt="Sobre Nosotros" />
          </div>
          <div className="w-full lg:w-1/3 px-4 py-5">
            <h1 className="text-2xl mb-3">Nuestra Visión</h1>
            <p>Ser reconocidos como el gastrobar de referencia en nuestra comunidad, famoso por nuestra cocina excepcional, nuestro servicio al cliente impecable y nuestro compromiso con la sostenibilidad. Aspiramos a expandir nuestra marca y abrir nuevas ubicaciones, manteniendo siempre nuestros valores de calidad y excelencia. Queremos ser un lugar donde las personas se reúnan para celebrar momentos especiales y disfrutar de una experiencia culinaria inigualable.</p>
            <h5 className="flex items-center mb-3"><i className="fa fa-check text-primary mr-2" />Los mejores servicios</h5>
            <h5 className="flex items-center mb-3"><i className="fa fa-check text-primary mr-2" />La mejor calidad en nuestras comidas</h5>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="container mx-auto pt-5">
        <div className="relative text-center py-[115px] pb-[35px]">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[2px] h-[100px] bg-[#DA9F5B]" />
        </div>
        <h1 className="text-4xl font-bold text-center font-serif my-4 shadow-md">Porque venir a Mila</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
          <div className="border border-[#DA9F5B] shadow-lg rounded-lg p-5">
            <i className="fa fa-gift text-4xl text-[#DA9F5B] mb-4" />
            <h3 className="text-xl font-bold mb-3">Gran Experiencia</h3>
            <p>Venir a Mila te garantiza una experiencia culinaria inigualable, con un ambiente acogedor y un servicio de primer nivel.</p>
          </div>
          <div className="border border-[#DA9F5B] shadow-lg rounded-lg p-5">
            <i className="fa fa-star text-4xl text-[#DA9F5B] mb-4" />
            <h3 className="text-xl font-bold mb-3">Calidad en el Servicio</h3>
            <p>Ofrecemos un servicio excepcional, cuidando cada detalle para que tu visita sea memorable.</p>
          </div>
          <div className="border border-[#DA9F5B] shadow-lg rounded-lg p-5">
            <i className="fa fa-cocktail text-4xl text-[#DA9F5B] mb-4" />
            <h3 className="text-xl font-bold mb-3">Menú Variado</h3>
            <p>Descubre nuestra oferta gastronómica variada y deliciosa, diseñada para satisfacer todos los gustos.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Index;
