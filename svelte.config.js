// import adapter from '@sveltejs/adapter-auto';
import adapter from "@sveltejs/adapter-static"
import preprocess from "svelte-preprocess"
// const baseUrl = process.env.BASE_URL || ""
const dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: preprocess(),

    kit: {
        adapter: adapter({
            // default options are shown
            pages: "build",
            assets: "build",
            fallback: null,
        }),
		paths: {
            base: dev ? '' : '/rota-site-front',
        },
		appDir: "internal",
		vite: {
            define: {
                "process.env": process.env,
            },
        },

        // hydrate the <div id="svelte"> element in src/app.html
        // target: "#svelte",
    },
}

export default config
