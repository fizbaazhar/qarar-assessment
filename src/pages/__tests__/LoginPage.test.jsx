import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import LoginPage from '../LoginPage'
import authReducer from '../../redux/authSlice'
import profileReducer from '../../redux/profileSlice'
import tasksReducer from '../../redux/tasksSlice'
import notificationsReducer from '../../redux/notificationsSlice'

// Mock react-router-dom
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

// Mock the toaster utility
vi.mock('../../utils/toaster', () => ({
  showToast: vi.fn(),
}))

describe('LoginPage Component', () => {
  const user = userEvent.setup()
  
  // Create a test store
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

  const renderWithProviders = (ui, { preloadedState = {}, store = createTestStore(preloadedState) } = {}) => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          {ui}
        </BrowserRouter>
      </Provider>
    )
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  // Test basic rendering
  it('renders login form with all required elements', () => {
    renderWithProviders(<LoginPage />)
    
    expect(screen.getByText('Welcome Back')).toBeInTheDocument()
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument()
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument()
  })

  // Test form validation
  it('shows error when email is empty', async () => {
    renderWithProviders(<LoginPage />)
    
    const submitButton = screen.getByRole('button', { name: 'Sign In' })
    await user.click(submitButton)
    
    expect(screen.getByText('Email is required')).toBeInTheDocument()
  })

  it('shows error when password is empty', async () => {
    renderWithProviders(<LoginPage />)
    
    const emailInput = screen.getByLabelText('Email Address')
    await user.type(emailInput, 'test@example.com')
    
    const submitButton = screen.getByRole('button', { name: 'Sign In' })
    await user.click(submitButton)
    
    expect(screen.getByText('Password is required')).toBeInTheDocument()
  })

  it('prevents form submission with invalid email format', async () => {
    renderWithProviders(<LoginPage />)
    const emailInput = screen.getByLabelText('Email Address')
    await user.type(emailInput, 'justtext')
    const passwordInput = screen.getByLabelText('Password')
    await user.type(passwordInput, 'password123')
    
    const submitButton = screen.getByRole('button', { name: 'Sign In' })
    await user.click(submitButton)
    
    // Wait a bit for any async operations to complete
    await new Promise(resolve => setTimeout(resolve, 100))
    
    // Check that navigation did not occur (form validation prevented submission)
    expect(mockNavigate).not.toHaveBeenCalled()
    
    // Verify the form is still visible (not redirected)
    expect(screen.getByText('Welcome Back')).toBeInTheDocument()
  })

  it('shows error when password is too short', async () => {
    renderWithProviders(<LoginPage />)
    
    const emailInput = screen.getByLabelText('Email Address')
    await user.type(emailInput, 'test@example.com')
    
    const passwordInput = screen.getByLabelText('Password')
    await user.type(passwordInput, '123')
    
    const submitButton = screen.getByRole('button', { name: 'Sign In' })
    await user.click(submitButton)
    
    expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument()
  })

  // Test successful form submission
  it('submits form successfully with valid data', async () => {
    renderWithProviders(<LoginPage />)
    
    const emailInput = screen.getByLabelText('Email Address')
    await user.type(emailInput, 'test@example.com')
    
    const passwordInput = screen.getByLabelText('Password')
    await user.type(passwordInput, 'password123')
    
    const submitButton = screen.getByRole('button', { name: 'Sign In' })
    await user.click(submitButton)
    
    // Wait for the async operations to complete
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard')
    })
  })

  // Test form field interactions
  it('clears email error when user starts typing', async () => {
    renderWithProviders(<LoginPage />)
    
    const submitButton = screen.getByRole('button', { name: 'Sign In' })
    await user.click(submitButton)
    
    expect(screen.getByText('Email is required')).toBeInTheDocument()
    
    const emailInput = screen.getByLabelText('Email Address')
    await user.type(emailInput, 't')
    
    expect(screen.queryByText('Email is required')).not.toBeInTheDocument()
  })

  it('clears password error when user starts typing', async () => {
    renderWithProviders(<LoginPage />)
    
    const emailInput = screen.getByLabelText('Email Address')
    await user.type(emailInput, 'test@example.com')
    
    const submitButton = screen.getByRole('button', { name: 'Sign In' })
    await user.click(submitButton)
    
    expect(screen.getByText('Password is required')).toBeInTheDocument()
    
    const passwordInput = screen.getByLabelText('Password')
    await user.type(passwordInput, 'p')
    
    expect(screen.queryByText('Password is required')).not.toBeInTheDocument()
  })

  // Test navigation link
  it('has working signup link', () => {
    renderWithProviders(<LoginPage />)
    
    const signupLink = screen.getByText('Sign up here')
    expect(signupLink).toHaveAttribute('href', '/signup')
  })

  // Test accessibility
  it('has proper form labels and associations', () => {
    renderWithProviders(<LoginPage />)
    
    const emailInput = screen.getByLabelText('Email Address')
    const passwordInput = screen.getByLabelText('Password')
    
    expect(emailInput).toHaveAttribute('type', 'email')
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  it('has proper ARIA attributes', () => {
    renderWithProviders(<LoginPage />)
    
    const emailInput = screen.getByLabelText('Email Address')
    const passwordInput = screen.getByLabelText('Password')
    
    expect(emailInput).toHaveAttribute('id', 'email')
    expect(passwordInput).toHaveAttribute('id', 'password')
  })

  // Test error handling
  it('displays auth error when login fails', async () => {
    // Mock a failed login by setting up the store with an error
    const preloadedState = {
      auth: {
        error: 'Login failed. Please try again.',
        isLoading: false,
        isAuthenticated: false,
        user: null
      }
    }
    
    renderWithProviders(<LoginPage />, { preloadedState })
    
    expect(screen.getByText('Login failed. Please try again.')).toBeInTheDocument()
  })

  // Test form reset - this test needs to be updated since the form doesn't automatically reset
  it('maintains form state during component lifecycle', async () => {
    const { rerender } = renderWithProviders(<LoginPage />)
    
    const emailInput = screen.getByLabelText('Email Address')
    const passwordInput = screen.getByLabelText('Password')
    
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    
    expect(emailInput).toHaveValue('test@example.com')
    expect(passwordInput).toHaveValue('password123')
    
    // Re-render the component
    rerender(
      <Provider store={createTestStore()}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    )
    
    // The form should maintain its state since it's not explicitly reset
    expect(emailInput).toHaveValue('test@example.com')
    expect(passwordInput).toHaveValue('password123')
  })

  // Test snapshot
  it('matches snapshot', () => {
    const { container } = renderWithProviders(<LoginPage />)
    expect(container).toMatchSnapshot()
  })
}) 