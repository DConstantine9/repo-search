import React from "react";
import './App.css';
import './Search.css';
import './Card.css';


function App() {
  const [inputValue, setInputValue] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [repos, setRepos] = React.useState([])
  const [error, setError] = React.useState(false)

  React.useEffect(() => {
    if (!inputValue) {
      return
    }

    setIsLoading(true)

    fetch("https://api.github.com/search/repositories?q=" + inputValue)
      .then(res => {
        return res.json()  
      })
      .then(data => {
        console.log(data)
        setIsLoading(false)
        setRepos(data.items)
      })
      .catch(err => {
        setIsLoading(false)
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
          <div id="searchBlock">
            <input type="text" name="query" placeholder="Начните вводить текст для поиска (не менее трех символов)" id="searchBar"/>
            <button type="submit" id="searchBtn"><i className="fas fa-search"></i></button>
          </div>
        </div>
      </form>
      {isLoading && <div className="loading">Поиск проектов...</div>}
      {error && (
        <div>
          Fetching data error
        </div>
      )}
      <div className="cardBlock">
        {repos.map(repo => {
          return (
            <div key={repo.id} className="card">
              <a href={repo.html_url}>{repo.name}</a>
              <div className="info">
                <img src={repo.owner.avatar_url} alt=""/> 
                <div>{repo.owner.login} </div>
              </div>
              <div className="info"> 
                <i className="fas fa-star"></i> <div className="stargazers">{repo.stargazers_count}</div>
                <i className="fas fa-eye"></i><div>{repo.watchers_count}</div>
              </div>
              <div className="comment">
                <input  />
                <button><i className="fas fa-pencil-alt"></i></button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
 
  );
}

export default App;
