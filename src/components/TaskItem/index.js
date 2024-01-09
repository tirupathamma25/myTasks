import './index.css'

const TaskItem = props => {
  const {taskDetails} = props
  const {task, activeTask} = taskDetails
  return (
    <li className="list-item">
      <p className="task-text">{task}</p>
      <button type="button" className="task-button">
        {activeTask}
      </button>
    </li>
  )
}

export default TaskItem
