import { Config } from "release-it";

// eslint-disable-next-line import/no-default-export
export default {
  git: {
    requireBranch: "main",
    commitArgs: [
      "--no-verify",
    ],
  },
  gitlab: {
    release: true,
    // eslint-disable-next-line no-template-curly-in-string
    releaseName: "v${version}",
  },
  hooks: {
    "before:init": ["npm run build"],
  },
  plugins: {
    "@release-it/conventional-changelog": {
      infile: "CHANGELOG.md",
      ignoreRecommendedBump: true,
      header: "# Changelog",
      preset: "conventionalcommits",
    },
  },
} satisfies Config;
