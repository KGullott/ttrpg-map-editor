import express from 'express'
import { createServer } from 'vite'
import { App } from 'src/client/app/app'

// Constants
// const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 3000
const base = process.env.BASE || '/'

// // Cached production assets
// const templateHtml = isProduction
//   ? await fs.readFile('./dist/client/index.html', 'utf-8')
//   : ''

// Create http server
const app = express()

// Add Vite or respective production middlewares
// let vite: ViteDevServer
// if (!isProduction) {
const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  base,
})
app.use(vite.middlewares)
// } else {
//   app.use(compression())
//   app.use(base, sirv('./dist/client', { extensions: [] }))
// }

// Serve HTML
app.use('*all', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '')

    let template: string
    // if (!isProduction) {
    // Always read fresh template in development
    template = App()
    template = await vite.transformIndexHtml(url, template)
    const render = (await vite.ssrLoadModule('/src/entry-server.js')).render
    // } else {
    //   template = templateHtml
    //   render = (await import('./dist/server/entry-server.js')).render
    // }

    const rendered = await render(url)

    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-html-->`, rendered.html ?? '')

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
  } catch (e) {
    const error = e as Error
    vite?.ssrFixStacktrace(error)
    console.log(error.stack)
    res.status(500).end(error.stack)
  }
})

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
