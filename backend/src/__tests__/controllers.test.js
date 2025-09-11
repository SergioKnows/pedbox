/**
 * Tests del controlador subredditController (unitarios puros)
 *
 * - getSubreddits: responde shape correcto con Prisma mockeado
 * - getSubredditById: valida ID inválido (400) y not found (404)
 */

import { describe, it, expect, vi } from 'vitest'

// Mock del cliente de Prisma
const mockPrisma = {
  redditData: {
    findMany: vi.fn(),
    count: vi.fn(),
    findUnique: vi.fn()
  }
}

vi.mock('@prisma/client', () => ({
  PrismaClient: vi.fn(() => mockPrisma)
}))

// Cargar el controlador después de mockear Prisma
const controllerModule = await import('../controllers/mainController.js')
const controller = controllerModule.default

function createRes() {
  return {
    statusCode: 200,
    body: null,
    status(code) { this.statusCode = code; return this },
    json(payload) { this.body = payload; return this }
  }
}

describe('subredditController', () => {
  it('getSubreddits devuelve paginación y rows', async () => {
    mockPrisma.redditData.findMany.mockResolvedValueOnce([
      { id: 1, displayName: 'test', subscribers: 1000 }
    ])
    mockPrisma.redditData.count.mockResolvedValueOnce(1)

    const req = { query: { page: '1', pageSize: '1' } }
    const res = createRes()

    await controller.getSubreddits(req, res)

    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject({ page: 1, pageSize: 1, total: 1 })
    expect(Array.isArray(res.body.rows)).toBe(true)
    expect(res.body.rows[0].displayName).toBe('test')
  })

  it('getSubredditById maneja ID inválido y not found', async () => {
    // ID inválido
    let req = { params: { id: 'abc' } }
    let res = createRes()
    await controller.getSubredditById(req, res)
    expect(res.statusCode).toBe(400)

    // Not found
    mockPrisma.redditData.findUnique.mockResolvedValueOnce(null)
    req = { params: { id: '999' } }
    res = createRes()
    await controller.getSubredditById(req, res)
    expect(res.statusCode).toBe(404)
  })
})


