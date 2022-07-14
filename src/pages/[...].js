import * as React from "react"

import Layout from "../components/layout"

const REDIRECTS = [
  {
    fromPath: '/redirect/',
    to: 'https://gatsbyjs.com',
    noIndex: true,
  },
]

const UsingSSR = ({ serverData }) => {
  return (
    <Layout>
      <h1>
        This is a root splat page with SSR
      </h1>
      {
        serverData && serverData.message
        ? (
          <img
            style={{ width: "320px", borderRadius: "var(--border-radius)" }}
            alt="A random dog"
            src={serverData.message}
          />
        )
        : (
          <div>
            No serverData
          </div>
        )
      }
    </Layout>
  )
}

export default UsingSSR

export async function getServerData(context) {
  const redirect = REDIRECTS.find(({ fromPath }) => {
    return (
      context.url === fromPath ||
      // check without trailing slash
      context.url === fromPath.slice(0, -1)
    );
  });

  console.log(context.url)

  if (redirect) {
    return {
      status: 301,
      headers: {
        Location: redirect.to,

        // https://developers.google.com/search/docs/advanced/robots/robots_meta_tag#xrobotstag
        ...(redirect.noIndex && { 'X-Robots-Tag': 'noindex' }),
      },
    };
  }


  try {
    const res = await fetch(`https://dog.ceo/api/breed/shiba/images/random`)
    if (!res.ok) {
      throw new Error(`Response failed`)
    }
    return {
      props: await res.json(),
    }
  } catch (error) {
    return {
      status: 500,
      headers: {},
      props: {},
    }
  }
}


