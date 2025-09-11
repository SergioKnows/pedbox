/**
 * Tests para el componente SubredditList
 * 
 * Prueba el comportamiento del componente:
 * - Muestra spinner de loading al cargar inicialmente
 * - Renderiza lista de subreddits cuando se cargan los datos correctamente
 * - Muestra mensaje de error cuando falla la carga de datos
 * 
 * Utiliza mocks del servicio API y react-router-dom para aislar las pruebas
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import SubredditList from '../../components/SubredditList'

// Mock del servicio API
vi.mock('../../services/api', () => ({
  subredditService: {
    getSubreddits: vi.fn()
  }
}))

// Mock de react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    Link: ({ children, to }) => <a href={to}>{children}</a>
  }
})

const MockedSubredditList = () => (
  <BrowserRouter>
    <SubredditList />
  </BrowserRouter>
)

describe('SubredditList', () => {
  it('muestra spinner de loading inicial', () => {
    render(<MockedSubredditList />)
    // Busca el spinner por su rol genérico: un elemento con la clase animada
    const spinner = document.querySelector('.animate-spin')
    expect(spinner).toBeTruthy()
  })

  it('muestra lista de subreddits cuando se cargan los datos', async () => {
    const mockData = {
      rows: [
        {
          id: 1,
          displayName: 'test',
          title: 'Test Subreddit',
          subscribers: 1000
        }
      ],
      total: 1,
      page: 1,
      pageSize: 20
    }

    const { subredditService } = await import('../../services/api')
    subredditService.getSubreddits.mockResolvedValue(mockData)

    render(<MockedSubredditList />)

    await waitFor(() => {
      expect(screen.getByText('r/test')).toBeInTheDocument()
      expect(screen.getByText('Test Subreddit')).toBeInTheDocument()
      // El texto está dividido en nodos, buscamos con un matcher flexible
      expect(screen.getByText((content) => content.includes('1,000') && content.includes('suscriptores'))).toBeInTheDocument()
    })
  })

  it('muestra error cuando falla la carga', async () => {
    const { subredditService } = await import('../../services/api')
    subredditService.getSubreddits.mockRejectedValue(new Error('API Error'))

    render(<MockedSubredditList />)

    await waitFor(() => {
      expect(screen.getByText('Error al cargar los subreddits')).toBeInTheDocument()
    })
  })
})