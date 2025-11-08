import { useState, useCallback } from 'react'
import './App.css'
import AddUser from './components/AddUser'
import ResultTable from './components/ResultTable'
import SearchForm from './components/SearchForm'

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentlyAddedUser, setRecentlyAddedUser] = useState(null);

  const handleSearchChange = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const handleUserAdded = useCallback((userData) => {
    setRecentlyAddedUser(userData);
  }, []);

  const handleUserAddedComplete = useCallback(() => {
    setRecentlyAddedUser(null);
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Quản lý người dùng</h1>
      </header>
      
      <main className="app-main">
        <SearchForm onSearchChange={handleSearchChange} />
        <AddUser onUserAdded={handleUserAdded} />
        <ResultTable 
          searchQuery={searchQuery} 
          newUser={recentlyAddedUser} 
          onUserAddedComplete={handleUserAddedComplete} 
        />
      </main>
    </div>
  )
}

export default App
