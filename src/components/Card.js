import React from "react";
import '../styles/Card.css';

function Card({repo}) {
  const [inputValue, setInputValue] = React.useState("");

  return (
    <div key={repo.id} className="card">
      <a href={repo.html_url}>{repo.name}</a>
      <div className="info">
        <img src={repo.owner.avatar_url} alt=""/> 
        <div>{repo.owner.login}</div>
      </div>
      <div className="info"> 
        <i className="fas fa-star"></i>
        <div className="stargazers">{repo.stargazers_count}
        </div>
        <i className="fas fa-eye"></i>
        <div>{repo.watchers_count}</div>
      </div>

      <div>
        {inputValue}
      </div>

      <form className="comment" onSubmit={(e) => {
        e.preventDefault()
        setInputValue(e.target.elements.comment.value)
      }}>
        <input 
          type="text"
          name="comment" 
          placeholder="комментарий к проекту"
        />
        <button type="submit">
          <i className="fas fa-pencil-alt"></i>
        </button>
      </form>
    </div>
  )
}

export default Card