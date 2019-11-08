import { createStore } from 'redux'

const initState = {
  index: undefined,
  list: []
}

const counterReducer = (state = initState, action) => {
  switch (action.type) {
    case 'list':
      state.list = action.list
      return { ...state }
    case 'index':
      state.index = action.index
      return { ...state }
    default:
      return state
  }
}
const store = createStore(counterReducer)
export default store