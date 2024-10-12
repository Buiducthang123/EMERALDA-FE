// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@ant-design-vue/nuxt',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxtjs/google-fonts',
    'dayjs-nuxt'
  ],
  googleFonts: {
    display: 'swap',
    families: {
      'Playfair Display': [300, 400, 500, 600, 700],
      'Bai Jamjuree': [300, 400, 500, 600, 700],
    }
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL
    }
  }
})