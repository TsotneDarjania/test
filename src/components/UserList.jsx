import React, { useState, useEffect, useRef } from 'react';

/**
 * UserList Component
 * 
 * A React component that fetches and displays a list of users with search functionality:
 * - You can use any url to fetch the users since it is mocked. Our recommendation is to use the url `https://jsonplaceholder.typicode.com/users${term ? `?name_like=${term}` : ''}`
 * - The component should render an element that displays "Loading..." while the users are being fetched
 * - The component should render an error message `Failed to fetch users` if the fetch fails
 * - The component should render a list of users' names in an unordered list element on success.
 * - The component should have a search input field with placeholder "Enter a name"
 * - When the user searches for a specific user, the component should filter the users by name
 * - The component should conditionally render a button with text "Clear Search"
 * - When the user clicks the "Clear Search" button, the component should clear the search and display all users again
 *
 */
function UserList() {

    const [isLoaded, setIsLoaded] = useState(false)
    const [isfailedfetch, setIsfailFetch] = useState(false)
    const [users, setUsers] = useState()
    const [filteredUsers, setFilteredUsers] = useState([])

    const [searchquery, setSearchquery] = useState("")
    

    const inputRef = useRef()
  

    const [term, setTerm] = useState("")


    useEffect(() => {
       fetch(`https://jsonplaceholder.typicode.com/users${term ? `?name_like=${term}` : ''}`).then((res) => {
        if(res.status !== 200){
setIsfailFetch(true)
        }
        
return res.json()
       }).then((data) => {

        setIsLoaded(true)
        setUsers(data)
       })
    },[])

    if(!isLoaded){
        return <p>...loading</p>
    }


   


    return (
        <>
        {
            isfailedfetch ? <p>Failed to fetch users</p> :  <div>
            <input
            ref={inputRef}
            onChange={(e) => {
               const query = e.currentTarget.value.toLowerCase()
               setSearchquery(query)

              const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(query))


               setFilteredUsers(filteredUsers)
            } }
                type="text"
                placeholder="Enter a name"
            />
            <ul>
                {

                    searchquery.length > 0 ? filteredUsers.map((user) => (<li key={`user_${user.id}`}>{user.name}</li>)) : 

                    users.map((user) => (<li key={`user_${user.id}`}>{user.name}</li>))
                }
                
            </ul>
            <button onClick={() => {
                inputRef.current.value = ""
                setFilteredUsers([])
            }}>Clear</button>
        </div>
        }
        
        
        </>
       
    );
}

export default UserList;