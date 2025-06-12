import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Counter from './Counter';

test('increments counter on button click', () => {

    render(<Counter />);

    const button = screen.getByText('Increment');
    const counter = screen.getByText('Counter: 0');

    fireEvent.click(button);

    expect(counter).toHaveTextContent('Counter: 1');
});
