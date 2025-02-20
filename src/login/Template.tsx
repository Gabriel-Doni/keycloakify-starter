import { Grid, Box, Snackbar, FormControl, MenuItem, Select } from "@mui/material";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import type { KcContext } from "./KcContext";
import type { I18n } from "./i18n";
import Alert from '@mui/material/Alert';

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        kcContext,
        children,
        infoNode,
        i18n,
    } = props;

    const { messagesPerField, message } = kcContext;
    const { currentLanguage, enabledLanguages } = i18n;
    const hasError = messagesPerField.existsError("username", "password");

    return (
        <Grid container sx={{ height: "100vh" }}>
            <Grid
            xs={12} md={8} sx={{ backgroundImage: `url(${import.meta.env.BASE_URL}img/bg-eve.png)`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <Grid xs={12} md={4} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Box component="form" sx={{ width: "80%", maxWidth: 400 }}>
                    {hasError && message && (
                        <Snackbar
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            open={hasError}
                            autoHideDuration={5000}
                        >
                            <Alert severity={message?.type} sx={{ width: '100%' }}>
                                {message?.summary}
                            </Alert>
                        </Snackbar>
                    )}
                    {children}
                    {infoNode}
                </Box>
            </Grid>

            {enabledLanguages.length > 1 && (
                <FormControl fullWidth sx={{ position: "absolute", bottom: 16, right: 16, width: "auto" }}>
                    <Select
                        color="success"
                        labelId="language-select-label"
                        id="language-select"
                        value={currentLanguage.languageTag}
                        onChange={(event) => window.location.href = enabledLanguages.find(lang => lang.languageTag === event.target.value)?.href || ""}
                    >
                        {enabledLanguages.map((lang) => (
                            <MenuItem key={lang.languageTag} value={lang.languageTag}>
                                {lang.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
        </Grid>
    );
}
