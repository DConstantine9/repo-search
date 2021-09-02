import React from "react";
import './App.css';

function App() {
  const [inputValue, setInputValue] = React.useState("")
  const [repos, setRepos] = React.useState([])
  const [error, setError] = React.useState(false)

  React.useEffect(() => {
    if (!inputValue) {
      return
    }

    fetch("https://api.github.com/search/repositories?q=" + inputValue)
      .then(res => {
        return res.json()  
      })
      .then(data => {
        console.log(data)
        setRepos(data.items)
      })
      .catch(err => {
        setError(true)
        console.log(err)
      })
    console.log(inputValue)
  }, [inputValue])

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault()
        setInputValue(e.target.elements.query.value)
      }}>
        <div className="App">
          <div>
            <input type="text" name="query" placeholder="Search" />
          </div>
        </div>
      </form>
      {error && (
        <div>
          Fetching data error
        </div>
      )}
      <div>
        {repos.map(repo => {
          return (
            <div key={repo.id}>
              <a href={repo.html_url}>{repo.name}</a>
            </div>
          )
        })}
      </div>
    </div>
 
  );
}

export default App;
