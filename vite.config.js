import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    plugins: [
        VitePWA({
            registerType: "autoUpdate",
            includeAssets: [
                "favicon.ico",
                "robots.txt",
                "icons/apple-touch-icon.png",
            ],
            manifest: {
                name: "Mi Aplicación Multitenant",
                short_name: "MiApp",
                description: "Aplicación multitenant PWA",
                theme_color: "#ffffff",
                icons: [
                    {
                        src: "img/logo.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "img/logo.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
            },
            workbox: {
                runtimeCaching: [
                    {
                        urlPattern: /\/tenant_\w+\//, // Coincide con rutas que contienen "tenant_"
                        handler: "CacheFirst",
                        options: {
                            cacheName: "tenant-cache",
                            expiration: {
                                maxEntries: 50,
                                maxAgeSeconds: 30 * 24 * 60 * 60, // Cachea por 30 días
                            },
                        },
                    },
                    {
                        urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
                        handler: "CacheFirst",
                        options: {
                            cacheName: "image-cache",
                            expiration: {
                                maxEntries: 100,
                                maxAgeSeconds: 30 * 24 * 60 * 60,
                            },
                        },
                    },
                ],
            },
        }),

        laravel({
            input: "resources/js/app.jsx",
            refresh: true,
        }),
        react(),
    ],
});
