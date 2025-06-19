import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../redux/authSlice'
import profileReducer from '../redux/profileSlice'
import tasksReducer from '../redux/tasksSlice'
import notificationsReducer from '../redux/notificationsSlice'

// Create a test store with all reducers
const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
      profile: profileReducer,
      tasks: tasksReducer,
      notifications: notificationsReducer,
    },
    preloadedState,
  })
}

// Custom render function that includes providers
const customRender = (ui, {
  preloadedState = {},
  store = createTestStore(preloadedState),
  route = '/',
  ...renderOptions
} = {}) => {
  const Wrapper = ({ children }) => {
    return (
      <Provider store={store}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </Provider>
    )
  }
  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  }
}

// Re-export everything
export * from '@testing-library/react'
export { customRender as render }
export { createTestStore } 