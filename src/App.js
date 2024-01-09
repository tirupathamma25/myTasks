import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TaskItem from './components/TaskItem'
import TagItem from './components/TagItem'
import './App.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class App extends Component {
  state = {
    task: '',
    activeTask: tagsList[0].displayText,
    taskData: [],
    activeTag: false,
  }

  onChangeTask = event => {
    this.setState({task: event.target.value})
  }

  renderTaskField = () => {
    const {task} = this.state
    return (
      <div className="input-card">
        <label htmlFor="task" className="label-text">
          Task
        </label>
        <input
          type="text"
          id="task"
          onChange={this.onChangeTask}
          placeholder="Enter the task here"
          className="input-element"
          value={task}
        />
      </div>
    )
  }

  onChangeTag = event => {
    this.setState({activeTask: event.target.value})
  }

  renderTagField = () => {
    const {activeTask} = this.state
    return (
      <div className="input-card">
        <label htmlFor="tag" className="label-text">
          Tags
        </label>
        <select
          id="tag"
          className="input-element"
          value={activeTask}
          onChange={this.onChangeTag}
        >
          {tagsList.map(eachItem => (
            <option value={eachItem.optionId} key={eachItem.optionId} id="tag">
              {eachItem.displayText}
            </option>
          ))}
        </select>
      </div>
    )
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {task, activeTask} = this.state
    const newTask = {
      id: uuidv4(),
      task,
      activeTask,
    }
    this.setState(prevState => ({
      taskData: [...prevState.taskData, newTask],
      task: '',
    }))
  }

  clickTagItem = tagValue => {
    this.setState({activeTask: tagValue})
  }

  renderTaskAddedData = () => {
    const {taskData} = this.state
    return (
      <ul>
        {taskData.map(eachTask => (
          <TaskItem taskDetails={eachTask} key={eachTask.id} />
        ))}
      </ul>
    )
  }

  render() {
    const {taskData, activeTask} = this.state
    const taskLength = taskData.length > 0
    return (
      <div className="app-container">
        <form className="form-card" onSubmit={this.onSubmitForm}>
          <h1 className="main-heading">Create a Task!</h1>
          <div>{this.renderTaskField()}</div>
          <div>{this.renderTagField()}</div>
          <button type="submit" className="add-button">
            Add Task
          </button>
        </form>
        <div>
          <h1 className="task-h1">Tags</h1>
          <ul className="un-ordered-list">
            {tagsList.map(eachTag => (
              <TagItem
                tagDetails={eachTag}
                key={eachTag.optionId}
                clickTagItem={this.clickTagItem}
                isActive={eachTag.displayText === activeTask}
              />
            ))}
          </ul>

          <h1 className="task-h1">Tasks</h1>
          {taskLength ? (
            this.renderTaskAddedData()
          ) : (
            <p className="task-h1">No Tasks Added Yet</p>
          )}
        </div>
      </div>
    )
  }
}

export default App
