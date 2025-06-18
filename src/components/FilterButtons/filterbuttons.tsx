'use client';
import './filterbuttons.css';
import '../../app/ui/fonts';

export default function FilterButtons() {
  // ✅ Función de toggle definida dentro del componente
  const toggleClase = (e: React.MouseEvent<HTMLButtonElement>) => {
    const boton = e.currentTarget;
    const toggle = boton.querySelector('.toggle');
    toggle?.classList.toggle('activo');
  };

  return (
    <div className="filtro-contenedor ${cactus.className} antialiased">
      <button className="filtro-boton" onClick={toggleClase}>
        Departamentos
        <span className="toggle">
          <span className="toggle-circulo"></span>
        </span>
      </button>

      <button className="filtro-boton" onClick={toggleClase}>
        Lotes
        <span className="toggle">
          <span className="toggle-circulo"></span>
        </span>
      </button>

      <button className="filtro-boton" onClick={toggleClase}>
        Campos
        <span className="toggle">
          <span className="toggle-circulo"></span>
        </span>
      </button>

      <button className="filtro-boton" onClick={toggleClase}>
        Casas
        <span className="toggle">
          <span className="toggle-circulo"></span>
        </span>
      </button>

      <button className="filtro-boton" onClick={toggleClase}>
        Locales
        <span className="toggle">
          <span className="toggle-circulo"></span>
        </span>
      </button>
    </div>
  );
}

