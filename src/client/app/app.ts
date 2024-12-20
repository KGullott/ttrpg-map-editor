export const App = () => {
    return /*html*/`
    <!DOCTYPE html>
    <html>
        <head>
            <title>TTRPG Map Editor</title>
            <script src="https://unpkg.com/htmx.org@2.0.3" integrity="sha384-0895/pl2MU10Hqc6jd4RvrthNlDiE9U1tWmX7WRESftEDRosgxNsQG/Ze9YMRzHq" crossorigin="anonymous"></script>
            <link rel="stylesheet" href="/styles.css">
        </head>

        <body>
            <header>
                <h1>Header</h1>
            </header>

            <main>
                <div class="icon-bar">Icon Bar - Dropdowns for map, tokens</div>
                <div class="map-container">here is where map goes</div>
            </main>
        </body>
    </html>
    `
}