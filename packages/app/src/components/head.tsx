import React from "react";
import NextHead from "next/head";

const defaultDescription = "";
const defaultOGURL = "";
const defaultOGImage = "";

type HeadProps = {
  title: string;
  description?: string;
  url?: string;
  ogImage?: string;
};

const Head: React.SFC<HeadProps> = (props): JSX.Element => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{props.title || ""}</title>
    <meta name="description" content={props.description || defaultDescription} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" sizes="192x192" href="/static/touch-icon.png" />
    <link rel="apple-touch-icon" href="/static/touch-icon.png" />
    <link rel="mask-icon" href="/static/favicon-mask.svg" color="#49B882" />
    <link rel="icon" href="/static/favicon.ico" />
    <meta property="og:url" content={props.url || defaultOGURL} />
    <meta property="og:title" content={props.title || ""} />
    <meta property="og:description" content={props.description || defaultDescription} />
    <meta name="twitter:site" content={props.url || defaultOGURL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={props.ogImage || defaultOGImage} />
    <meta property="og:image" content={props.ogImage || defaultOGImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <script src="https://cdn.jsdelivr.net/npm/peerjs@0.3.20/dist/peer.min.js" />
  </NextHead>
);

export default Head;