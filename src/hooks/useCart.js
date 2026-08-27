import { useCallback, useMemo, useState } from 'react'
import { PRODUCTS } from '../data/shop'

/* A cart line is keyed by "productId:packQty" so 6-pc and 11-pc packs of the
   same variety stay separate lines. Shape: { [key]: count }                */

const keyOf = (productId, packQty) => `${productId}:${packQty}`

export function useCart() {
  const [counts, setCounts] = useState({})

  const add = useCallback((productId, packQty) => {
    setCounts((c) => {
      const k = keyOf(productId, packQty)
      return { ...c, [k]: (c[k] ?? 0) + 1 }
    })
  }, [])

  const decrement = useCallback((productId, packQty) => {
    setCounts((c) => {
      const k = keyOf(productId, packQty)
      const next = (c[k] ?? 0) - 1
      if (next <= 0) {
        const { [k]: _removed, ...rest } = c
        return rest
      }
      return { ...c, [k]: next }
    })
  }, [])

  const remove = useCallback((productId, packQty) => {
    setCounts((c) => {
      const { [keyOf(productId, packQty)]: _removed, ...rest } = c
      return rest
    })
  }, [])

  const clear = useCallback(() => setCounts({}), [])

  const countOf = useCallback(
    (productId, packQty) => counts[keyOf(productId, packQty)] ?? 0,
    [counts],
  )

  /* Rebuild rich lines from the id/qty keys so prices always come from
     shop.js — a price edit there is instantly correct, never stale.        */
  const lines = useMemo(() => {
    return Object.entries(counts)
      .map(([k, count]) => {
        const [productId, packQtyStr] = k.split(':')
        const packQty = Number(packQtyStr)
        const product = PRODUCTS.find((p) => p.id === productId)
        const pack = product?.packs.find((p) => p.qty === packQty)
        if (!product || !pack) return null
        return {
          key: k,
          product,
          packQty,
          unitPrice: pack.price,
          count,
          subtotal: pack.price * count,
          pieces: packQty * count,
        }
      })
      .filter(Boolean)
      .sort((a, b) => a.key.localeCompare(b.key))
  }, [counts])

  const total = useMemo(() => lines.reduce((s, l) => s + l.subtotal, 0), [lines])
  const totalPieces = useMemo(() => lines.reduce((s, l) => s + l.pieces, 0), [lines])
  const totalPacks = useMemo(() => lines.reduce((s, l) => s + l.count, 0), [lines])

  return {
    lines,
    total,
    totalPieces,
    totalPacks,
    isEmpty: lines.length === 0,
    add,
    decrement,
    remove,
    clear,
    countOf,
  }
}
