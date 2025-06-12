## Instructions

1. Counter component

- Implement the Counter component in `src/components/Counter.jsx`

2. useForm hook

- Implement the useForm hook in `src/hooks/useForm.js`
- The form in this scenario has two fields: name and email. `<input type="text" name="name" />` and `<input type="text" name="email" />`
- The hook should take an object with the initial values of the form as an argument
- The hook should return an object with the following properties:
  - values: an object with the current values of the form
  - handleChange: a function that updates the values of the form
  - resetForm: a function that resets the values of the form to the initial values

3. TaskManager component

- Implement the TaskManager component in `src/components/TaskManager.jsx`
- The component should have a state variable `tasks` which is an array of tasks
- Each task should have a unique id, a text, and a completed property
- The component should have a input field for the new task
- The component should have a button that, when clicked, adds the new task to the tasks array
- The component should render a list of tasks in an unordered list element
- The component should have a button that, when clicked, removes the task from the tasks array
- When the user clicks on the task text, it should toggle the task as completed and add a 'line-through' style to the text

4. UserList component

- Implement the UserList component in `src/components/UserList.jsx`
- You can use any url to fetch the users since it is mocked. Our recommendation is to use the url `https://jsonplaceholder.typicode.com/users${term ? `?name_like=${term}` : ''}`
- The component should render an element that displays "Loading..." while the users are being fetched
- The component should render an error message `Failed to fetch users` if the fetch fails
- The component should render a list of users' names in an unordered list element on success.
- The component should have a search input field with placeholder "Enter a name"
- When the user searches for a specific user, the component should filter the users by name
- The component should conditionally render a button with text "Clear Search"
- When the user clicks the "Clear Search" button, the component should clear the search and display all users again
