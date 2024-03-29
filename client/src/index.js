import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { store } from './reducers/index'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
)
