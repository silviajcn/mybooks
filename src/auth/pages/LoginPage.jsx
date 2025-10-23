import React from "react";

export const LoginPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#EFE6DD]">
      <div className="flex flex-col md:flex-row w-full max-w-3xl gap-8 p-6">
        {/* Formulario de inicio de sesión */}
        <div className="flex-1 bg-white rounded-[10px] shadow-md flex flex-col justify-center px-8 py-10">
          <h3 className="text-center text-gray-800 text-2xl font-bold mb-8 tracking-tight">
            Iniciar Sesión
          </h3>
          <form className="flex flex-col gap-6">
            <input
              type="text"
              placeholder="Usuario"
              className="border border-[#EFE6DD] rounded-[8px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EFE6DD] text-gray-800 bg-[#f7f7f7]"
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="border border-[#EFE6DD] rounded-[8px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EFE6DD] text-gray-800 bg-[#f7f7f7]"
            />
            <button
              type="submit"
              className="w-full rounded-[8px] py-3 bg-[#0062cc] text-white font-bold text-lg shadow hover:bg-blue-700 transition cursor-pointer"
            >
              Entrar
            </button>
            <a
              href="#"
              className="text-[#0062cc] font-semibold no-underline text-center mt-2 hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </form>
        </div>

        {/* Formulario de registro */}
        <div className="flex-1 bg-white rounded-[10px] shadow-md flex flex-col justify-center px-8 py-10">
          <h3 className="text-center text-gray-800 text-2xl font-bold mb-8 tracking-tight">
            Registrarse
          </h3>
          <form className="flex flex-col gap-6">
            <input
              type="text"
              placeholder="Usuario"
              className="border border-[#EFE6DD] rounded-[8px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EFE6DD] text-gray-800 bg-[#f7f7f7]"
            />
            <input
              type="email"
              placeholder="Correo"
              className="border border-[#EFE6DD] rounded-[8px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EFE6DD] text-gray-800 bg-[#f7f7f7]"
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="border border-[#EFE6DD] rounded-[8px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EFE6DD] text-gray-800 bg-[#f7f7f7]"
            />
            <input
              type="password"
              placeholder="Repita la contraseña"
              className="border border-[#EFE6DD] rounded-[8px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EFE6DD] text-gray-800 bg-[#f7f7f7]"
            />
            <button
              type="submit"
              className="w-full rounded-[8px] py-3 bg-[#EFE6DD] text-[#0062cc] font-bold text-lg shadow hover:bg-[#e2d6c2] transition cursor-pointer"
            >
              Registrarse
            </button>
            <a
              href="#"
              className="text-[#0062cc] font-semibold no-underline text-center mt-2 hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};