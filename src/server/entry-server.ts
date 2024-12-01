
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function render(_url: string) {
  const html = /* html */`
    <div>
      <a href="https://vite.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
        Typescript Logo
      </a>
      <h1>Hello Vite!</h1>
      <div class="card">
        <button id="counter" type="button"></button>
      </div>
      <p class="read-the-docs">
        Click on the Vite logo to learn more
      </p>
    </div>
  `
  return { html }
}