const esbuild = require('esbuild');
const sassPlugin = require("esbuild-plugin-sass");

esbuild.build({
  bundle: true,
  outdir: 'src/public/dist', 
  entryPoints: ['src/app.tsx'], // src included in path bc builder.js called from 'dev' script in package.json
  target: ['chrome58', 'firefox57', 'safari11', 'edge18'], 
  plugins: [sassPlugin({
    rootDir: './scss'
  })],
})