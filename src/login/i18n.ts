/* eslint-disable @typescript-eslint/no-unused-vars */
import { i18nBuilder } from "keycloakify/login";
import type { ThemeName } from "../kc.gen";

/** @see: https://docs.keycloakify.dev/features/i18n */
const { useI18n, ofTypeI18n } = i18nBuilder
    .withCustomTranslations({
        "pt-BR": {
            wellcomeMsg: "Bem vindo à plataforma EVE! 👋",
            formMsg: "Por favor, faça login na sua conta",
            login: "Login"
        },
        en: {
            wellcomeMsg: "Welcome to the EVE platform! 👋",
            formMsg: "Please log in to your account",
            login: "Login"
        },
        es: {
            wellcomeMsg: "¡Bienvenidos a la plataforma EVE! 👋",
            formMsg: "Por favor inicia sesión en tu cuenta",
            login: "Login"
        }
    })
    .withThemeName<ThemeName>().build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
