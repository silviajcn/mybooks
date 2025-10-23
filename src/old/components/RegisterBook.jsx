import React, { useState } from 'react';

const initialState = {
  ISBN: '',
  title: '',
  subtitle: '',
  author: '',
  editorial: '',
  nroPages: 0,
  initialDate: '',
  endDate: '',
  cover: '',
  genre: '',
  publicationDate: '',
  format: '',
  origin: '',
  review: '',
  status: 'Por leer',
  bookScore: 0,
  numberReading: 1,
};

export const RegisterBook = () => {
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'nroPages' || name === 'bookScore' || name === 'numberReading'
        ? Number(value)
        : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Libro registrado:\n' + JSON.stringify(form, null, 2));
    setForm(initialState);
  };

  return (
    <div className="w-full bg-white rounded-[10px] shadow-md flex flex-col justify-center px-6 py-8 md:px-10 md:py-12 lg:max-w-xl xl:max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center tracking-tight">Registrar nuevo libro</h2>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1 text-gray-700">ISBN</label>
            <input type="text" name="ISBN" value={form.ISBN} onChange={handleChange} className="w-full border border-[#EFE6DD] rounded-[8px] px-4 py-3 bg-[#f7f7f7] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#EFE6DD]" required />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1 text-gray-700">Título</label>
            <input type="text" name="title" value={form.title} onChange={handleChange} className="w-full border border-[#EFE6DD] rounded-[8px] px-4 py-3 bg-[#f7f7f7] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#EFE6DD]" required />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Subtítulo</label>
          <input type="text" name="subtitle" value={form.subtitle} onChange={handleChange} className="w-full border border-[#EFE6DD] rounded-[8px] px-4 py-3 bg-[#f7f7f7] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#EFE6DD]" />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1 text-gray-700">Autor</label>
            <input type="text" name="author" value={form.author} onChange={handleChange} className="w-full border border-[#EFE6DD] rounded-[8px] px-4 py-3 bg-[#f7f7f7] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#EFE6DD]" required />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1 text-gray-700">Editorial</label>
            <input type="text" name="editorial" value={form.editorial} onChange={handleChange} className="w-full border border-[#EFE6DD] rounded-[8px] px-4 py-3 bg-[#f7f7f7] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#EFE6DD]" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1 text-gray-700">Nro. de páginas</label>
            <input type="number" name="nroPages" value={form.nroPages} onChange={handleChange} className="w-full border border-[#EFE6DD] rounded-[8px] px-4 py-3 bg-[#f7f7f7] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#EFE6DD]" min={1} />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1 text-gray-700">Fecha inicio</label>
            <input type="date" name="initialDate" value={form.initialDate} onChange={handleChange} className="w-full border border-[#EFE6DD] rounded-[8px] px-4 py-3 bg-[#f7f7f7] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#EFE6DD]" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1 text-gray-700">Fecha fin</label>
            <input type="date" name="endDate" value={form.endDate} onChange={handleChange} className="w-full border border-[#EFE6DD] rounded-[8px] px-4 py-3 bg-[#f7f7f7] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#EFE6DD]" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">URL de portada</label>
          <input type="text" name="cover" value={form.cover} onChange={handleChange} className="w-full border border-[#EFE6DD] rounded-[8px] px-4 py-3 bg-[#f7f7f7] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#EFE6DD]" />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1 text-gray-700">Género</label>
            <select name="genre" value={form.genre} onChange={handleChange} className="w-full border border-[#EFE6DD] rounded-[8px] px-4 py-3 bg-[#f7f7f7] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#EFE6DD] cursor-pointer">
              <option value="">Selecciona</option>
              <option value="Novela">Novela</option>
              <option value="Poesía">Poesía</option>
              <option value="Diarios">Diarios</option>
              <option value="Cuentos">Cuentos</option>
              <option value="Ensayo">Ensayo</option>
              <option value="Filosofía">Filosofía</option>
              <option value="Autoayuda">Autoayuda</option>
              <option value="Cómic">Cómic</option>
              <option value="Teatro">Teatro</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1 text-gray-700">Año publicación</label>
            <select
              name="publicationDate"
              value={form.publicationDate}
              onChange={handleChange}
              className="w-full border border-[#EFE6DD] rounded-[8px] px-4 py-3 bg-[#f7f7f7] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#EFE6DD] cursor-pointer"
            >
              <option value="">Selecciona año</option>
              {Array.from({ length: 120 }, (_, i) => {
                const year = new Date().getFullYear() - i;
                return (
                  <option key={year} value={year}>{year}</option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1 text-gray-700">Formato</label>
            <select name="format" value={form.format} onChange={handleChange} className="w-full border border-[#EFE6DD] rounded-[8px] px-4 py-3 bg-[#f7f7f7] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#EFE6DD] cursor-pointer">
              <option value="">Selecciona</option>
              <option value="Físico">Físico</option>
              <option value="Digital">Digital</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1 text-gray-700">Origen</label>
            <select name="origin" value={form.origin} onChange={handleChange} className="w-full border border-[#EFE6DD] rounded-[8px] px-4 py-3 bg-[#f7f7f7] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#EFE6DD] cursor-pointer">
              <option value="">Selecciona</option>
              <option value="Compra">Compra</option>
              <option value="Regalo">Regalo</option>
              <option value="Intercambio">Intercambio</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Reseña</label>
          <textarea name="review" value={form.review} onChange={handleChange} className="w-full border border-[#EFE6DD] rounded-[8px] px-4 py-3 bg-[#f7f7f7] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#EFE6DD]" rows={3} />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1 text-gray-700">Estado</label>
            <select name="status" value={form.status} onChange={handleChange} className="w-full border border-[#EFE6DD] rounded-[8px] px-4 py-3 bg-[#f7f7f7] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#EFE6DD] cursor-pointer">
              <option value="Por leer">Por leer</option>
              <option value="Leyendo">Leyendo</option>
              <option value="Leído">Leído</option>
              <option value="Abandonado">Abandonado</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1 text-gray-700">Puntaje</label>
            <input type="number" name="bookScore" value={form.bookScore} onChange={handleChange} className="w-full border border-[#EFE6DD] rounded-[8px] px-4 py-3 bg-[#f7f7f7] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#EFE6DD]" min={0} max={10} />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1 text-gray-700"># Lecturas</label>
            <input type="number" name="numberReading" value={form.numberReading} onChange={handleChange} className="w-full border border-[#EFE6DD] rounded-[8px] px-4 py-3 bg-[#f7f7f7] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#EFE6DD]" min={1} />
          </div>
        </div>
        <button type="submit" className="w-full bg-[#0062cc] text-white py-3 rounded-[8px] font-bold text-lg shadow hover:bg-blue-700 transition cursor-pointer">
          Registrar libro
        </button>
      </form>
    </div>
  );
};