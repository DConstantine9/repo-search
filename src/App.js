import React from "react";
import Card from "./components/Card"
import SearchBar from "./components/SearchBar";

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

    fetch(`https://api.github.com/search/repositories?q=${inputValue}`)
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
        console.error(err)
      })
    console.log(inputValue)
  }, [inputValue])

  return (
    <div>
      <SearchBar setInputValue={setInputValue}/>
      {isLoading && <div className="loading">Поиск проектов...</div>}
      {error && (
        <div>
          Fetching data error
        </div>
      )}
      <div className="cardBlock">
        {repos.map((repo) => {
          return (
            <Card repo={repo} key={repo.id} />
          )
        })}
      </div>
    </div>
  );
}

export default App;
