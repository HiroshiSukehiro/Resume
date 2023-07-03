export interface loadState {
  value: boolean
}

const initialState: loadState = {
  value: false
}

export default function loadReducer(state = initialState, action: any) {
    switch (action.type) {
      case 'LOADED':
        return { ...state, value: true }
      default:
        return state
    }
}