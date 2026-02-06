// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    srcDir: "app/",
    serverDir: "server/",
    modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "nuxt-icon"],
    css: ["~/assets/css/tailwind.css"],
    typescript: {
        strict: true,
    },
});
