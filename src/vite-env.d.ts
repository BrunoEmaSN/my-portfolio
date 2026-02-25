/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONTACT_EMAIL: string
  readonly VITE_LINKEDIN_URL: string
  readonly VITE_GITHUB_URL: string
  readonly VITE_INSTAGRAM_URL: string
  readonly VITE_LINKEDIN_USERNAME: string
  readonly VITE_GITHUB_USERNAME: string
  readonly VITE_INSTAGRAM_USERNAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
