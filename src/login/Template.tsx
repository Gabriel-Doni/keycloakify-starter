import { Grid, Box, Snackbar, FormControl, MenuItem, Select, useMediaQuery, useTheme } from "@mui/material";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import type { KcContext } from "./KcContext";
import type { I18n } from "./i18n";
import Alert from "@mui/material/Alert";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const { kcContext, children, infoNode, i18n } = props;
    const { messagesPerField, message } = kcContext;
    const { currentLanguage, enabledLanguages } = i18n;
    const hasError = messagesPerField.existsError("username", "password");

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Grid margin={0} padding={0} container sx={{ height: "100vh", position: "relative" }}>
            {!isMobile && (
                <Grid
                    xs={12}
                    md={8}
                    sx={{
                        backgroundImage: `url(${import.meta.env.BASE_URL}img/bg-eve.png)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        position: "relative",
                    }}
                />
            )}

            <Grid xs={12} md={4} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                {isMobile && (
                    <Box
                        component="img"
                        src={`${import.meta.env.BASE_URL}img/EVE_LOGOS@2x.svg`}
                        alt="Logo"
                        sx={{
                            width: 300 ,
                            height: "auto",
                            marginBottom: 2,
                        }}
                    />
                )}

                <Box component="form" sx={{ width: "80%", maxWidth: 400 }}>
                    {hasError && message && (
                        <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={hasError} autoHideDuration={5000}>
                            <Alert severity={message?.type} sx={{ width: "100%" }}>
                                {message?.summary}
                            </Alert>
                        </Snackbar>
                    )}
                    {children}
                    {infoNode}

                    {enabledLanguages.length > 1 && (
                        <FormControl fullWidth sx={{ display: "flex", alignItems: "flex-end", marginTop: "16px", width: "auto" }}>
                            <Select
                                color="success"
                                labelId="language-select-label"
                                id="language-select"
                                value={currentLanguage.languageTag}
                                onChange={(event) =>
                                    (window.location.href = enabledLanguages.find((lang) => lang.languageTag === event.target.value)?.href || "")
                                }
                            >
                                {enabledLanguages.map((lang) => (
                                    <MenuItem key={lang.languageTag} value={lang.languageTag}>
                                        {lang.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                </Box>
            </Grid>
        </Grid>
    );
}
