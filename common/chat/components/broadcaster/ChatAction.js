import React, {
  Component,
  PropTypes,
} from 'react'

class ChatAction extends Component {

  constructor(props) {
    super(props)

    this.input = null
  }

  componentDidUpdate(prevProps) {
    const {
      selectedUser,
    } = this.props

    if(selectedUser !== prevProps.selectedUser) {
      this.input.focus()
    }
  }

  render() {
    const {
      handleSendMessage,
      selectedUser,
      isLobbySelected,
    } = this.props
    return (
      <div className="broadcaster-chat__action mt-5">
        <input
          type="text"
          onKeyDown={(e) => {
            if(e.which === 13 || e.which === 9) {
              if(this.input.value.trim() !== '') {
                handleSendMessage(this.input.value.trim(), isLobbySelected)
                this.input.value = ''
              }
            }
          }}
          ref={
            (node) => {
              this.input = node
            }
          }
          disabled={!isLobbySelected && !selectedUser} />
        <button
          onClick={() => {
            if(this.input.value.trim() !== '') {
              handleSendMessage(this.input.value.trim(), isLobbySelected)
              this.input.value = ''
            }
          }}
          disabled={!isLobbySelected && !selectedUser}>
          Send
        </button>
      </div>
    )
  }
}

ChatAction.propTypes = {
  handleSendMessage: PropTypes.func,
  selectedUser: PropTypes.object,
  model: PropTypes.object,
  isLobbySelected: PropTypes.bool,
}
// ChatAction.defaultProps = {}

export default ChatAction