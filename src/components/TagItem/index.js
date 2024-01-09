import './index.css'

const TagItem = props => {
  const {tagDetails, clickTagItem, isActive} = props
  const {displayText} = tagDetails

  const onClickTag = () => {
    clickTagItem(displayText)
  }
  const tagClassName = isActive ? 'task-button' : 'tag-button'

  return (
    <li className="tag-list-item">
      <button type="button" className={tagClassName} onClick={onClickTag}>
        {displayText}
      </button>
    </li>
  )
}

export default TagItem
