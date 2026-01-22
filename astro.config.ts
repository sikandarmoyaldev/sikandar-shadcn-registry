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
            PUBLIC_GITHUB_REPO_NAME: envField.string({
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
                light: "./src/assets/logo/favicon.png",
                dark: "./src/assets/logo/favicon-dark.png",
                replacesTitle: true,
            },
            editLink: {
                baseUrl: `${process.env.PUBLIC_GITHUB_REPO_URL}/tree/main`,
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
                        {
                            label: "Installation",
                            slug: "getting-started/installation",
                        },
                    ],
                },
                {
                    label: "Components",
                    autogenerate: { directory: "components" },
                },
                {
                    label: "Contributing",
                    items: [
                        { label: "Introduction", slug: "contributing" },
                        {
                            label: "Component Request",
                            slug: "contributing/component-request",
                        },
                        {
                            label: "Feature Request",
                            slug: "contributing/feature-request",
                        },
                        {
                            label: "Contributing Code",
                            slug: "contributing/contributing-code",
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
                    footerText: `Built by [Sikandar](https://github.com/sikandarmoyaldev) for use with [Shadcn](https://ui.shadcn.com).`,
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
