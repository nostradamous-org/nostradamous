export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'nostradamous',
    meta: [
      { charset: 'utf-8' },
      // { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  loading: {
    color: '#009ca7',
    height: '2.25px',
    continuous: true,
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/css/style.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['@/plugins/api', '@/plugins/toast'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/svg',
    '@nuxtjs/router-extras',
    '@nuxt/typescript-build',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/dotenv',
    'nuxt-lazy-load',
    'nuxt-breakpoints',
  ],

  breakpoints: {
    xs: 321,
    sm: 361,
    md: 601,
    lg: 901,
    xl: 1201,
    options: {
      polyfill: true,
      throttle: 200,
    },
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    proxy: true,
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend(config, { isDev, isClient }) {
      config.node = {
        fs: 'empty',
      }

      // ....
    },
  },

  env: {
    mnemonic: process.env.NUXT_PUBLIC_EVM_MNEMONIC,
    privateKey: process.env.NUXT_PUBLIC_EVM_PRIVATE_KEY,
    isTestnet: process.env.NUXT_PUBLIC_ENVIRONMENT,
  },
  publicRuntimeConfig: {
    loadingColor: '#4ef09d',
  },
}
