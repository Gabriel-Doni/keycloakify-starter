import { useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField, Typography } from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import React from "react";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username", "password")}
            headerNode={msg("loginAccountTitle")}
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <Box sx={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
                    <Link
                        fontSize={"14px"}
                        sx={{ color: "#8DC63F" }}
                        underline="none" tabIndex={8} href={url.registrationUrl}>
                        {msg("doRegister")}
                    </Link>
                </Box>
            }
            socialProvidersNode={
                <>
                    {realm.password && social?.providers !== undefined && social.providers.length !== 0 && (
                        <div id="kc-social-providers" className={kcClsx("kcFormSocialAccountSectionClass")}>
                            <hr />
                            <h2>{msg("identity-provider-login-label")}</h2>
                            <ul className={kcClsx("kcFormSocialAccountListClass", social.providers.length > 3 && "kcFormSocialAccountListGridClass")}>
                                {social.providers.map((...[p, , providers]) => (
                                    <li key={p.alias}>
                                        <a
                                            id={`social-${p.alias}`}
                                            className={kcClsx(
                                                "kcFormSocialAccountListButtonClass",
                                                providers.length > 3 && "kcFormSocialAccountGridItem"
                                            )}
                                            type="button"
                                            href={p.loginUrl}
                                        >
                                            {p.iconClasses && <i className={clsx(kcClsx("kcCommonLogoIdP"), p.iconClasses)} aria-hidden="true"></i>}
                                            <span
                                                className={clsx(kcClsx("kcFormSocialAccountNameClass"), p.iconClasses && "kc-social-icon-text")}
                                                dangerouslySetInnerHTML={{ __html: kcSanitize(p.displayName) }}
                                            ></span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            }
        >
            <Box sx={{ textAlign: "start", marginBottom: "24px" }}>
                <Typography variant="h6" gutterBottom>
                    {msg("wellcomeMsg")}
                </Typography>
                <Typography variant="body1">
                    {msg("formMsg")}
                </Typography>
            </Box>
            <div id="kc-form">
                <div id="kc-form-wrapper" style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}>
                    {realm.password && (
                        <form
                            id="kc-form-login"
                            onSubmit={() => {
                                setIsLoginButtonDisabled(true);
                                return true;
                            }}
                            action={url.loginAction}
                            method="post"
                        >
                            {!usernameHidden && (
                                <TextField
                                    size="small"
                                    color="success"
                                    error={messagesPerField.existsError("username", "password")}
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
                            )}

                            <div className={kcClsx("kcFormGroupClass")}>
                                <FormControl sx={{ width: '100%' }} variant="outlined">
                                    <InputLabel size="small" color="success" required error={messagesPerField.existsError("username", "password")} htmlFor="outlined-adornment-password">{msg("password")}</InputLabel>
                                    <OutlinedInput
                                        size="small"
                                        color="success"
                                        required
                                        label={msg("password")}
                                        sx={{
                                            borderRadius: "20px",
                                            width: "100%",
                                            marginBottom: "16px"
                                        }}
                                        autoComplete="current-password"
                                        tabIndex={3}
                                        error={messagesPerField.existsError("username", "password")}
                                        name="password"
                                        id="outlined-adornment-password"
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


                                {usernameHidden && messagesPerField.existsError("username", "password") && (
                                    <span
                                        id="input-error"
                                        className={kcClsx("kcInputErrorMessageClass")}
                                        aria-live="polite"
                                        dangerouslySetInnerHTML={{
                                            __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                        }}
                                    />
                                )}
                            </div>

                            <div className={kcClsx("kcFormGroupClass", "kcFormSettingClass")} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                {realm.rememberMe && !usernameHidden && (
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
                                                    id="rememberMe"
                                                    name="rememberMe"
                                                    defaultChecked={!!login.rememberMe}
                                                />
                                            }
                                            label={
                                                <Typography fontSize={"14px"}>
                                                    {msg("rememberMe")}
                                                </Typography>
                                            }
                                        />
                                    </FormGroup>

                                )}

                                {realm.resetPasswordAllowed && (
                                    <Link
                                        underline="none"
                                        tabIndex={6}
                                        href={url.loginResetCredentialsUrl}
                                        sx={{ fontSize: "14px" }}
                                    >
                                        <Typography
                                            sx={{ color: "#8DC63F" }}
                                            fontSize={"14px"}
                                        >
                                            {msg("doForgotPassword")}
                                        </Typography>
                                    </Link>
                                )}
                            </div>

                            <div id="kc-form-buttons" className={kcClsx("kcFormGroupClass")}>
                                <input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />
                                <Button
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
                                    name="login"
                                    disabled={isLoginButtonDisabled}
                                >
                                    {msgStr("doLogIn")}
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </Template>
    );
}
