import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import React, { useState } from "react";

const PasswordRequirements = ({ i18n, password }: { i18n: I18n, password: string }) => {

    const { msg } = i18n;

    const requirements = [
        { text: msg("require1"), valid: password.length >= 8 },
        { text: msg("require2"), valid: /[A-Z]/.test(password) },
        { text: msg("require3"), valid: /[0-9]/.test(password) },
        { text: msg("require4"), valid: /[^A-Za-z0-9]/.test(password) }
    ];
    return (
        <Box mt={1}>
            {requirements.map((req, index) => (
                <Box key={index} display="flex" alignItems="center" mb={1}>
                    {req.valid ? (
                        <CheckIcon sx={{ fontSize: "12px", color: "green", marginRight: 1 }} />
                    ) : (
                        <ClearIcon sx={{ fontSize: "12px", color: "red", marginRight: 1 }} />
                    )}
                    <Typography fontSize="12px" color={req.valid ? "green" : "red"}>
                        {req.text}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
};

export default function LoginUpdatePassword(props: PageProps<Extract<KcContext, { pageId: "login-update-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { msg, msgStr } = i18n;

    const { url, messagesPerField, isAppInitiatedAction } = kcContext;

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("password", "password-confirm")}
            headerNode={msg("updatePasswordTitle")}
        >

            <Box sx={{ textAlign: "start", marginBottom: "24px" }}>
                <Typography variant="h6" gutterBottom>
                    {msg("updatePassword")}
                </Typography>
                <Typography variant="body1">
                    {msg("updatePasswordMsg")}
                </Typography>
            </Box>
            <form id="kc-passwd-update-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                    <InputLabel color="success" required error={messagesPerField.existsError("password", "password-confirm")} htmlFor="outlined-adornment-password">{msg("passwordNew")}</InputLabel>
                    <OutlinedInput
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        autoFocus
                        color="success"
                        required
                        label={msg("passwordNew")}
                        sx={{
                            borderRadius: "20px",
                        }}
                        autoComplete="new-password"
                        tabIndex={3}
                        error={messagesPerField.existsError("password", "password-confirm")}
                        id="password-new"
                        name="password-new"
                        className={kcClsx("kcInputClass")}
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        showPassword ? 'hide the password' : 'display the password'
                                    }
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <Typography fontSize="14px" >
                    {msg("requireMsg")}
                </Typography>
                <PasswordRequirements i18n={i18n} password={password} />

                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                    <InputLabel color="success" required error={messagesPerField.existsError("password", "password-confirm")} htmlFor="outlined-adornment-password">{msg("passwordConfirm")}</InputLabel>
                    <OutlinedInput
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        color="success"
                        required
                        label={msg("passwordConfirm")}
                        sx={{
                            borderRadius: "20px",
                        }}
                        autoComplete="new-password"
                        tabIndex={3}
                        error={messagesPerField.existsError("password", "password-confirm")}
                        id="password-confirm"
                        name="password-confirm"
                        className={kcClsx("kcInputClass")}
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        showPassword ? 'hide the password' : 'display the password'
                                    }
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                {confirmPassword && password !== confirmPassword && (
                    <Typography mt={1} fontSize="14px" color="red">
                        {msg("equalPasswords")}
                    </Typography>
                )}

                <div className={kcClsx("kcFormGroupClass")}>
                    <LogoutOtherSessions kcClsx={kcClsx} i18n={i18n} />
                    <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>

                        <Button
                            className={kcClsx(
                                "kcButtonClass",
                                "kcButtonPrimaryClass",
                                !isAppInitiatedAction && "kcButtonBlockClass",
                                "kcButtonLargeClass"
                            )} sx={{
                                borderRadius: "20px",
                                background: "#8DC63F",
                                width: "100%",
                                marginTop: "16px",
                                marginBottom: "16px"
                            }}
                            tabIndex={7}
                            type="submit"
                            variant="contained"
                            name="cancel-aia"
                            value="true"
                        >
                            {msgStr("doSubmit")}
                        </Button>
                        {isAppInitiatedAction && (
                            <Button
                                className={kcClsx("kcButtonClass", "kcButtonDefaultClass", "kcButtonLargeClass")}
                                sx={{
                                    borderRadius: "20px",
                                    background: "#8DC63F",
                                    width: "100%",
                                    marginTop: "16px",
                                    marginBottom: "16px"
                                }}
                                tabIndex={7}
                                type="submit"
                                variant="contained"
                                name="cancel-aia"
                                value="true"
                            >
                                {msg("doCancel")}
                            </Button>
                        )}
                    </div>
                </div>
            </form>
        </Template>
    );
}

function LogoutOtherSessions(props: { kcClsx: KcClsx; i18n: I18n }) {
    const { kcClsx, i18n } = props;

    const { msg } = i18n;

    return (
        <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
            <div className={kcClsx("kcFormOptionsWrapperClass")}>
                <div className="checkbox">
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    sx={{
                                        color: "#8DC63F",
                                        '&.Mui-checked': {
                                            color: "#8DC63F",
                                        },
                                    }}
                                    tabIndex={5}
                                    id="logout-sessions"
                                    name="logout-sessions"
                                    defaultChecked={true}
                                    value={"on"}
                                />
                            }
                            label={
                                <Typography fontSize={"14px"}>
                                    {msg("logoutOtherSessions")}
                                </Typography>
                            }
                        />
                    </FormGroup>
                </div>
            </div>
        </div>
    );
}
