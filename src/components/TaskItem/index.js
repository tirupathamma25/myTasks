import './index.css'

const TaskItem = props => {
  const {taskDetails} = props
  const {taskType, tagType} = taskDetails

  return (
    <li className="list-item">
      <p className="task-text">{taskType}</p>
      <button type="button" className="task-button">
        {tagType}
      </button>
    </li>
  )
}

export default TaskItem
