//imports
import editIcon from "./assets/editIcon.svg"
import trashIcon from "./assets/trashIcon.svg"
import './App.css'
import axios from "axios"
import { useEffect, useState } from "react"

function App() {
  //
  const [tasklist, setTasklist] = useState([]);
  // representa a lista digitado no input
  const [taskValue, setTaskValue] = useState("")

  const [editMode, setEditMode] = useState(false)

  const [idToEdit, setIdToEdit] = useState(0)
  //(Get)
  const getTaks = async () => {
    try {
      const APIReturn = await axios.get("http://localhost:3000/taskpoin")
      const dataAPI = await APIReturn.data
      setTasklist(dataAPI) 
    } catch (error) {
      console.log(error)
    }
  }
  //(Post)
  const createTask = async (e) => {
    //parar/capturar o evento de submit do formulario
    e.preventDefault()
    // validar o formulario 
    // cadastrar post os dados (try/catch)
    // recarrgar os dados na tela (getTask)
    if(taskValue.trim().length == 0){
      alert("Preencha o espaço que esta vazio")
      return false;
    } 
    try {
      const APIREturn = await axios.post("http://localhost:3000/taskpoin",
      {descricao: taskValue})
      
      console.log(APIREturn);
      alert ("Tarefa cadastrar")
      getTaks();
    } catch (error) {
      console.log(error)
      
    }
    
    axios.post("endpoint", {descricao : taskValue})
  }
  //(Put)
  const putTaks = async () => {
  setTaskValue(taskItem.id)
  setEditMode(taskItem.id)
  setIdToEdit(taskItem.id)
  }
  //(confirmPutTask)
   const confirmPutTask = async (e) => {
    e.preventDefault();
    // validar o form
    if (taskValue.trim().length == 0) {
      alert("Preencha a tarefa corretamente");
      return false;
    }

    try {
      axios.put(`http://localhost:3000/taskpoin/${idToEdit}`, {
        descricao: taskValue,
      });
      alert("A tarefa foi editada");
      // atualiza o cadastro na tela
      getTasks();

      // reseta os dados da edição e formulário
      setEditMode(false);
      setIdToEdit(0);
      setTaskValue("");
    } catch (error) {
      alert("Erro ao editar a tarefa");
      // console.log(error);
    }
  };
  //(Delete)
  const deleteTaks = async (task) => {
    const querApagar = confirm(`Quer realmente apagar ${task.descricao}`)
    if(!querApagar) return false
    try {
      
      const retornoAPI = await axios.delete(`http://localhost:3000/taskpoin/${task.id}`)
      
      alert("Tarefa deletada")
      getTaks();
      
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    getTaks()
  }, [])


  return (
    <>
      <header className='header-section'>
        <h1 className='header-section__title'>React List</h1>
      </header>

      <main className='body-section'>
        <form className="cad-task" onSubmit={createTask}>
          <input
            type="text"
            className="cad-task__entry"
            placeholder='Adicione uma tarefa'
            value={taskValue}
            onChange={(e) => {
              setTaskValue(e.target.value)
            }}
          />
          <p>State: {taskValue}</p>
          <p>Id pra editar: {idToEdit}</p>
          <button className="cad-task__btn-confirm">Adicionar</button>
          {editMode && (
            <button
              className="cad-task__btn-confirm"
              type="button"
              onClick={() => {
                // reseta os dados da edição e formulário
                setEditMode(false)
                setIdToEdit(0)
                setTaskValue("")
              }}
            >
              Cancelar
            </button>
          )}
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
              <img src={editIcon} alt=" imagem de uma caneta - ação editar tarefa" 
              onClick={() => {
                putTaks(task)
              }}/>
              </div>
              <div className="cardlist__icon" onClick={() => {deleteTaks(task)}}>
                <img src={trashIcon} alt="imagem de uma lixeira - ação excluir tarefa"
                 />
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
