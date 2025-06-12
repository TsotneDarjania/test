import { useState } from "react";

/**
 * useForm Hook
 *
 * A custom React hook that manages form state and provides form handling utilities:
 * - Takes an object with initial form values as an argument
 * - Returns an object containing:
 *   - values: Current form field values
 *   - handleChange: Function to update form values on input change
 *   - resetForm: Function to reset form values to initial state
 *
 */
const initialValues = { name: "", email: "" };

function useForm() {
  const [form, setForm] = useState(initialValues);

  //   function handleChange(newForm) {
  //     setForm(newForm);
  //   }

  function handleChange(newForm) {
    setForm(newForm);
  }

  function resetForm() {
    setForm(initialValues);
  }

  return {
    values: form,
    handleChange,
    resetForm,
  };
}

export default useForm;
