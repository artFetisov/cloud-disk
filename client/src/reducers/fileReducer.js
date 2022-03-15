const SET_FILES = 'SET_FILES'
const SET_CURRENT_DIR = 'SET_CURRENT_DIR'
const ADD_FILE = 'ADD_FILE'
const SET_POPUP_DISPLAY = 'POPUP_DISPLAY'
const PUSH_TO_STACK = 'PUSH_TO_STACK'
const DELETE_FILE = 'DELETE_FILE'
const SET_VIEW = 'SET_VIEW'

const initialState = {
  files: [],
  currentDir: null,
  popupDisplay: 'none',
  dirStack: [],
  view: 'list',
}

export default function fileReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FILES:
      return {
        ...state,
        files: action.payload,
      }

    case SET_CURRENT_DIR: {
      return {
        ...state,
        currentDir: action.payload,
      }
    }

    case ADD_FILE: {
      return {
        ...state,
        files: [...state.files, action.payload],
      }
    }

    case SET_POPUP_DISPLAY: {
      return {
        ...state,
        popupDisplay: action.payload,
      }
    }

    case PUSH_TO_STACK: {
      return {
        ...state,
        dirStack: [...state.dirStack, action.payload],
      }
    }

    case DELETE_FILE: {
      return {
        ...state,
        files: [...state.files.filter((file) => file._id !== action.payload)],
      }
    }

    case SET_VIEW: {
      return {
        ...state,
        view: action.payload,
      }
    }

    default:
      return state
  }
}

export const setFiles = (payload) => ({ type: SET_FILES, payload })
export const setCurrentDir = (payload) => ({ type: SET_CURRENT_DIR, payload })
export const addFile = (payload) => ({ type: ADD_FILE, payload })
export const setPopupDisplay = (payload) => ({ type: SET_POPUP_DISPLAY, payload })
export const pushToStack = (payload) => ({ type: PUSH_TO_STACK, payload })
export const deleteFileAction = (payload) => ({ type: DELETE_FILE, payload })
export const setView = (payload) => ({ type: SET_VIEW, payload })
