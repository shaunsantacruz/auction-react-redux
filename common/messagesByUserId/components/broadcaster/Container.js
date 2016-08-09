import {connect} from 'react-redux'
import Chat from './Chat'
import { getModel } from '../../selectors'
import * as a from '../../actions'

// external deps
import * as users from '../../../users'

function mapStateToProps(state) {
  const model = getModel(state)
  const selectedUserId = users.selectors.getSelectedUserId(state)

  return {
    model,
    isSelected: selectedUserId !== 0,
    selectedUser: selectedUserId ? users.selectors.getUserById(state, selectedUserId) : null
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleSendMessage(text) {
    dispatch(a.addMsg(text, {remote: true}))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat)
