// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@sidebase/nuxt-auth'],
  auth: {
    isEnabled: true,
    disableServerSideAuth: false,
    originEnvKey: 'AUTH_ORIGIN',
    baseURL: process.env.AUTH_ORIGIN || 'http://localhost:3000/api/v1/auth',
    provider: {
      type: 'local',
      endpoints: {
        signIn: { path: '/signin', method: 'post' },
        signUp: { path: '/signup', method: 'post' },
        signOut: { path: '/signout', method: 'post' },
        getSession: { path: '/getSession', method: 'get' },
      },
      token: {
        httpOnlyCookieAttribute: true,
      }
    },
    sessionRefresh: {
      enablePeriodically: true,
      enableOnWindowFocus: true,
    }
  },
  alias: {
    css: "/<rootDir>/assets/css",
  },
  css: ["@/assets/css/main.css"],
})