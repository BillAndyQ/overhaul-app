"use client"
import { useState, useEffect } from "react";

export default function MultiselectCell({allData = [], dataSelect=[], onChange}) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  
  useEffect(() => {
    if (Array.isArray(dataSelect)) {
      const initial = dataSelect.filter(Boolean);
      setSelectedOptions(initial);
    } else {
      setSelectedOptions([]);
    }
  }, [dataSelect]);


  // Filtrar los que aún no han sido seleccionados
  const availableOptions = allData.filter(item => !selectedOptions.includes(item));

  const [contextMenu, setContextMenu] = useState(null); // { x, y, index }

  const handleContextMenu = (event, index) => {
    event.preventDefault(); // Evita el menú nativo
    setContextMenu({
      x: event.pageX,
      y: event.pageY,
      index,
    });
  };

  const handleDelete = () => {
  if (contextMenu) {
    const newOptions = [...selectedOptions];
    newOptions.splice(contextMenu.index, 1);
    setSelectedOptions(newOptions);
    if (onChange) onChange(newOptions);
    setContextMenu(null);
  }
};


  // Cerrar menú contextual al hacer clic fuera
  useEffect(() => {
    const closeMenu = () => setContextMenu(null);
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

  const handleSelect = (e) => {
    const value = e.target.value;
    if (value) {
      const updated = [...selectedOptions, value];
      setSelectedOptions(updated);
      if (onChange) onChange(updated); // ✅ envía el array completo
    }
    e.target.value = "";
  };
  
  return (
    <>
      <style jsx>{`
        .internal-border > div:not(:first-child) {
          border-left: 1px solid #ccc;
        }
        .custom-select-no-arrow {
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
        }
      `}</style>

      <div className="d-flex">
        <div className="position-relative internal-border d-flex min-h-screen">
          {/* lista */}
          {selectedOptions.map((item, index) => (
            <div
              key={index}
              className="px-2 cursor-pointer"
              onContextMenu={(e) => handleContextMenu(e, index)}
            >
              {item}
            </div>
          ))}

          {/* menú contextual */}
          {contextMenu && (
            <div
              className="position-fixed z-3 bg-white shadow-sm text-xs"
              style={{ top: contextMenu.y, left: contextMenu.x }}
            >
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={handleDelete}
              >
                Eliminar
              </button>
            </div>
          )}
        </div>


        {availableOptions.length > 0 && (
          <div className="text-xs">
            <select
              className="border-0 bg-light text-center border-end border-start rounded-0 p-0 m-0 custom-select-no-arrow text-xs cursor-pointer w-5"
              onChange={handleSelect}
              defaultValue=""
            >
              <option value="" disabled hidden>+</option>
              {availableOptions.map((item, i) => (
                <option key={i} value={item} className="bg-white text-black">
                  {item}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </>
  );
}
