import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskManager from './TaskManager';

describe('TaskManager', () => {

    const addTask = (taskText) => {
        const input = screen.getByPlaceholderText('Enter a new task');
        const addButton = screen.getByText('Add Task');
        fireEvent.change(input, { target: { value: taskText } });
        fireEvent.click(addButton);
    };

    test('it successfully adds a new task', () => {
        render(<TaskManager />);
        addTask('New Task');
        expect(screen.getByText('New Task')).toBeInTheDocument();
    });

    test('it successfully toggles a task', () => {
        render(<TaskManager />);
        addTask('Toggle Task');

        const task = screen.getByText('Toggle Task');
        fireEvent.click(task);
        expect(task).toHaveStyle({ textDecoration: 'line-through' });

        fireEvent.click(task);
        expect(task).toHaveStyle({ textDecoration: 'none' });
    });

    test('it successfully removes a task', () => {
        render(<TaskManager />);
        addTask('Remove Task');

        const removeButton = screen.getByText('Remove');
        fireEvent.click(removeButton);
        expect(screen.queryByText('Remove Task')).not.toBeInTheDocument();
    });

    test('it handles multiple tasks', () => {
        render(<TaskManager />);
        const tasks = ['Task 1', 'Task 2', 'Task 3'];

        tasks.forEach(addTask);

        tasks.forEach(task => {
            expect(screen.getByText(task)).toBeInTheDocument();
        });

        expect(screen.getAllByText('Remove')).toHaveLength(tasks.length);
    });
});
