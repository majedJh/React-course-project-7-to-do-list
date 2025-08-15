import { useState } from "react"

export default function App() {

  const [list, setList] = useState([]);

  function handleSubmit(e, item) {
    e.preventDefault();
    if (item.content.trim()) setList(list => [...list, item]);
  }
  function handleToggleCheck(item) {
    setList(() => list.map(listItem => listItem.content === item.content ? item : listItem));
  }

  return <div className="app">
    <Logo></Logo>
    <div className="container">
      <Form onSubmit={handleSubmit}></Form>
      <List list={list} onToggleCheck={handleToggleCheck}></List>
    </div>
  </div>
}

function Logo() {
  return <h1>TO-DO 📃</h1>
}
function Form({ onSubmit }) {
  
  const [content, setContent] = useState("");
  const [importance, setImportance] = useState("neutral")
  
  function handleForm(e, item) {
    setContent("");
    setImportance("neutral")
    onSubmit(e, item);
  }
  
  return <div className="form">
    <form onSubmit={e => handleForm(e, { content, importance, checked: false })}>
      <input type="text" value={content} onChange={e => setContent(e.target.value)} placeholder="Add a new to-do"></input>
      <select value={importance} onChange={e => setImportance(e.target.value)}>
        <option value="important">Important</option>
        <option value="neutral">Neutral</option>
        <option value="delayed">Can be delayed</option>
      </select>
      <button>Submit</button>
    </form>
  </div>
}

function List({ list, onToggleCheck }) {

  const [filter, setFilter] = useState("input");
  const priority = {
    important: 1,
    neutral: 2,
    delayed: 3
  };
  let sortedList;
    if (filter === "input") sortedList = list;
    if (filter === "importance") sortedList = [...list].sort((a, b) => priority[a.importance] - priority[b.importance]);
    if (filter === "checked") sortedList = [...list].sort((a, b) => Number(a.checked) - Number(b.checked));


  return <div className="list">
    {list.length === 0 ? <p>Add items to the list!</p>
      : sortedList.map(item => <ListItem item={item} onToggleCheck={onToggleCheck} key={item.content}></ListItem>)}
    <div className="filter">
      <label>Filter by:</label>
      <select value={filter} onChange={e => setFilter(e.target.value)}>
        <option value="input">Input time</option>
        <option value="importance">Importance</option>
        <option value="checked">Checked</option>
      </select>
    </div>
  </div>
}

function ListItem({ item, onToggleCheck }) {
  
  const [checked, setChecked] = useState(false);
  
  function handleCheck() {
    setChecked(checked => !checked)
    onToggleCheck({ ...item, checked: !checked })
  }
  
  return <div className="item">
    <input type="checkbox" value={checked} onChange={handleCheck}></input>
    <div className={`content ${checked ? "checked" : ""}`}>{item.content}</div>
    <div className={`importance ${item.importance === "important" ? "color-red" : ""} ${item.importance === "neutral" ? "color-blue" : ""} ${item.importance === "delayed" ? "color-green" : ""}`}>{item.importance}</div>
  </div>
}