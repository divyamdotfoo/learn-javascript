if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,a)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const o=e=>n(e,c),r={module:{uri:c},exports:t,require:o};s[c]=Promise.all(i.map((e=>r[e]||o(e)))).then((e=>(a(...e),t)))}}define(["./workbox-e9849328"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"d084cd47fd1a437d68143d13e1a431b2"},{url:"/_next/static/OdAt3M7N7KKIR3iFIl-cS/_buildManifest.js",revision:"6d8bb99cd0d7e2d0c12a747288c113e6"},{url:"/_next/static/OdAt3M7N7KKIR3iFIl-cS/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/08ffd5a1-94a2f9af038bc4c9.js",revision:"OdAt3M7N7KKIR3iFIl-cS"},{url:"/_next/static/chunks/2196f3df-457c1c0a6ab988be.js",revision:"OdAt3M7N7KKIR3iFIl-cS"},{url:"/_next/static/chunks/527-13f53114904a37f0.js",revision:"OdAt3M7N7KKIR3iFIl-cS"},{url:"/_next/static/chunks/621-e239a75474609c69.js",revision:"OdAt3M7N7KKIR3iFIl-cS"},{url:"/_next/static/chunks/app/%5Blang%5D/page-1955c138fb7e655a.js",revision:"OdAt3M7N7KKIR3iFIl-cS"},{url:"/_next/static/chunks/app/_not-found/page-b797f72c82acd9bb.js",revision:"OdAt3M7N7KKIR3iFIl-cS"},{url:"/_next/static/chunks/app/layout-a962b78d18777a20.js",revision:"OdAt3M7N7KKIR3iFIl-cS"},{url:"/_next/static/chunks/app/page-4b49235abacea131.js",revision:"OdAt3M7N7KKIR3iFIl-cS"},{url:"/_next/static/chunks/framework-6e06c675866dc992.js",revision:"OdAt3M7N7KKIR3iFIl-cS"},{url:"/_next/static/chunks/main-07f971767aa6e1c4.js",revision:"OdAt3M7N7KKIR3iFIl-cS"},{url:"/_next/static/chunks/main-app-02e281c4898c67af.js",revision:"OdAt3M7N7KKIR3iFIl-cS"},{url:"/_next/static/chunks/pages/_app-28019d5cdb6b9a11.js",revision:"OdAt3M7N7KKIR3iFIl-cS"},{url:"/_next/static/chunks/pages/_error-b53f4af58817ac20.js",revision:"OdAt3M7N7KKIR3iFIl-cS"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-84246215a0b95f78.js",revision:"OdAt3M7N7KKIR3iFIl-cS"},{url:"/_next/static/css/02390a41d681cf66.css",revision:"02390a41d681cf66"},{url:"/_next/static/media/97a9b9c5d2a0c527-s.woff2",revision:"5a21e2433dd0433ddc43877d18467e38"},{url:"/_next/static/media/a2117d63e64fe351-s.p.woff2",revision:"14631968d3384a8f413a906f85eb5659"},{url:"/assets/level-up.mp3",revision:"5acc4c358abe356ab34cb46990213c87"},{url:"/assets/success.wav",revision:"d5a884f20ade826001ea9fd93be86345"},{url:"/assets/wrong.mp3",revision:"04739b1bbb541f19ea3c015f1b7e4d05"},{url:"/icons/icon-128x128.png",revision:"a18de40c1cc1efce8d72db863dad825b"},{url:"/icons/icon-144x144.png",revision:"992dcea029fb14ebca46786c5a694b46"},{url:"/icons/icon-152x152.png",revision:"4a438c387d598df0ba10b28edf28b6a6"},{url:"/icons/icon-192x192.png",revision:"b4e34f47ce9bbc0c92f8b9e63d4b94cb"},{url:"/icons/icon-384x384.png",revision:"e5db9ca7474fe7237006def16f5e1ef0"},{url:"/icons/icon-512x512.png",revision:"7033565a83718e6d48543ac0583f221d"},{url:"/icons/icon-72x72.png",revision:"37ada823d7178c43b2577944a0a6d8c9"},{url:"/icons/icon-96x96.png",revision:"89d9ada8b711c4f0aa941ced75726198"},{url:"/manifest.json",revision:"ac759e8a33f11195c45c8f8d6b90e5f6"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/og.jpeg",revision:"cb60d7aa04a1e3e3c35a69511bdecb2e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
