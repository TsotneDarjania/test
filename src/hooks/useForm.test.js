import { renderHook } from "@testing-library/react";
import useForm from "./useForm";
import { act } from "react";

const initialValues = { 'name': '', 'email': '' };

test('useForm should update the values of the form', () => {
    const { result } = renderHook(() => useForm(initialValues));

    act(() => {
        result.current.handleChange({ target: { name: 'name', value: 'John' } });
    });

    expect(result.current.values).toEqual({ name: 'John', email: '' });

    act(() => {
        result.current.handleChange({ target: { name: 'email', value: 'john@doe.com' } });
    })

    expect(result.current.values).toEqual({ name: 'John', email: 'john@doe.com' });

    act(() => {
        result.current.resetForm();
    })

    expect(result.current.values).toEqual(initialValues)
})

test('the hook useForm should return an object with the correct properties', () => {
    const { result } = renderHook(() => useForm(initialValues));

    expect(result.current).toHaveProperty('values');
    expect(result.current).toHaveProperty('handleChange');
    expect(result.current).toHaveProperty('resetForm');
})