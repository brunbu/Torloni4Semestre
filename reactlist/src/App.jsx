//imports
import editIcon from "./assets/editIcon.svg"
import trashIcon from "./assets/trashIcon.svg"
import './App.css'
import { useState } from "react"

function App() {
  const [tasklist, setTasklist] = useState([
    {id: 1, descricao: "Revisar HTML Semântico"},
    {id: 2, descricao: "Revisar ReactJS"},
    {id: 3, descricao: "Revisar ReactJS"},
    {id: 4, descricao: "Revisar Estudar Native"},
    {id: 5, descricao: "Revisar Estudar Native"},
    {id: 6, descricao: "Revisar Estudar Native"},
    {id: 7, descricao: "Revisar Estudar Native"},
  ])

  return (
    <>
      <header className='header-section'>
        <h1 className='header-section__title'>React List</h1>
      </header>

      <main className='body-section'>
        <form className="cad-task">
          <input
            type="text"
            className="cad-task__entry"
            placeholder='Adicione uma tarefa'
          />
          <button className='cad-task__btn-confirm'>Adicionar</button>

        </form>

        <section className='cardlist'>
          {
            tasklist.map(task => {
              return (
              // colocar o tasklist/article aqui
                <article className='cardtask' key={task.id}>
            <p className='cardtask__task-text'>{task.descricao} </p>

            <div className="cardtask__icon-box">
              <div className="cardlist__icon">
              <img src={editIcon} alt=" imagem de uma caneta - ação editar tarefa" />
              </div>
              <div className="cardlist__icon">
                <img src={trashIcon} alt="imagem de uma lixeira - ação excluir tarefa" />
              </div>
            </div>
          </article>
              )
            })
          }
        </section>
          
          


      </main>

      <footer className='footer-section'>
        <p className='footer-section__right-text'>2026 React List - Todos os direitos reservados</p>
      </footer>
    </>

  )
}

export default App
