export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  runtimeConfig: {
    databaseUrl: '',
    public: {
      url: '',
    },
    google: {
      clientId: '',
      clientSecret: '',
    },
    stripe: {
      publishableKey: '',
      secretKey: '',
      webhookSecret: '',
    },
  },
  modules: ['@nuxt/ui', '@formkit/auto-animate/nuxt', '@nuxtjs/plausible', '@nuxtjs/tailwindcss', '@sidebase/nuxt-auth'],
  ui: {
    global: true,
    // icons: ['solar', 'tabler', 'octicon', 'devicon', 'logos'],
  },

  plausible: {
    domain: process.env.PLAUSIBLE_DOMAIN,
    apiHost: process.env.PLAUSIBLE_API_HOST ?? 'https://plausible.io',
    trackLocalhost: true,
  },

  compatibilityDate: '2024-04-03',

  auth: {
    originEnvKey: 'AUTH_ORIGIN',
    baseURL: process.env.AUTH_ORIGIN || 'http://localhost:3000/api/v1/auth/',
    provider: {
      type: 'local',
      endpoints: {
        signIn: { path: 'signin', method: 'post' },
        signUp: { path: 'signup', method: 'post' },
        signOut: { path: 'signout', method: 'post' },
        getSession: { path: 'getSession', method: 'get' },
      },
      session: {
        dataType: {
          id: 'string',
          email: 'string',
          name: 'string',
          createdAt: 'Date',
          updatedAt: 'Date',
        },
      },
    },
  },
})