import express from 'express';

import fs from "node:fs";


const { NODE_ENV, PORT, BASE } = process.env;


// Constants
const isProduction = NODE_ENV === 'production'
const port = PORT || 5173;
const base = BASE || '/';
const ABORT_DELAY = 10000;

// Cached production assets
const templateHtml = isProduction
  ? fs.readFileSync( './dist/client/index.html', 'utf-8')
  : ''
const ssrManifest = isProduction
  ? fs.readFileSync( './dist/client/.vite/ssr-manifest.json', 'utf-8')
  : undefined



// router:
const viteRouter = express.Router();


// Add Vite or respective production middlewares
let vite
if (!isProduction) {
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base
  })
  viteRouter.use(vite.middlewares)
} else {
  const compression = (await import('compression')).default
  const sirv = (await import('sirv')).default
  viteRouter.use(compression())
  viteRouter.use(base, sirv('./dist/client', { extensions: [] }))
}


// setImmediate(async ()=> {
// const vite = await createViteServer({
//   server: { middlewareMode: true },
//   appType: 'custom'
// });

viteRouter.use('*', async (req, res, next) => {
  try {
    const url = req.originalUrl.replace(base, '')

    let template
    let render
    if (!isProduction) {
      // Always read fresh template in development
      template = fs.readFileSync('./index.html', 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render
    } else {
      template = templateHtml
      render = (await import('../../../dist/server/entry-server.js')).render
    }

    const appHtml = await render(url, ssrManifest);

    const html = template.replace('<!--ssr-outlet-->', appHtml);

    res.type("html").send(html);
  } catch (e) {
    vite?.ssrFixStacktrace(e)
    console.log(e.stack)
    res.status(500).end(e.stack)
  }
  // try {
  //   // 1. Read index.html
  //   let template = fs.readFileSync(
  //     path.resolve(rootFolder, 'index.html'),
  //     'utf-8',
  //   )

  //   template = await vite.transformIndexHtml(url, template)

  //   const { render } = await vite.ssrLoadModule('/src/entry-server.jsx')

  //   const appHtml = await render(url)
  //   console.log(appHtml);
  //   const html = template.replace(`<!--ssr-outlet-->`, appHtml);

  //   res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
  // } catch (e) {

  //   vite.ssrFixStacktrace(e)
  //   next(e)
  // }

});

// })


 

export default viteRouter;

