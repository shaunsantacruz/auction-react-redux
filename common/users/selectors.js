import { compose, prop } from 'ramda'
import { name } from './__init__'
import { createSelector } from 'reselect'

export const getModel = prop(name)
export const getLoggedInIds = compose(prop('loggedInIds'), prop(name))
export const getUsersById = compose(prop('byId'), prop(name))
//export const getUserById = (state, id) => state[name]['byId'][id]
export const getLoggedInUsers = createSelector(
  getLoggedInIds,
  getUsersById,
  (userIds, usersById) => userIds.map((id) => usersById[id])
)
