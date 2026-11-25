'use client'

import { useEffect } from 'react'

// Intercept console.error at module evaluation time (before hydration begins)
if (typeof window !== 'undefined') {
  try {
    let internalError = window.console.error

    // Using Object.defineProperty ensures our filter remains active even if
    // Next.js dev overlay or React devtools rebinds window.console.error
    Object.defineProperty(window.console, 'error', {
      configurable: true,
      enumerable: true,
      get() {
        return function filteredConsoleError(...args: unknown[]) {
          // Check if error is related to browser extension attributes (Bitdefender bis_skin_checked, Grammarly, etc.)
          const fullMessage = args
            .map((arg) => {
              if (typeof arg === 'string') return arg
              if (arg instanceof Error) return `${arg.name}: ${arg.message} \n ${arg.stack || ''}`
              try {
                return JSON.stringify(arg)
              } catch {
                return String(arg)
              }
            })
            .join(' ')

          // Suppress browser extension hydration pollution & extension runtime errors
          if (
            fullMessage.includes('bis_skin_checked') ||
            fullMessage.includes('bis_register') ||
            fullMessage.includes('data-gr-ext-installed') ||
            fullMessage.includes('data-new-gr-c-s-check-loaded') ||
            fullMessage.includes('chrome-extension://') ||
            fullMessage.includes('moz-extension://') ||
            fullMessage.includes("reading 'M_ID'")
          ) {
            return
          }

          if (typeof internalError === 'function') {
            internalError.apply(window.console, args)
          }
        }
      },
      set(newErrorFn) {
        internalError = newErrorFn
      },
    })
  } catch {
    // Fallback if Object.defineProperty is restricted
  }

  // Intercept uncaught errors & unhandled rejections from browser extensions before Next.js overlay catches them
  try {
    const win = window as unknown as Record<string, unknown>
    if (!win.__antiExtErrorHooked) {
      win.__antiExtErrorHooked = true

      const isExtensionError = (src?: string, msg?: string, stack?: string) => {
        return Boolean(
          (src && (src.startsWith('chrome-extension://') || src.startsWith('moz-extension://'))) ||
            (stack && (stack.includes('chrome-extension://') || stack.includes('moz-extension://'))) ||
            (msg && (msg.includes('chrome-extension://') || msg.includes("reading 'M_ID'")))
        )
      }

      window.addEventListener(
        'error',
        (event: ErrorEvent) => {
          if (isExtensionError(event.filename, event.message, event.error?.stack)) {
            event.stopImmediatePropagation()
            event.preventDefault()
          }
        },
        true
      )

      window.addEventListener(
        'unhandledrejection',
        (event: PromiseRejectionEvent) => {
          const reason = event.reason as { message?: string; stack?: string } | undefined
          const msg = reason?.message || String(reason || '')
          const stack = reason?.stack || ''
          if (isExtensionError('', msg, stack)) {
            event.stopImmediatePropagation()
            event.preventDefault()
          }
        },
        true
      )
    }
  } catch {
    // Ignore listener errors
  }
}

export function AntiExtensionCleaner() {
  useEffect(() => {
    // 1. Clean existing extension attributes already in DOM
    const cleanExtensionAttributes = () => {
      try {
        const polluted = document.querySelectorAll('[bis_skin_checked], [bis_register]')
        polluted.forEach((el) => {
          el.removeAttribute('bis_skin_checked')
          el.removeAttribute('bis_register')
        })
      } catch {}
    }

    cleanExtensionAttributes()

    // 2. Observe and immediately remove future extension attribute injections
    let observer: MutationObserver | null = null
    try {
      observer = new MutationObserver((mutations) => {
        for (let i = 0; i < mutations.length; i++) {
          const m = mutations[i]
          if (
            m.type === 'attributes' &&
            m.attributeName &&
            (m.attributeName.startsWith('bis_') || m.attributeName.startsWith('data-gr-'))
          ) {
            ;(m.target as HTMLElement).removeAttribute?.(m.attributeName)
          }
        }
      })

      observer.observe(document.documentElement, {
        attributes: true,
        subtree: true,
      })
    } catch {}

    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [])

  return null
}
