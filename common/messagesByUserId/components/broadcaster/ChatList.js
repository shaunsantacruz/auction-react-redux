import React, {
  Component,
  PropTypes,
} from 'react'

class ChatList extends Component {

  chatItem({ authorRole, createdAt, authorName, text }) {
    return (
      <li key={createdAt}>
        <strong>{authorName}{authorRole === 'broadcaster' && ' (broadcaster)'}: </strong>
        {text}
      </li>
    )
  }

  render() {
    const {model, selectedUser} = this.props
    const messages = selectedUser && model[selectedUser.id] ? model[selectedUser.id] : []

    return (
      <div>
        <strong>
          {selectedUser ? `Chatting with ${selectedUser.fullName}` : 'Chat'}
        </strong>
        <div className="broadcaster-chat__list">
          <ul>
            {messages.reverse().map(this.chatItem)}
          </ul>
        </div>
      </div>
    )
  }
}

ChatList.propTypes = {
  model: PropTypes.object,
  selectedUser: PropTypes.object,
}
// ChatList.defaultProps = {}

export default ChatList
