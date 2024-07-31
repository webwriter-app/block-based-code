import { build, context } from "esbuild";
import path from "path";

/** @type {import("esbuild").BuildOptions} */
const options = {
  entryPoints: [
    path.resolve("./widgets/webwriter-blocks.ts"),
  ],
  bundle: true,
  outdir: path.resolve("./dist"),
  format: "esm",
  loader: {
    ".png": "dataurl",
    ".svg": "dataurl",
  },
  tsconfig: path.resolve("./tsconfig.json"),
  logLevel: "info",
  external: [
    "*.css",
  ],
};

const dev = process.env.NODE_ENV === "development";

if (dev) {
  const ctx = await context({
    ...options,
    sourcemap: "external",
  });
  await ctx.watch();
} else {
  await build({
    ...options,
    minify: true,
    dropLabels: ["DEV"],
  });
}
