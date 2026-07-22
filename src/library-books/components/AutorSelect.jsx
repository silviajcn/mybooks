import CreatableSelect from "react-select/creatable";

export const AutorSelect = ({ value, options, onChange, name }) => {
  const mappedOptions = options.map((opt) => ({
    value: opt.author,
    label: opt.author,
  }));

  const mappedValue = Array.isArray(value)
    ? value.map((val) => ({ value: val, label: val }))
    : [];

  const handleSelectChange = (selectedOptions) => {
    const selectedValues = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];

    onChange({ target: { name, value: selectedValues } });
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused ? "2px solid #3b82f6" : "1px solid #d1d5db",
      borderRadius: "8px",
      minHeight: "48px",
      boxShadow: "none",
      "&:hover": {
        borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
      },
      backgroundColor: "#f9fafb",
      padding: "0 4px",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#bfdbfe",
      borderRadius: "4px",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#1f2937",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#9ca3af",
    }),
  };

  return (
    <CreatableSelect
      name={name}
      value={mappedValue}
      options={mappedOptions}
      onChange={handleSelectChange}
      isMulti
      isClearable
      styles={customStyles}
      placeholder="Selecciona o escribe uno o más autores..."
      className="text-gray-800"
      classNamePrefix="react-select"
      formatCreateLabel={(inputValue) => `Agregar autor: "${inputValue}"`}
    />
  );
};
