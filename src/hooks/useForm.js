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
const initialValues = { 'name': '', 'email': '' };

function useForm() {
}

export default useForm;