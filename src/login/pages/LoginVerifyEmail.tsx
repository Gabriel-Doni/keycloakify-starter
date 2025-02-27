import { useState, useEffect } from "react";
import { Button, Typography, Box } from "@mui/material";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function LoginVerifyEmail(props: PageProps<Extract<KcContext, { pageId: "login-verify-email.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { msg } = i18n;
    const { url, user } = kcContext;

    const [timer, setTimer] = useState(60);
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(interval);
        } else {
            setIsDisabled(false);
        }
    }, [timer]);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo
            headerNode={<Typography variant="h5">{msg("emailVerifyTitle")}</Typography>}
            infoNode={
                <Box display="flex" flexDirection="column" alignItems="start" textAlign="start" mt={2}>
                    <Typography marginBottom={"16px"}  >{msg("verifyEmailMsg1")}{`${user?.email ?? ""} `}{msg("verifyEmailMsg2")}</Typography>

                    <Typography >{msg("dontReceiveEmail")}</Typography>

                    <Button
                        variant="contained"
                        color="primary"
                        href={url.loginAction}
                        disabled={isDisabled}
                        sx={{
                            mt: 2,
                            borderRadius: "20px",
                            background: "#8DC63F",
                            width: "100%",
                            marginBottom: "16px"
                        }}
                    >
                        {msg("resend")}
                    </Button>

                    <Typography fontWeight={"bold"} sx={{ color: "#ffb400" }} variant="body1">{msg("wait")} {`${timer}`} {msg("waitMsg")}</Typography>
                </Box>
            }
        >
            <Typography variant="h4">{msg("verifyEmailTitle")}</Typography>
        </Template>
    );
}
