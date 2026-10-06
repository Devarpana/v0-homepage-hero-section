import { useCallback, useEffect, useRef, useState } from 'react'
import { adminError } from '@/lib/admin'

interface QueryResult<T> {
  data: T | null
  error: { message: string } | null
}

/**
 * Loads data for an admin screen. `query` should return a supabase-js query (they are
 * awaitable). The latest `query` is always used, so it can close over component state.
 */
export function useAdminQuery<T>(query: () => PromiseLike<QueryResult<T>>) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const queryRef = useRef(query)
  queryRef.current = query

  const reload = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await queryRef.current()
      if (result.error) setError(adminError(result.error))
      else setData(result.data)
    } catch (err) {
      setError(adminError(err))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  return { data, setData, error, loading, reload }
}
