/**
 * Tests de rutas del backend (Express)
 *
 * - GET /api -> devuelve doc básica de la API
 * - GET /api/subreddits?page=1&pageSize=1 -> responde 200 con shape esperado (mockeando Prisma)
 */

import request from 'supertest'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import app from '../../index.js'

// Mock de Prisma a nivel de módulo
vi.mock('@prisma/client', () => {
  const findMany = vi.fn(async () => [
    { id: 1, displayName: 'test', title: 'Test', subscribers: 1000 }
  ])
  const count = vi.fn(async () => 1)
  const findUnique = vi.fn(async () => ({ id: 1, displayName: 'test' }))
  return {
    PrismaClient: vi.fn(() => ({ redditData: { findMany, count, findUnique } }))
  }
})

describe('Rutas principales', () => {
  it('GET /api responde con documentación básica', async () => {
    const res = await request(app).get('/api')
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('message')
    expect(res.body).toHaveProperty('endpoints')
  })

  it('GET /api/subreddits lista con paginación', async () => {
    const res = await request(app).get('/api/subreddits?page=1&pageSize=1')
    expect(res.status).toBe(200)
    expect(res.body).toMatchObject({ page: 1, pageSize: 1, total: 1 })
    expect(Array.isArray(res.body.rows)).toBe(true)
    expect(res.body.rows.length).toBeGreaterThanOrEqual(1)
  })
})


