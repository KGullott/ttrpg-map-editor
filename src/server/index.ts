import express, { Response, Request } from 'express'
import { createServer as createViteServer, ViteDevServer } from 'vite'
import fs from 'node:fs/promises'
import compression from 'compression'
import sirv from 'sirv'


// Constants
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 3000
const base = process.env.BASE || '/'

const templateHtml = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : ''

async function createServer() {
  const app = express()

  // Create Vite server in middleware mode and configure the app type as
  // 'custom', disabling Vite's own HTML serving logic so parent server
  // can take control
  let vite: ViteDevServer
  if (!isProduction) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
      base,
    })
    // Use vite's connect instance as middleware. If you use your own
    // express router (express.Router()), you should use router.use
    // When the server restarts (for example after the user modifies
    // vite.config.js), `vite.middlewares` is still going to be the same
    // reference (with a new internal stack of Vite and plugin-injected
    // middlewares). The following is valid even after restarts.
    app.use(vite.middlewares)
  } else {
    app.use(compression())
    app.use(base, sirv('./dist/client', { extensions: [] }))
  }

  app.use('*all', async (req: Request, res: Response) => {
    try {
      const url = req.originalUrl.replace(base, '');
      // 1. Read index.html
      let template: string
      let render
      if (!isProduction) {
        // 2. Apply Vite HTML transforms. This injects the Vite HMR client,
        //    and also applies HTML transforms from Vite plugins, e.g. global
        //    preambles from @vitejs/plugin-react
        //    Always read fresh template in development
        template = await fs.readFile('./src/client/app/index.html', 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        // 3. Load the server entry. ssrLoadModule automatically transforms
        //    ESM source code to be usable in Node.js! There is no bundling
        //    required, and provides efficient invalidation similar to HMR.
        render = (await vite.ssrLoadModule('./src/server/entry-server.ts')).render
      } else {
        template = templateHtml
        // @ts-expect-error: disabling implicit any
        render = (await import('./dist/server/entry-server.js')).render
      }

      // 4. render the app HTML. This assumes entry-server.js's exported
      //     `render` function calls appropriate framework SSR APIs,
      //    e.g. ReactDOMServer.renderToString()
      const appHtml = await render(url)

      // 5. Inject the app-rendered HTML into the template.
      const html = template.replace(`<!--ssr-outlet-->`, () => appHtml)

      // 6. Send the rendered HTML back.
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      const error = e as Error
      vite?.ssrFixStacktrace(error)
      console.log(error.stack)
      res.status(500).end(error.stack)
    }
  })

  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
  })
}

createServer()