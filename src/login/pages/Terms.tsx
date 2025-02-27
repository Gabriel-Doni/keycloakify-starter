import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Typography, Button, Checkbox, FormControlLabel, Box } from "@mui/material";
import { useState } from "react";

export default function Terms(props: PageProps<Extract<KcContext, { pageId: "terms.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });
    const { msg, msgStr } = i18n;
    const { url } = kcContext;

    // Estado para controlar se o checkbox foi marcado
    const [isChecked, setIsChecked] = useState(false);

    // Função para lidar com a alteração do checkbox
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    };

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={msg("termsTitle")}
        >
            <Box
                id="kc-terms-text"
                sx={{
                    maxHeight: '400px',
                    overflowY: 'auto',
                    padding: '10px',
                    borderRadius: '5px',
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#8DC63F transparent',

                    '::-webkit-scrollbar': {
                        width: '12px',
                        borderRadius: '10px',
                    },
                    '::-webkit-scrollbar-thumb': {
                        backgroundColor: '#8DC63F',
                        borderRadius: '10px',
                    },
                    '::-webkit-scrollbar-track': {
                        backgroundColor: 'transparent',
                        borderRadius: '10px',
                    },
                }}
            >
                <Typography variant="body1">
                    {msg("termsMsg")}
                </Typography>
            </Box>

            <FormControlLabel
                control={<Checkbox sx={{
                    color: "#8DC63F",
                    '&.Mui-checked': {
                        color: "#8DC63F",
                    },
                }} checked={isChecked} onChange={handleCheckboxChange} color="primary" />}
                label={msg("acceptTerms")}
                style={{ marginTop: '20px' }}
            />

            <form className="form-actions" action={url.loginAction} method="POST">
                <Button
                    sx={{
                        borderRadius: "20px",
                        background: "#8DC63F",
                        width: "100%",
                        marginBottom: "16px"
                    }}
                    className={kcClsx("kcButtonClass", "kcButtonClass", "kcButtonClass", "kcButtonPrimaryClass", "kcButtonLargeClass")}
                    name="accept"
                    id="kc-accept"
                    type="submit"
                    disabled={!isChecked}
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    {msgStr("doAccept")}
                </Button>
            </form>

            <div className="clearfix" />
        </Template>
    );
}
