import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';
import { env } from 'process';

const baseFolder =
    env.APPDATA !== undefined && env.APPDATA !== ''
        ? `${env.APPDATA}/ASP.NET/https`
        : `${env.HOME}/.aspnet/https`;

const certificateName = "thriftshopecommerce.client";
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

if (!fs.existsSync(baseFolder)) {
    fs.mkdirSync(baseFolder, { recursive: true });
}

if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
    if (0 !== child_process.spawnSync('dotnet', [
        'dev-certs',
        'https',
        '--export-path',
        certFilePath,
        '--format',
        'Pem',
        '--no-password',
    ], { stdio: 'inherit', }).status) {
        throw new Error("Could not create certificate.");
    }
}

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:7125';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [plugin()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        proxy: {
            '^/weatherforecast': {
                target,
                secure: false
            },
            '^/pingauth': {
                target,
                secure: false
            },
            '^/register': {
                target,
                secure: false
            },
            '^/login': {
                target,
                secure: false
            },
            '^/logout': {
                target,
                secure: false
            },
            '^/item': {
                target,
                secure: false
            },
            '^/item/\\d+$': {
                target,
                secure: false
            },
            '^/collection': {
                target,
                secure: false
            },
            '^/collection/\\d+$': {
                target,
                secure: false
            },
            '^/category': {
                target,
                secure: false
            },
            '^/category/\\d+$': {
                target,
                secure: false
            },
            '^/fit': {
                target,
                secure: false
            },
            '^/fit/\\d+$': {
                target,
                secure: false
            },
            '^/cart': {
                target,
                secure: false
            },
            '^/order': {
                target,
                secure: false
            },
            '^/order/\\d+$': {
                target,
                secure: false
            },
        },
        port: 58551,
        https: {
            key: fs.readFileSync(keyFilePath),
            cert: fs.readFileSync(certFilePath),
        }
    }
})
