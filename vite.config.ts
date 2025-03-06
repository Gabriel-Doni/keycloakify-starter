import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { keycloakify } from "keycloakify/vite-plugin";
import { buildEmailTheme } from "keycloakify-emails";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        keycloakify({
            themeName: "custom-eve",
            extraThemeProperties: ["public"],
            accountThemeImplementation: "none",
            // postBuild: async (buildContext) => {
            //     await buildEmailTheme({
            //         templatesSrcDirPath: import.meta.dirname + "/emails/templates",
            //         themeNames: buildContext.themeNames,
            //         keycloakifyBuildDirPath: buildContext.keycloakifyBuildDirPath,
            //         locales: ["en", "pt-BR"],
            //         cwd: import.meta.dirname,
            //         i18nSourceFile: import.meta.dirname + "/emails/i18n.ts",
            //     });
            // },
        }),
    ],
});