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
import { authorsOptions } from "../../data/authors";
import { editorialsOptions } from '../../data/editorials';
import { useLibraryStore } from '../../hooks';
import {
  createSlug,
  toLocalDateFormat,
  getCurrentDateFormatted,
} from "../../helpers";
import { AutorSelect } from './AutorSelect';

const CUSTOM_OPTIONS_STORAGE_KEY = 'mybooks.customCatalogs.v1';

const normalizeCatalogLabel = (value) =>
  String(value ?? '')
    .trim()
    .toLowerCase();

const mergeCatalogItems = (defaults = [], customItems = []) => {
  const merged = [...defaults, ...(Array.isArray(customItems) ? customItems : [])];

  return merged.filter((item, index, list) => {
    const itemLabel = normalizeCatalogLabel(
      item.author ?? item.editorial ?? item.value ?? item.option
    );

    return (
      list.findIndex((entry) => {
        const entryLabel = normalizeCatalogLabel(
          entry.author ?? entry.editorial ?? entry.value ?? entry.option
        );

        return entryLabel === itemLabel;
      }) === index
    );
  });
};

const buildCatalogState = () => {
  const defaults = {
    authors: authorsOptions,
    editorials: editorialsOptions,
    genres: genresOptions,
    origins: originOptions,
    places: placeOriginOptions,
  };

  if (typeof window === 'undefined') {
    return defaults;
  }

  try {
    const storedCatalogs = JSON.parse(
      window.localStorage.getItem(CUSTOM_OPTIONS_STORAGE_KEY) ?? '{}'
    );

    return {
      authors: mergeCatalogItems(defaults.authors, storedCatalogs.authors),
      editorials: mergeCatalogItems(
        defaults.editorials,
        storedCatalogs.editorials
      ),
      genres: mergeCatalogItems(defaults.genres, storedCatalogs.genres),
      origins: mergeCatalogItems(defaults.origins, storedCatalogs.origins),
      places: mergeCatalogItems(defaults.places, storedCatalogs.places),
    };
  } catch {
    return defaults;
  }
};

const createCustomCatalogItem = (field, value) => {
  const cleanValue = String(value ?? '').trim();

  if (!cleanValue) {
    return null;
  }

  const id = Date.now() + Math.floor(Math.random() * 1000);

  if (field === 'authors') {
    return {
      id,
      author: cleanValue,
      nationality: '',
      gender: '',
      authorPhoto: '',
    };
  }

  if (field === 'editorials') {
    return {
      id,
      editorial: cleanValue,
      logo: '',
    };
  }

  return {
    id,
    option: createSlug(cleanValue),
    value: cleanValue,
  };
};

const initialState = {
  ISBN: "",
  title: "",
  subtitle: "",
  author: [],
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
  const [dynamicCatalogs, setDynamicCatalogs] = useState(buildCatalogState);
  const [customOptionInputs, setCustomOptionInputs] = useState({
    editorial: '',
    genre: '',
    origin: '',
    originPlace: '',
  });
  const { activeBook, startSavingBook, hasBookSelected } =
    useLibraryStore();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState(initialState);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(
        CUSTOM_OPTIONS_STORAGE_KEY,
        JSON.stringify(dynamicCatalogs)
      );
    }
  }, [dynamicCatalogs]);

  useEffect(() => {
    if (activeBook !== null) {
      const normalizeSelect = (val, options) => {
        if (!val) return "";
        const found = options.find(
          (o) =>
            String(o.option) === String(val) ||
            String(o.value) === String(val) ||
            String(o.author) === String(val) ||
            String(o.editorial) === String(val)
        );
        if (!found) return val;
        return (
          found.option ?? found.value ?? found.author ?? found.editorial ?? val
        );
      };

      // Lógica para normalizar la propiedad 'author' a un array de claves.
      const authorVal = activeBook.author;
      const authorsArray = Array.isArray(authorVal)
        ? authorVal
        : authorVal
        ? [authorVal]
        : []; // Mapeamos cada autor para asegurarnos de que el valor cargado sea la clave/opción.
      const normalizedAuthors = authorsArray.map((auth) =>
        normalizeSelect(auth, dynamicCatalogs.authors)
      );

      setFormValues({
        ...initialState,
        ...activeBook,
        genre: normalizeSelect(activeBook.genre, dynamicCatalogs.genres),
        publicationDate: normalizeSelect(
          activeBook.publicationDate,
          publicationYears
        ),
        format: normalizeSelect(activeBook.format, formatOptions),
        origin: normalizeSelect(activeBook.origin, dynamicCatalogs.origins),
        originPlace: normalizeSelect(
          activeBook.originPlace,
          dynamicCatalogs.places
        ),
        author: normalizedAuthors,
        editorial: normalizeSelect(activeBook.editorial, dynamicCatalogs.editorials),
        status: normalizeSelect(activeBook.status, statusOptions),
        initialDate: toLocalDateFormat(activeBook.initialDate),
        endDate: toLocalDateFormat(activeBook.endDate),
      });
    } else {
      setFormValues(initialState);
    }
  }, [activeBook]);

  const titleClass = useMemo(() => {
    if (!formSubmitted) return "";

    return formValues.title.length > 0 ? "" : "El título es obligatorio.";
  }, [formValues.title, formSubmitted]);

  const addCustomOption = (field, rawValue) => {
    const cleanValue = String(rawValue ?? '').trim();

    if (!cleanValue) {
      return;
    }

    const item = createCustomCatalogItem(field, cleanValue);

    if (!item) {
      return;
    }

    setDynamicCatalogs((prevCatalogs) => {
      const nextList = mergeCatalogItems(prevCatalogs[field] ?? [], [item]);

      return {
        ...prevCatalogs,
        [field]: nextList,
      };
    });

    if (field === 'editorials') {
      setFormValues((prev) => ({
        ...prev,
        editorial: item.editorial,
      }));
    }

    if (field === 'genres') {
      setFormValues((prev) => ({
        ...prev,
        genre: item.option,
      }));
    }

    if (field === 'origins') {
      setFormValues((prev) => ({
        ...prev,
        origin: item.option,
      }));
    }

    if (field === 'places') {
      setFormValues((prev) => ({
        ...prev,
        originPlace: item.option,
      }));
    }

    setCustomOptionInputs((prev) => ({
      ...prev,
      [field === 'editorials' ? 'editorial' : field === 'genres' ? 'genre' : field === 'origins' ? 'origin' : 'originPlace']: '',
    }));
  };

  const handleChange = (e) => {
    const { name } = e.target;
    let value = e.target.value; // El valor puede ser un string (input, select) o un array (desde AutorSelect)
    let updates = {}; // Manejo especial para el campo 'author' que viene como array de strings

    if (name === 'author') {
      const selectedAuthors = Array.isArray(value) ? value : [];
      const newAuthors = selectedAuthors.filter(
        (author) =>
          !dynamicCatalogs.authors.some((entry) => entry.author === author)
      );

      if (newAuthors.length > 0) {
        setDynamicCatalogs((prevCatalogs) => ({
          ...prevCatalogs,
          authors: mergeCatalogItems(
            prevCatalogs.authors,
            newAuthors.map((author) => createCustomCatalogItem('authors', author))
          ),
        }));
      }

      updates[name] = selectedAuthors;
    } else {
      let rawValue = value; // Si el campo cambiado es la portada, restablecer el estado de error de la imagen

      if (name === "cover") {
        setIsImageError(false);
      } // Conversión a número para campos numéricos

      if (
        name === "nroPages" ||
        name === "bookScore" ||
        name === "numberReading" ||
        name === "pagesRead"
      ) {
        rawValue = Number(value);
      }

      updates[name] = rawValue; // Lógica de estados/páginas (tu lógica original)

      if (name === "status") {
        if (value === "leido") {
          updates.pagesRead = formValues.nroPages;
          if (
            formValues.status === "leyendo" ||
            formValues.status === "Leyendo"
          ) {
            updates.endDate = getCurrentDateFormatted();
          }
        } else if (formValues.status === "leido" && value !== "leido") {
          updates.endDate = "";
          updates.pagesRead = 0; // Se ajustó a 0 si ya no está 'leido'
        }
      }

      if (name === "nroPages" && formValues.status === "leido") {
        updates.pagesRead = rawValue;
      }
    }
    setFormValues((prev) => ({
      ...prev,
      ...updates,
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
          String(o.option) === String(opt) ||
          String(o.value) === String(opt) ||
          String(o.author) === String(opt) ||
          String(o.editorial) === String(opt)
      );
      if (!found) return opt;
      // retornar la etiqueta legible que usa BookDetails
      return (
        found.value ?? found.author ?? found.editorial ?? found.option ?? opt
      );
    };

    const mapMultipleOptionsToValue = (options, optArray) => {
      if (!Array.isArray(optArray) || optArray.length === 0) return [];

      return optArray.map((opt) => {
        // Utilizamos la misma lógica de mapOptionToValue para cada elemento
        const found = options.find(
          (o) =>
            String(o.option) === String(opt) ||
            String(o.value) === String(opt) ||
            String(o.author) === String(opt) ||
            String(o.editorial) === String(opt)
        );
        if (!found) return opt; // retornar la etiqueta legible
        return (
          found.value ?? found.author ?? found.editorial ?? found.option ?? opt
        );
      });
    };

    const payload = {
      ...formValues,
      genre: mapOptionToValue(dynamicCatalogs.genres, formValues.genre),
      publicationDate: mapOptionToValue(
        publicationYears,
        formValues.publicationDate
      ),
      format: mapOptionToValue(formatOptions, formValues.format),
      origin: mapOptionToValue(dynamicCatalogs.origins, formValues.origin),
      originPlace: mapOptionToValue(dynamicCatalogs.places, formValues.originPlace),
      status: mapOptionToValue(statusOptions, formValues.status),
      author: mapMultipleOptionsToValue(dynamicCatalogs.authors, formValues.author),
      editorial: mapOptionToValue(dynamicCatalogs.editorials, formValues.editorial),
    };

    if (formValues.status === "leido" || payload.status === "Leído") {
      payload.pagesRead = formValues.nroPages;
    }

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
                  {/* ISBN */}
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

                  {/* Título */}
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

                {/* Subtítulo */}
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
                  {/* Autor (Usando react-select) */}{" "}
                  <div className="flex-1">
                    {" "}
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                       Autor(es) {" "}
                    </label>
                    {" "}
                    <AutorSelect
                      name="author"
                      value={formValues.author}
                      options={dynamicCatalogs.authors}
                      onChange={handleChange} // Usamos la función handleChange
                    />
                    {" "}
                  </div>
                  {/* Editorial */}
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Editorial
                    </label>
                    <select
                      id="editorial"
                      name="editorial"
                      value={formValues.editorial}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-[8px] px-4 py-3 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer appearance-none transition duration-150"
                    >
                      <option value="">Selecciona</option>
                      {dynamicCatalogs.editorials.map((editorial) => (
                        <option key={editorial.id} value={editorial.editorial}>
                          {editorial.editorial}
                        </option>
                      ))}
                    </select>
                    <div className="mt-2 flex gap-2">
                      <input
                        type="text"
                        value={customOptionInputs.editorial}
                        onChange={(e) =>
                          setCustomOptionInputs((prev) => ({
                            ...prev,
                            editorial: e.target.value,
                          }))
                        }
                        placeholder="Agregar editorial"
                        className="flex-1 border border-gray-300 rounded-[8px] px-3 py-2 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                      />
                      <button
                        type="button"
                        onClick={() => addCustomOption('editorials', customOptionInputs.editorial)}
                        className="px-3 py-2 rounded-[8px] bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 transition duration-150"
                      >
                        Agregar
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Género */}
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
                      {dynamicCatalogs.genres.map((genre) => (
                        <option key={genre.id} value={genre.option}>
                          {genre.value}
                        </option>
                      ))}
                    </select>
                    <div className="mt-2 flex gap-2">
                      <input
                        type="text"
                        value={customOptionInputs.genre}
                        onChange={(e) =>
                          setCustomOptionInputs((prev) => ({
                            ...prev,
                            genre: e.target.value,
                          }))
                        }
                        placeholder="Agregar género"
                        className="flex-1 border border-gray-300 rounded-[8px] px-3 py-2 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                      />
                      <button
                        type="button"
                        onClick={() => addCustomOption('genres', customOptionInputs.genre)}
                        className="px-3 py-2 rounded-[8px] bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 transition duration-150"
                      >
                        Agregar
                      </button>
                    </div>
                  </div>
                  {/* Año publicación */}
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
                  {/* Nro. de páginas */}
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
                  {/* URL de portada */}
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
              {/* Estado */}
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
              {/* Puntaje */}
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
              {/* # Lecturas */}
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
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              {/* Fecha inicio */}
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
              {/* Fecha fin */}
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
              {/* Formato */}
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
              {/* Actualizar progreso */}
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
              {/* Origen */}
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
                  {dynamicCatalogs.origins.map((origin) => (
                    <option key={origin.id} value={origin.option}>
                      {origin.value}
                    </option>
                  ))}
                </select>
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    value={customOptionInputs.origin}
                    onChange={(e) =>
                      setCustomOptionInputs((prev) => ({
                        ...prev,
                        origin: e.target.value,
                      }))
                    }
                    placeholder="Agregar origen"
                    className="flex-1 border border-gray-300 rounded-[8px] px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150"
                  />
                  <button
                    type="button"
                    onClick={() => addCustomOption('origins', customOptionInputs.origin)}
                    className="px-3 py-2 rounded-[8px] bg-green-100 text-green-700 font-semibold hover:bg-green-200 transition duration-150"
                  >
                    Agregar
                  </button>
                </div>
              </div>
              {/* Lugar o persona de origen */}
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
                  {dynamicCatalogs.places.map((place) => (
                    <option key={place.id} value={place.option}>
                      {place.value}
                    </option>
                  ))}
                </select>
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    value={customOptionInputs.originPlace}
                    onChange={(e) =>
                      setCustomOptionInputs((prev) => ({
                        ...prev,
                        originPlace: e.target.value,
                      }))
                    }
                    placeholder="Agregar lugar/persona"
                    className="flex-1 border border-gray-300 rounded-[8px] px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150"
                  />
                  <button
                    type="button"
                    onClick={() => addCustomOption('places', customOptionInputs.originPlace)}
                    className="px-3 py-2 rounded-[8px] bg-green-100 text-green-700 font-semibold hover:bg-green-200 transition duration-150"
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>

            {/* Reseña */}
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