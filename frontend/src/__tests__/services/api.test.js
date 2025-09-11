/**
 * Tests para el servicio de API (api.js)
 * 
 * Prueba que las funciones del subredditService:
 * - getSubreddits: haga GET correcto con parámetros de paginación
 * - getSubredditById: haga GET correcto con ID del subreddit
 * - fetchRedditData: haga POST correcto al endpoint de fetch
 * 
 * Utiliza mocks de axios para simular las respuestas HTTP
 */

import { describe, it, expect, vi } from 'vitest'
// Mock de axios con hoisting para evitar errores de inicialización
const mockApi = vi.hoisted(() => ({ get: vi.fn(), post: vi.fn() }))
vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => mockApi)
  }
}))
import { subredditService } from '../../services/api'

describe('subredditService', () => {
  it('getSubreddits hace petición GET correcta', async () => {
    const mockResponse = {
      data: {
        rows: [],
        total: 0,
        page: 1,
        pageSize: 20
      }
    }

    mockApi.get.mockResolvedValue(mockResponse)

    await subredditService.getSubreddits(1, 20)

    expect(mockApi.get).toHaveBeenCalledWith('/subreddits?page=1&pageSize=20')
  })

  it('getSubredditById hace petición GET correcta', async () => {
    const mockResponse = {
      data: {
        id: 1,
        displayName: 'test'
      }
    }

    mockApi.get.mockResolvedValue(mockResponse)

    await subredditService.getSubredditById(1)

    expect(mockApi.get).toHaveBeenCalledWith('/subreddits/1')
  })

  it('fetchRedditData hace petición POST correcta', async () => {
    const mockResponse = {
      data: {
        fetched: 10
      }
    }

    mockApi.post.mockResolvedValue(mockResponse)

    await subredditService.fetchRedditData()

    expect(mockApi.post).toHaveBeenCalledWith('/subreddits/fetch')
  })
})
