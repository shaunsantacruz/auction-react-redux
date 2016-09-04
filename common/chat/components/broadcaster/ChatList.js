import React, {
  Component,
  PropTypes,
} from 'react'

import {scrollToBottom} from '../../../domUtils'

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
    const {messages} = this.props

    return (
      <div>
        <div
          ref={(node) => scrollToBottom(node)}
          className="broadcaster-chat__list">
          <ul>
            {messages.map(this.chatItem)}
          </ul>
        </div>
      </div>
    )
  }
}

ChatList.propTypes = {
  messages: PropTypes.array,
}
// ChatList.defaultProps = {}

export default ChatList
