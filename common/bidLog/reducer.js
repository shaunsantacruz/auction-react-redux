import * as a from './actions'

export const initialState = []

export default function reducer(state = initialState, action) {
  const {type, payload: {log} = {}} = action
  switch(type) {
    case a.ADD: {
      return [
        log,
        ...state,
      ]
    }
    default: return state
  }
}
