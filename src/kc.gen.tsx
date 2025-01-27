// This file is auto-generated by the `update-kc-gen` command. Do not edit it manually.
// Hash: ce85c8038177a1f7c884784ebf36800e6cbcd60f2a34a13a27cb749deb4ec188

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

import { lazy, Suspense, type ReactNode } from "react";

export type ThemeName = "v3-with-direct-impersonation";

export const themeNames: ThemeName[] = ["v3-with-direct-impersonation"];

export type KcEnvName = never;

export const kcEnvNames: KcEnvName[] = [];

export const kcEnvDefaults: Record<KcEnvName, string> = {};

/**
 * NOTE: Do not import this type except maybe in your entrypoint.
 * If you need to import the KcContext import it either from src/login/KcContext.ts or src/account/KcContext.ts.
 * Depending on the theme type you are working on.
 */
export type KcContext = import("./admin/KcContext").KcContext;

declare global {
    interface Window {
        kcContext?: KcContext;
    }
}

export const KcAdminPage = lazy(() => import("./admin/KcPage"));

export function KcPage(props: { kcContext: KcContext; fallback?: ReactNode }) {
    const { kcContext, fallback } = props;
    return (
        <Suspense fallback={fallback}>
            {(() => {
                switch (kcContext.themeType) {
                    case "admin":
                        return <KcAdminPage kcContext={kcContext} />;
                }
            })()}
        </Suspense>
    );
}
