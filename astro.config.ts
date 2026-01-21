// @ts-check
import react from "@astrojs/react";
import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";
import dotenv from "dotenv";
import starlightThemeBlack from "starlight-theme-black";

// Load Environment Variables
dotenv.config({ path: ".env.local" });

// https://astro.build/config
export default defineConfig({
    env: {
        schema: {
            PUBLIC_SITE_URL: envField.string({
                context: "client",
                access: "public",
            }),
            PUBLIC_SITE_TITLE: envField.string({
                context: "client",
                access: "public",
            }),
            PUBLIC_GITHUB_URL: envField.string({
                context: "client",
                access: "public",
            }),
            PUBLIC_TWITTER_URL: envField.string({
                context: "client",
                access: "public",
            }),
            PUBLIC_GITHUB_REPO_URL: envField.string({
                context: "client",
                access: "public",
            }),
            PUBLIC_SITE_SHORT_TITLE: envField.string({
                context: "client",
                access: "public",
            }),
            PUBLIC_SITE_DESCRIPTION: envField.string({
                context: "client",
                access: "public",
            }),
        },
    },
    integrations: [
        react(),
        starlight({
            title: process.env.PUBLIC_SITE_TITLE!,
            description: process.env.PUBLIC_SITE_DESCRIPTION!,
            customCss: ["./src/styles/globals.css"],
            logo: {
                dark: "./public/favicon-dark.png",
                light: "./public/favicon.png",
                replacesTitle: true,
            },
            editLink: {
                baseUrl: process.env.PUBLIC_GITHUB_REPO_URL,
            },
            social: [
                {
                    icon: "github",
                    label: "GitHub",
                    href: process.env.PUBLIC_GITHUB_URL!,
                },
                {
                    icon: "x.com",
                    label: "X.com",
                    href: process.env.PUBLIC_TWITTER_URL!,
                },
            ],
            sidebar: [
                {
                    label: "Getting Started",
                    items: [
                        {
                            label: "Introduction",
                            slug: "getting-started/introduction",
                        },
                    ],
                },
            ],
            plugins: [
                starlightThemeBlack({
                    navLinks: [
                        {
                            label: "Docs",
                            link: "/getting-started/installation",
                        },
                        {
                            label: "Components",
                            link: "/components",
                        },
                        {
                            label: "Contributing",
                            link: "/contributing",
                        },
                    ],
                    footerText:
                        "Built by [Sikandar](https://www.github.com/sikandarmoyaldev) for use with [Shadcn](https://ui.shadcn.com).",
                }),
            ],
        }),
    ],
    vite: {
        plugins: [tailwindcss()],
        ssr: {
            noExternal: ["zod"],
        },
    },
});
