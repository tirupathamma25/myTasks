import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TaskItem from './components/TaskItem'

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
    tag: tagsList[0].optionId,
    taskData: [],
    activeTag: 'constant',
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
    this.setState({tag: event.target.value})
  }

  renderTagField = () => {
    const {tag} = this.state
    return (
      <div className="input-card">
        <label htmlFor="tag" className="label-text">
          Tags
        </label>
        <select
          id="tag"
          className="input-element"
          value={tag}
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

  onClickAddTaskBtn = () => {
    const {task, tag} = this.state

    const id = uuidv4()
    const taskType = task
    const tagType = tag

    this.setState(prevState => ({
      taskData: [...prevState.taskData, {id, taskType, tagType}],
      task: '',
      tag: tagsList[0].optionId,
    }))
  }

  onTagButton = event => {
    this.setState(prevState => ({
      activeTag:
        prevState.activeTag === event.target.value
          ? 'constant'
          : event.target.value,
    }))
  }

  render() {
    const {taskData, activeTag, tag, task} = this.state
    const filteredTask =
      activeTag === 'constant'
        ? taskData
        : taskData.filter(each => each.tagType === activeTag)
    const taskLength = filteredTask.length > 0
    return (
      <div className="app-container">
        <form className="form-card">
          <h1 className="main-heading">Create a Task!</h1>
          <div>{this.renderTaskField()}</div>
          <div>{this.renderTagField()}</div>
          <button
            type="submit"
            className="add-button"
            onClick={this.onClickAddTaskBtn}
          >
            Add Task
          </button>
        </form>
        <div>
          <h1 className="task-h1">Tags</h1>
          <ul className="un-ordered-list">
            {tagsList.map(eachTag => (
              <li className="tag-list-item" key={eachTag.optionId}>
                <button
                  type="button"
                  value={eachTag.optionId}
                  className="tag-button"
                  onClick={this.onTagButton}
                >
                  {eachTag.displayText}
                </button>
              </li>
            ))}
          </ul>

          <h1 className="task-h1">Tasks</h1>
          {taskLength ? (
            <ul>
              {filteredTask.map(eachTask => (
                <TaskItem taskDetails={eachTask} key={eachTask.id} />
              ))}
            </ul>
          ) : (
            <p className="task-h1">No Tasks Added Yet</p>
          )}
        </div>
      </div>
    )
  }
}

export default App
