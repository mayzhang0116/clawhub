const DEFAULT_AUTH_PROVIDER_ID = 'github'
const DEFAULT_AUTH_PROVIDER_LABEL = 'GitHub'

function normalizeProviderId(value: string | undefined) {
  const normalized = value?.trim().toLowerCase()
  if (!normalized) return DEFAULT_AUTH_PROVIDER_ID
  return normalized
}

function normalizeProviderLabel(value: string | undefined, providerId: string) {
  const trimmed = value?.trim()
  if (trimmed) return trimmed
  if (providerId === DEFAULT_AUTH_PROVIDER_ID) return DEFAULT_AUTH_PROVIDER_LABEL
  return providerId.toUpperCase()
}

export function getAuthProviderConfig() {
  const providerId = normalizeProviderId(import.meta.env.VITE_AUTH_PROVIDER)
  const providerLabel = normalizeProviderLabel(import.meta.env.VITE_AUTH_PROVIDER_LABEL, providerId)
  return {
    providerId,
    providerLabel,
  }
}
