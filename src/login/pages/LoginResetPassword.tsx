import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Box, Button, TextField, Typography } from "@mui/material";
import { BackLoginPage } from "../components/BackLoginPage";  // Importando o componente

export default function LoginResetPassword(props: PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, realm, messagesPerField } = kcContext;
    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo
            displayMessage={!messagesPerField.existsError("username")}
            headerNode={msg("emailForgotTitle")}
        >
            <Box sx={{ textAlign: "start", marginBottom: "24px" }}>
                <Typography variant="h6" gutterBottom>
                    {msg("forgotPassword")}
                </Typography>
                <Typography variant="body1">
                    {msg("forgotPasswordFormMsg")}
                </Typography>
            </Box>

            <form id="kc-reset-password-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                <div className={kcClsx("kcFormGroupClass")}>
                    <TextField
                        color="success"
                        error={messagesPerField.existsError("username")}
                        autoFocus
                        name="username"
                        autoComplete="username"
                        sx={{
                            borderRadius: "20px",
                            width: "100%",
                            marginBottom: "16px",
                        }}
                        className={kcClsx("kcInputClass")}
                        required
                        id="outlined-basic"
                        label={!realm.loginWithEmailAllowed
                            ? msg("username")
                            : !realm.registrationEmailAsUsername
                                ? msg("usernameOrEmail")
                                : msg("email")}
                        variant="outlined"
                        InputProps={{
                            sx: {
                                borderRadius: "20px",
                            },
                        }}
                    />
                </div>

                <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                    <Button
                        className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                        sx={{
                            borderRadius: "20px",
                            background: "#8DC63F",
                            width: "100%",
                            marginBottom: "16px"
                        }}
                        tabIndex={7}
                        type="submit"
                        variant="contained"
                        name="login"
                    >
                        {msgStr("doSubmit")}
                    </Button>
                </div>
            </form>

            <Box sx={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
                <BackLoginPage kcContext={kcContext} i18n={i18n} />  
            </Box>
        </Template>
    );
}
