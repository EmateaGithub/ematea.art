# ematea.art

[ematea.art](https://ematea.art) is an officially version-controlled artbook of concepts in [ematea.city](https://ematea.city).

It is basically a gallery that helps track the evolution of art over time.

## How to code here

**Install Everything**

```
pnpm install
```

**Run the app**

```
pnpm dev
```

And go to `localhost:3001`

**Tests?**

The app is so tiny and featureless that tests aren't necessary here. I may add a smoke test in the future, though.

## How this works

A custom tiny Static Site Generator (SSG) converts each individual SVG into a web page. It's all in [./site/build.js](build.js).
