import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import {
  genresOptions,
  publicationYears,
  formatOptions,
  originOptions,
  statusOptions,
  placeOriginOptions
} from '../../data/options';
import { useLibraryStore } from '../../hooks';
import { createSlug, toISODate } from "../../helpers";

const initialState = {
  ISBN: "",
  title: "",
  subtitle: "",
  author: "",
  editorial: "",
  nroPages: 0,
  pagesRead: 0,
  initialDate: "",
  endDate: "",
  cover: "",
  genre: "",
  publicationDate: "",
  format: "",
  origin: "",
  originPlace: "",
  review: "",
  status: "",
  bookScore: 0,
  numberReading: 0,
};

export const RegisterBook = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isImageError, setIsImageError] = useState(false); // Para manejar errores de carga de imagen
  const { activeBook, startSavingBook, hasBookSelected } =
    useLibraryStore();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState(initialState);

  useEffect(() => {
    if (activeBook !== null) {
      const normalizeSelect = (val, options) => {
        if (!val) return "";
        const found = options.find(
          (o) =>
            String(o.option) === String(val) || String(o.value) === String(val)
        );
        return found ? found.option : val;
      };

      setFormValues({
        ...initialState,
        ...activeBook,
        // Normalizar selects para que coincidan con los value/option de los <select>
        genre: normalizeSelect(activeBook.genre, genresOptions),
        publicationDate: normalizeSelect(
          activeBook.publicationDate,
          publicationYears
        ),
        format: normalizeSelect(activeBook.format, formatOptions),
        origin: normalizeSelect(activeBook.origin, originOptions),
        originPlace: normalizeSelect(
          activeBook.originPlace,
          placeOriginOptions
        ),
        status: normalizeSelect(activeBook.status, statusOptions),
        // Formatear fechas para inputs type="date"
        initialDate: toISODate(activeBook.initialDate),
        endDate: toISODate(activeBook.endDate),
      });
    } else {
      setFormValues(initialState);
    }
  }, [activeBook]);

  const titleClass = useMemo(() => {
    if (!formSubmitted) return "";

    return formValues.title.length > 0 ? "" : "El título es obligatorio.";
  }, [formValues.title, formSubmitted]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Si el campo cambiado es la portada, restablecer el estado de error de la imagen
    if (name === "cover") {
      setIsImageError(false);
    }

    setFormValues((prev) => ({
      ...prev,
      [name]:
        name === "nroPages" || name === "bookScore" || name === "numberReading" || name === "pagesRead"
          ? Number(value)
          : value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Validación: el título es obligatorio
    if (!formValues.title || formValues.title.trim() === "") {
      alert("El título es obligatorio.");
      return;
    }

    // Validación de fechas
    if (formValues.initialDate && formValues.endDate) {
      const initial = new Date(formValues.initialDate);
      const end = new Date(formValues.endDate);

      if (end < initial) {
        Swal.fire(
          "Error en fechas",
          "La fecha de fin no puede ser menor a la fecha de inicio.",
          "error"
        );

        return;
      }
    }

    // Antes de guardar, mapear los valores "option" (clave) a su label "value"
    // para que el objeto guardado tenga los textos legibles que usa BookDetails.
    const mapOptionToValue = (options, opt) => {
      if (!opt) return opt;
      const found = options.find(
        (o) =>
          String(o.option) === String(opt) || String(o.value) === String(opt)
      );
      return found ? found.value : opt;
    };

    const payload = {
      ...formValues,
      genre: mapOptionToValue(genresOptions, formValues.genre),
      publicationDate: mapOptionToValue(
        publicationYears,
        formValues.publicationDate
      ),
      format: mapOptionToValue(formatOptions, formValues.format),
      origin: mapOptionToValue(originOptions, formValues.origin),
      originPlace: mapOptionToValue(placeOriginOptions, formValues.originPlace),
      status: mapOptionToValue(statusOptions, formValues.status),
    };

    console.log("Guardando libro (payload):", payload);

    // Reiniciar el formulario
    setFormValues(initialState);
    await startSavingBook(payload);
    setFormSubmitted(false);

    if (activeBook !== null) {
      const bookSlug = createSlug(activeBook.title);
      navigate(`/${bookSlug}/${activeBook._id}`);

      Swal.fire({
        title: "¡Edición exitosa!",
        text: `El libro "${formValues.title}" ha sido guardado correctamente.`,
        icon: "success",
        timer: 1600,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        title: "¡Registro exitoso!",
        text: `El libro "${formValues.title}" ha sido registrado correctamente.`,
        icon: "success",
        timer: 1600,
        showConfirmButton: false,
      });
      navigate(`/`);
    }
  };

  // Lógica para mostrar la imagen o el placeholder
  const imageUrl = formValues.cover.trim();
  const showImage = imageUrl && !isImageError;

  return (
    <div className="relative font-['Inter']">
      <div className="w-full bg-white rounded-[10px] shadow-lg flex flex-col justify-center px-4 py-6 md:px-8 md:py-10 lg:px-12 lg:py-12 mx-auto">
        <h2 className="text-3xl font-extrabold mb-8 text-gray-800 text-center tracking-tight">
          Registrar nuevo libro
        </h2>
        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
          {/* === SECCIÓN 1: DATOS DEL LIBRO + PREVISUALIZACIÓN === */}
          <fieldset className="p-6 border border-blue-200/50 rounded-xl shadow-md bg-white">
            <legend className="text-xl font-bold px-3 py-1 text-gray-700 bg-white border border-blue-200/50 rounded-lg -ml-3 shadow-sm">
              Datos del libro
            </legend>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Columna 1: Form Inputs (Aprox 70%) */}
              <div className="flex-1 lg:w-3/4 space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      ISBN
                    </label>
                    <input
                      type="text"
                      name="ISBN"
                      value={formValues.ISBN}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-[8px] px-4 py-3 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Título
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formValues.title}
                      onChange={handleChange}
                      className={`w-full border rounded-[8px] px-4 py-3 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 transition duration-150 ${
                        titleClass
                          ? "border-red-500 focus:ring-red-200"
                          : "border-gray-300 focus:ring-blue-500"
                      }`}
                      required
                    />
                    {titleClass && (
                      <span className="text-red-600 text-sm mt-1 block font-medium">
                        {titleClass}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Subtítulo
                  </label>
                  <input
                    type="text"
                    name="subtitle"
                    value={formValues.subtitle}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-[8px] px-4 py-3 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Autor
                    </label>
                    <input
                      type="text"
                      name="author"
                      value={formValues.author}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-[8px] px-4 py-3 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Editorial
                    </label>
                    <input
                      type="text"
                      name="editorial"
                      value={formValues.editorial}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-[8px] px-4 py-3 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Género
                    </label>
                    <select
                      id="genre"
                      name="genre"
                      value={formValues.genre}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-[8px] px-4 py-3 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer appearance-none transition duration-150"
                    >
                      <option value="">Selecciona</option>
                      {genresOptions.map((genre) => (
                        <option key={genre.id} value={genre.option}>
                          {genre.value}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Año publicación
                    </label>
                    <select
                      name="publicationDate"
                      value={formValues.publicationDate}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-[8px] px-4 py-3 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer appearance-none transition duration-150"
                    >
                      <option value="">Selecciona año</option>
                      {publicationYears.map((year) => (
                        <option key={year.id} value={year.option}>
                          {year.value}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Nro. de páginas
                    </label>
                    <input
                      type="number"
                      name="nroPages"
                      value={formValues.nroPages}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-[8px] px-4 py-3 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                      min={1}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      URL de portada
                    </label>
                    <input
                      type="url"
                      name="cover"
                      value={formValues.cover}
                      onChange={handleChange}
                      placeholder="Ej: http://ejemplo.com/portada.jpg"
                      className="w-full border border-gray-300 rounded-[8px] px-4 py-3 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                    />
                  </div>
                </div>
              </div>

              {/* Columna 2: Cover Preview (Aprox 30%) */}
              <div className="lg:w-1/4 flex justify-center items-center">
                <div className="w-full max-w-[150px] lg:max-w-none lg:w-[150px] aspect-[2/3] bg-gray-100 border border-gray-300 rounded-lg shadow-lg overflow-hidden flex items-center justify-center">
                  {showImage ? (
                    <img
                      src={formValues.cover}
                      alt={`Portada de ${formValues.title}`}
                      className="w-full h-full object-cover"
                      onError={() => setIsImageError(true)}
                    />
                  ) : (
                    <div className="text-center p-3 text-gray-500 text-sm font-semibold">
                      {isImageError
                        ? "❌ Error al cargar imagen"
                        : "Vista previa"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </fieldset>

          {/* === SECCIÓN 2: DATOS DE LECTURA === */}
          <fieldset className="p-6 border border-green-300/50 rounded-xl shadow-md bg-white">
            <legend className="text-xl font-bold px-3 py-1 text-gray-700 bg-white border border-green-300/50 rounded-lg -ml-3 shadow-sm">
              Datos de lectura
            </legend>

            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Estado
                </label>
                <select
                  name="status"
                  value={formValues.status}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-[8px] px-4 py-3 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer appearance-none transition duration-150"
                >
                  <option value="">Selecciona</option>
                  {statusOptions.map((status) => (
                    <option key={status.id} value={status.option}>
                      {status.value}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Puntaje (0-5)
                </label>
                <input
                  type="number"
                  name="bookScore"
                  value={formValues.bookScore}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-[8px] px-4 py-3 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150"
                  min={0}
                  max={5}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  # Lecturas
                </label>
                <input
                  type="number"
                  name="numberReading"
                  value={formValues.numberReading}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-[8px] px-4 py-3 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150"
                  min={0}
                  max={5}
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Fecha inicio
                </label>
                <input
                  type="date"
                  name="initialDate"
                  value={formValues.initialDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-[8px] px-4 py-3 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer transition duration-150"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Fecha fin
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formValues.endDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-[8px] px-4 py-3 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer transition duration-150"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Formato
                </label>
                <select
                  name="format"
                  value={formValues.format}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-[8px] px-4 py-3 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer appearance-none transition duration-150"
                >
                  <option value="">Selecciona</option>
                  {formatOptions.map((format) => (
                    <option key={format.id} value={format.option}>
                      {format.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Actualizar progreso (páginas leídas)
                </label>
                <input
                  type="number"
                  name="pagesRead"
                  value={formValues.pagesRead}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-[8px] px-4 py-3 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150"
                  min={0}
                  max={formValues.nroPages}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Origen
                </label>
                <select
                  name="origin"
                  value={formValues.origin}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-[8px] px-4 py-3 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer appearance-none transition duration-150"
                >
                  <option value="">Selecciona</option>
                  {originOptions.map((origin) => (
                    <option key={origin.id} value={origin.option}>
                      {origin.value}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Lugar o persona de origen
                </label>
                <select
                  name="originPlace"
                  value={formValues.originPlace}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-[8px] px-4 py-3 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer appearance-none transition duration-150"
                >
                  <option value="">Selecciona</option>
                  {placeOriginOptions.map((place) => (
                    <option key={place.id} value={place.option}>
                      {place.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Reseña
              </label>
              <textarea
                name="review"
                value={formValues.review}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-[8px] px-4 py-3 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150"
                rows={3}
              />
            </div>
          </fieldset>

          <button
            type="submit"
            style={{
              display: hasBookSelected ? "" : "none",
            }}
            className="w-full bg-[#EFE6DD] text-[1rem] text-gray-800 font-bold py-3 rounded-[8px] text-lg shadow-xl hover:bg-[#e6d5c5] transition duration-200 cursor-pointer disabled:bg-gray-400 transform hover:scale-[1.01] active:scale-[0.99]"
          >
            Guardar libro
          </button>

          <button
            type="submit"
            style={{
              display: !hasBookSelected ? "" : "none",
            }}
            className="w-full bg-[#EFE6DD] text-[1rem] text-gray-800 font-bold py-3 rounded-[8px] text-lg shadow-xl hover:bg-[#e6d5c5] transition duration-200 cursor-pointer disabled:bg-gray-400 transform hover:scale-[1.01] active:scale-[0.99]"
          >
            Registrar libro
          </button>
        </form>
      </div>
    </div>
  );
};