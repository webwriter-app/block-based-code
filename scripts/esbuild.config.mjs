import { build, context } from "esbuild";
import path from "path";

/** @type {import("esbuild").BuildOptions} */
const options = {
  write: true,
  bundle: true,
  entryPoints: [
    path.resolve("./widgets/webwriter-block-based-code.ts"),
  ],
  outdir: path.resolve("./dist"),
  target: "es2022",
  format: "esm",
  logLevel: "info",
  loader: {
    ".png": "dataurl",
    ".svg": "dataurl",
  },
  tsconfig: path.resolve("./tsconfig.json")
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
