import React from 'react';
import { render, screen, waitForElementToBeRemoved, fireEvent, act, waitFor } from '@testing-library/react';
import UserList from './UserList';

const mockUsers = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
    { id: 3, name: 'Bob Smith' },
];

describe('UserList', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        global.fetch = jest.fn();
    });

    const setupFetchMock = (responseData = mockUsers) => {
        global.fetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(responseData),
        });
    };

    const renderAndWaitForUsers = async () => {
        render(<UserList />);
        await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));
    };

    test('it initially fetches and displays all users', async () => {
        setupFetchMock();
        await renderAndWaitForUsers();
        mockUsers.forEach(user => {
            expect(screen.getByText(user.name)).toBeInTheDocument();
        });
    });

    test('it renders an error message if the fetch fails', async () => {
        global.fetch.mockRejectedValueOnce(new Error('Failed to fetch users'));
        render(<UserList />);
        await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));
        expect(screen.getByText('Failed to fetch users')).toBeInTheDocument();
    });

    test('it searches for a specific user', async () => {
        setupFetchMock();
        await renderAndWaitForUsers();

        setupFetchMock([{ id: 2, name: 'Jane Doe' }]);
        const searchInput = screen.getByPlaceholderText('Enter a name');
        await act(async () => {
            fireEvent.change(searchInput, { target: { value: 'Jane' } });
        });

        await waitFor(() => {
            expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
            expect(screen.getByText('Jane Doe')).toBeInTheDocument();
            expect(screen.queryByText('Bob Smith')).not.toBeInTheDocument();
        });
    });

    test('it clears the search and displays all users again', async () => {
        setupFetchMock();
        await renderAndWaitForUsers();

        const searchInput = screen.getByPlaceholderText('Enter a name');
        await act(async () => {
            fireEvent.change(searchInput, { target: { value: 'Jane' } });
        });

        const clearSearchButton = screen.getByText('Clear Search');
        await act(async () => {
            fireEvent.click(clearSearchButton);
        });

        await waitFor(() => {
            expect(searchInput.value).toBe('');
            mockUsers.forEach(user => {
                expect(screen.getByText(user.name)).toBeInTheDocument();
            });
        });
    });
});
