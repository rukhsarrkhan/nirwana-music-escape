import React, { useState } from "react";
import CustomButton from "../../components/custom-button/custom-button.component";
import FormInput from "../../components/form-input/form-input.component";
import { MultiSelect } from "react-multi-select-component";
const CreatePlaylist = () => {
  const options = [
    { label: "Grapes 🍇", value: "grapes" },
    { label: "Mango 🥭", value: "mango" },
    { label: "Strawberry 🍓", value: "strawberry", disabled: true },
  ];
  const [values, setValues] = useState({
    name: "",
    desc: "",
    songs: [],
  });
  const [selected, setSelected] = useState([]);
  const handleNameInputChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      name: event.target.value,
    }));
  };
  const handleDescInputChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      desc: event.target.value,
    }));
  };
  const handleSongInputChange = (event) => {
    console.log(event)
    event.persist();
    setValues((values) => ({
      ...values,
      song: event.target.value,
    }));
  };
  return (
    <>
      <FormInput
        name="name"
        type="text"
        handleChange={handleNameInputChange}
        value={values.name}
        label="Name:"
        required
      />
      <FormInput
        name="description"
        type="text"
        handleChange={handleDescInputChange}
        value={values.desc}
        label="description:"
        required
      />
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />
      <button
        onClick={() => {
          console.log(values);
        }}
      >
        Add
      </button>
    </>
  );
};

export default CreatePlaylist;
