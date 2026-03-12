import { describe, expect, it } from 'vitest'
import { getAuthProviderConfig } from './authProvider'

function withMetaEnv(
  values: Partial<Record<string, string | undefined>>,
  run: () => void,
) {
  const env = import.meta.env as Record<string, string | undefined>
  const previous: Record<string, string | undefined> = {}

  for (const [key, value] of Object.entries(values)) {
    previous[key] = env[key]
    if (value === undefined) {
      delete env[key]
      continue
    }
    env[key] = value
  }

  try {
    run()
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) {
        delete env[key]
        continue
      }
      env[key] = value
    }
  }
}

describe('getAuthProviderConfig', () => {
  it('defaults to GitHub when provider is not configured', () => {
    withMetaEnv({ VITE_AUTH_PROVIDER: undefined, VITE_AUTH_PROVIDER_LABEL: undefined }, () => {
      expect(getAuthProviderConfig()).toEqual({
        providerId: 'github',
        providerLabel: 'GitHub',
      })
    })
  })

  it('uses configured provider id and derives uppercase label', () => {
    withMetaEnv({ VITE_AUTH_PROVIDER: 'ldap', VITE_AUTH_PROVIDER_LABEL: undefined }, () => {
      expect(getAuthProviderConfig()).toEqual({
        providerId: 'ldap',
        providerLabel: 'LDAP',
      })
    })
  })

  it('prefers explicit provider label when present', () => {
    withMetaEnv({ VITE_AUTH_PROVIDER: 'ldap', VITE_AUTH_PROVIDER_LABEL: 'Corporate OA' }, () => {
      expect(getAuthProviderConfig()).toEqual({
        providerId: 'ldap',
        providerLabel: 'Corporate OA',
      })
    })
  })
})
