import React, { useState, useEffect } from "react";

interface Tarea {
  id: number;
  texto: string;
  completada: boolean;
}

const App: React.FC = () => {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [texto, setTexto] = useState("");

  useEffect(() => {
    const guardadas = localStorage.getItem("tareas");
    if (guardadas) {
      setTareas(JSON.parse(guardadas));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas]);

  const agregarTarea = () => {
    if (texto.trim() === "") return;
    const nueva: Tarea = { id: Date.now(), texto, completada: false };
    setTareas([...tareas, nueva]);
    setTexto("");
  };

  const alternarTarea = (id: number) => {
    setTareas(
      tareas.map((t) =>
        t.id === id ? { ...t, completada: !t.completada } : t
      )
    );
  };

  const eliminarTarea = (id: number) => {
    setTareas(tareas.filter((t) => t.id !== id));
  };

  return (
    <div className="container">
      <h1>📚 Mi Agenda Escolar</h1>
      <div className="input-group">
        <input
          type="text"
          placeholder="Agregar tarea..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <button onClick={agregarTarea}>Agregar</button>
      </div>

      <ul>
        {tareas.map((t) => (
          <li key={t.id} className={t.completada ? "completada" : ""}>
            <span onClick={() => alternarTarea(t.id)}>{t.texto}</span>
            <button className="delete" onClick={() => eliminarTarea(t.id)}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
