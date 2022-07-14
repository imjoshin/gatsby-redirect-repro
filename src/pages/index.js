import * as React from "react"

import Layout from "../components/layout"

const IndexPage = () => (
  <Layout>
    <h1>Redirect repro with splat pages</h1>

    <pre>
      / : /index.js<br/>
      /* : /[...].js<br/>
      /static : /static.js<br/>
      /redirect : redirect in /[...].js<br/>
      /nested/* : /nested/[...].js<br/>
      /nested/static : /nested/static.js<br/>
      /nested/redirect : redirect in /nested/[...].js
    </pre>
  </Layout>
)

export default IndexPage
