import type { JSX } from "keycloakify/tools/JSX";
import { useEffect, Fragment, useState } from "react";
import { assert } from "keycloakify/tools/assert";
import type { KcClsx } from "keycloakify/login/lib/kcClsx";
import {
    useUserProfileForm,
    getButtonToDisplayForMultivaluedAttributeField,
    type FormAction,
    type FormFieldError
} from "keycloakify/login/lib/useUserProfileForm";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import type { Attribute } from "keycloakify/login/KcContext";
import type { KcContext } from "./KcContext";
import type { I18n } from "./i18n";
import { Alert, Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, MenuItem, Radio, RadioGroup, Select, Snackbar, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import React from "react";
import { MuiTelInput } from 'mui-tel-input'
import { PasswordRequirements } from "./components/ValidatePassword";

export default function UserProfileFormFields(props: UserProfileFormFieldsProps<KcContext, I18n>) {
    const { kcContext, i18n, kcClsx, onIsFormSubmittableValueChange, doMakeUserConfirmPassword, BeforeField, AfterField } = props;

    const { advancedMsg } = i18n;

    const {
        formState: { formFieldStates, isFormSubmittable },
        dispatchFormAction
    } = useUserProfileForm({
        kcContext,
        i18n,
        doMakeUserConfirmPassword
    });

    useEffect(() => {
        onIsFormSubmittableValueChange(isFormSubmittable);
    }, [isFormSubmittable]);

    const groupNameRef = { current: "" };

    return (
        <>
            {formFieldStates.map(({ attribute, displayableErrors, valueOrValues }) => {
                return (
                    <Fragment key={attribute.name}>
                        <GroupLabel attribute={attribute} groupNameRef={groupNameRef} i18n={i18n} kcClsx={kcClsx} />
                        {BeforeField !== undefined && (
                            <BeforeField
                                attribute={attribute}
                                dispatchFormAction={dispatchFormAction}
                                displayableErrors={displayableErrors}
                                valueOrValues={valueOrValues}
                                kcClsx={kcClsx}
                                i18n={i18n}
                            />
                        )}
                        <div
                            className={kcClsx("kcFormGroupClass")}
                            style={{
                                display: attribute.name === "password-confirm" && !doMakeUserConfirmPassword ? "none" : undefined
                            }}
                        >

                            {/* Comentei pra retirar a label em cima dos campos pra deixar padronizado */}
                            <div className={kcClsx("kcLabelWrapperClass")}>
                                {/* <label htmlFor={attribute.name} className={kcClsx("kcLabelClass")}>
                                    {advancedMsg(attribute.displayName ?? "")}
                                </label>
                                {attribute.required && <> *</>} */}
                            </div>
                            <div className={kcClsx("kcInputWrapperClass")}>
                                {attribute.annotations.inputHelperTextBefore !== undefined && (
                                    <div
                                        className={kcClsx("kcInputHelperTextBeforeClass")}
                                        id={`form-help-text-before-${attribute.name}`}
                                        aria-live="polite"
                                    >
                                        {advancedMsg(attribute.annotations.inputHelperTextBefore)}
                                    </div>
                                )}
                                <InputFieldByType
                                    attribute={attribute}
                                    valueOrValues={valueOrValues}
                                    displayableErrors={displayableErrors}
                                    dispatchFormAction={dispatchFormAction}
                                    kcClsx={kcClsx}
                                    i18n={i18n}
                                />
                                <FieldErrors attribute={attribute} displayableErrors={displayableErrors} kcClsx={kcClsx} fieldIndex={undefined} />
                                {attribute.annotations.inputHelperTextAfter !== undefined && (
                                    <div
                                        className={kcClsx("kcInputHelperTextAfterClass")}
                                        id={`form-help-text-after-${attribute.name}`}
                                        aria-live="polite"
                                    >
                                        {advancedMsg(attribute.annotations.inputHelperTextAfter)}
                                    </div>
                                )}

                                {AfterField !== undefined && (
                                    <AfterField
                                        attribute={attribute}
                                        dispatchFormAction={dispatchFormAction}
                                        displayableErrors={displayableErrors}
                                        valueOrValues={valueOrValues}
                                        kcClsx={kcClsx}
                                        i18n={i18n}
                                    />
                                )}
                                {/* NOTE: Downloading of html5DataAnnotations scripts is done in the useUserProfileForm hook */}
                            </div>
                        </div>
                    </Fragment>
                );
            })}
        </>
    );
}

function GroupLabel(props: {
    attribute: Attribute;
    groupNameRef: {
        current: string;
    };
    i18n: I18n;
    kcClsx: KcClsx;
}) {
    const { attribute, groupNameRef, i18n, kcClsx } = props;

    const { advancedMsg } = i18n;

    if (attribute.group?.name !== groupNameRef.current) {
        groupNameRef.current = attribute.group?.name ?? "";

        if (groupNameRef.current !== "") {
            assert(attribute.group !== undefined);

            return (
                <div
                    className={kcClsx("kcFormGroupClass")}
                    {...Object.fromEntries(Object.entries(attribute.group.html5DataAnnotations).map(([key, value]) => [`data-${key}`, value]))}
                >
                    {(() => {
                        const groupDisplayHeader = attribute.group.displayHeader ?? "";
                        const groupHeaderText = groupDisplayHeader !== "" ? advancedMsg(groupDisplayHeader) : attribute.group.name;

                        return (
                            <div className={kcClsx("kcContentWrapperClass")}>
                                <label id={`header-${attribute.group.name}`} className={kcClsx("kcFormGroupHeader")}>
                                    {groupHeaderText}
                                </label>
                            </div>
                        );
                    })()}
                    {(() => {
                        const groupDisplayDescription = attribute.group.displayDescription ?? "";

                        if (groupDisplayDescription !== "") {
                            const groupDescriptionText = advancedMsg(groupDisplayDescription);

                            return (
                                <div className={kcClsx("kcLabelWrapperClass")}>
                                    <label id={`description-${attribute.group.name}`} className={kcClsx("kcLabelClass")}>
                                        {groupDescriptionText}
                                    </label>
                                </div>
                            );
                        }

                        return null;
                    })()}
                </div>
            );
        }
    }

    return null;
}

function FieldErrors(props: { attribute: Attribute; displayableErrors: FormFieldError[]; fieldIndex: number | undefined; kcClsx: KcClsx }) {
    const { attribute, fieldIndex, kcClsx } = props;

    const displayableErrors = props.displayableErrors.filter(error => error.fieldIndex === fieldIndex);

    const [, setOpenSnackbar] = useState(false);


    if (displayableErrors.length === 0) {
        return null;
    }

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <span
            id={`input-error-${attribute.name}${fieldIndex === undefined ? "" : `-${fieldIndex}`}`}
            className={kcClsx("kcInputErrorMessageClass")}
            aria-live="polite"
        >
            {displayableErrors
                .filter(error => error.fieldIndex === fieldIndex)
                .map(({ errorMessage }, i) => (

                    <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={displayableErrors.length > 0}
                        onClose={handleCloseSnackbar}
                        key={i}
                    >
                        <Alert
                            onClose={handleCloseSnackbar}
                            severity="error"
                        >
                            {errorMessage}
                        </Alert>
                    </Snackbar>

                ))
            }
        </span >
    );
}

type InputFieldByTypeProps = {
    attribute: Attribute;
    valueOrValues: string | string[];
    displayableErrors: FormFieldError[];
    dispatchFormAction: React.Dispatch<FormAction>;
    i18n: I18n;
    kcClsx: KcClsx;
};

function InputFieldByType(props: InputFieldByTypeProps) {
    const { attribute, valueOrValues } = props;

    switch (attribute.annotations.inputType) {
        case "textarea":
            return <TextareaTag {...props} />;
        case "select":
        case "multiselect":
            return <SelectTag {...props} />;
        case "select-radiobuttons":
        case "multiselect-checkboxes":
            return <InputTagSelects {...props} />;
        default: {
            if (valueOrValues instanceof Array) {
                return (
                    <>
                        {valueOrValues.map((...[, i]) => (
                            <InputTag key={i} {...props} fieldIndex={i} />
                        ))}
                    </>
                );
            }

            if (attribute.name === "phoneNumber") {
                return (
                    <InputPhoneTag {...props} />
                )
            }


            const inputNode = <InputTag {...props} fieldIndex={undefined} />;

            if (attribute.name === "password" || attribute.name === "password-confirm") {
                return (
                    <PasswordWrapper kcClsx={props.kcClsx} i18n={props.i18n} passwordInputId={attribute.name}>
                        {inputNode}
                    </PasswordWrapper>
                );
            }

            return inputNode;
        }
    }
}

function InputPhoneTag(props: InputFieldByTypeProps) {
    const { attribute, dispatchFormAction } = props;
    const [value, setValue] = React.useState("");

    return (
        <Box sx={{ borderRadius: "20px", display: "flex", flexDirection: "column", gap: 2 }}>
            <MuiTelInput
                sx={{
                    borderRadius: "20px",
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "20px",
                    },
                }}
                required
                name="phoneNumber"
                defaultCountry={"BR"}
                margin="normal"
                label={"Celular"}
                color="success"
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);

                    dispatchFormAction({
                        action: "update",
                        name: attribute.name,
                        valueOrValues: newValue,
                    });

                    document.querySelector("input[name='phoneNumber']")?.dispatchEvent(new Event("input", { bubbles: true }));
                }}
            />
        </Box>
    );
}


function PasswordWrapper(props: {
    kcClsx: KcClsx;
    i18n: I18n;
    passwordInputId: string;
    children: JSX.Element;
}) {
    const { kcClsx, children, passwordInputId, i18n } = props;

    const { msg } = i18n;

    const [password, setPassword] = useState<string>('');
    const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
        validatePassword(newPassword);
    };

    const validatePassword = (password: string) => {
        const minLength = password.length >= 8;
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const hasUppercase = /[A-Z]/.test(password);

        setIsPasswordValid(minLength && hasSpecialChar && hasUppercase);
    };

    return (
        <div className={kcClsx("kcInputGroup")}>
            {React.cloneElement(children, {
                type: 'password',
                value: password,
                onChange: handlePasswordChange,
                id: passwordInputId,
            })}
            <Typography fontSize="14px" >
                {msg("requireMsg")}
            </Typography>
            <PasswordRequirements i18n={i18n} password={password} />
        </div>
    );
}

function InputTag(props: InputFieldByTypeProps & { fieldIndex: number | undefined }) {
    const { attribute, fieldIndex, kcClsx, dispatchFormAction, valueOrValues, i18n, displayableErrors } = props;

    const { advancedMsgStr } = i18n;

    return (
        <>
            <TextField
                InputProps={{
                    sx: {
                        borderRadius: "20px",
                    },
                }}
                margin="normal"
                color="success"
                required={attribute.required}
                label={advancedMsgStr(attribute.displayName ?? "")}
                type={(() => {
                    const { inputType } = attribute.annotations;

                    if (inputType?.startsWith("html5-")) {
                        return inputType.slice(6);
                    }

                    return inputType ?? "text";
                })()}
                id={attribute.name}
                name={attribute.name}
                value={(() => {
                    if (fieldIndex !== undefined) {
                        assert(valueOrValues instanceof Array);
                        return valueOrValues[fieldIndex];
                    }

                    assert(typeof valueOrValues === "string");

                    return valueOrValues;
                })()}
                className={kcClsx("kcInputClass")}
                error={displayableErrors.find(error => error.fieldIndex === fieldIndex) !== undefined}
                disabled={attribute.readOnly}
                autoComplete={attribute.autocomplete}
                placeholder={
                    attribute.annotations.inputTypePlaceholder === undefined ? undefined : advancedMsgStr(attribute.annotations.inputTypePlaceholder)
                }
                inputProps={{
                    pattern: attribute.annotations.inputTypePattern,
                    size: attribute.annotations.inputTypeSize === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeSize}`),
                    maxLength: attribute.annotations.inputTypeMaxlength === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeMaxlength}`),
                    minLength: attribute.annotations.inputTypeMinlength === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeMinlength}`),
                    max: attribute.annotations.inputTypeMax,
                    min: attribute.annotations.inputTypeMin,
                    step: attribute.annotations.inputTypeStep,
                    ...Object.fromEntries(Object.entries(attribute.html5DataAnnotations ?? {}).map(([key, value]) => [`data-${key}`, value])),
                }}
                onChange={event =>
                    dispatchFormAction({
                        action: "update",
                        name: attribute.name,
                        valueOrValues: (() => {
                            if (fieldIndex !== undefined) {
                                assert(valueOrValues instanceof Array);

                                return valueOrValues.map((value, i) => {
                                    if (i === fieldIndex) {
                                        return event.target.value;
                                    }

                                    return value;
                                });
                            }

                            return event.target.value;
                        })()
                    })
                }
                onBlur={() =>
                    dispatchFormAction({
                        action: "focus lost",
                        name: attribute.name,
                        fieldIndex: fieldIndex
                    })
                }
                fullWidth
            />
            {(() => {
                if (fieldIndex === undefined) {
                    return null;
                }

                assert(valueOrValues instanceof Array);

                const values = valueOrValues;

                return (
                    <>
                        <FieldErrors attribute={attribute} kcClsx={kcClsx} displayableErrors={displayableErrors} fieldIndex={fieldIndex} />
                        <AddRemoveButtonsMultiValuedAttribute
                            attribute={attribute}
                            values={values}
                            fieldIndex={fieldIndex}
                            dispatchFormAction={dispatchFormAction}
                            i18n={i18n}
                        />
                    </>
                );
            })()}
        </>
    );
}

function AddRemoveButtonsMultiValuedAttribute(props: {
    attribute: Attribute;
    values: string[];
    fieldIndex: number;
    dispatchFormAction: React.Dispatch<Extract<FormAction, { action: "update" }>>;
    i18n: I18n;
}) {
    const { attribute, values, fieldIndex, dispatchFormAction, i18n } = props;

    const { msg } = i18n;

    const { hasAdd, hasRemove } = getButtonToDisplayForMultivaluedAttributeField({ attribute, values, fieldIndex });

    const idPostfix = `-${attribute.name}-${fieldIndex + 1}`;

    return (
        <>
            {hasRemove && (
                <Button
                    id={`kc-remove${idPostfix}`}
                    type="button"
                    variant="outlined"
                    color="secondary"
                    startIcon={<RemoveIcon />}
                    onClick={() =>
                        dispatchFormAction({
                            action: "update",
                            name: attribute.name,
                            valueOrValues: values.filter((_, i) => i !== fieldIndex)
                        })
                    }
                    sx={{ marginRight: 1 }}
                >
                    {msg("remove")}
                </Button>
            )}
            {hasAdd && (
                <Button
                    id={`kc-add${idPostfix}`}
                    type="button"
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() =>
                        dispatchFormAction({
                            action: "update",
                            name: attribute.name,
                            valueOrValues: [...values, ""]
                        })
                    }
                >
                    {msg("addValue")}
                </Button>
            )}
        </>
    );
}

function InputTagSelects(props: InputFieldByTypeProps) {
    const { attribute, dispatchFormAction, i18n, valueOrValues } = props;

    const isRadio = attribute.annotations.inputType === "select-radiobuttons";
    const isCheckbox = attribute.annotations.inputType === "multiselect-checkboxes";

    assert(isRadio || isCheckbox);

    const options = (() => {
        walk: {
            const { inputOptionsFromValidation } = attribute.annotations;

            if (inputOptionsFromValidation === undefined) {
                break walk;
            }

            const validator = (attribute.validators as Record<string, { options?: string[] }>)[inputOptionsFromValidation];

            if (validator === undefined) {
                break walk;
            }

            if (validator.options === undefined) {
                break walk;
            }

            return validator.options;
        }

        return attribute.validators.options?.options ?? [];
    })();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { checked, value } = event.target;

        dispatchFormAction({
            action: "update",
            name: attribute.name,
            valueOrValues: isCheckbox
                ? checked
                    ? [...(valueOrValues || []), value]
                    : Array.isArray(valueOrValues) ? valueOrValues.filter((v) => v !== value) : []
                : value
        });
    };

    return (
        <FormControl component="fieldset" disabled={attribute.readOnly} error={props.displayableErrors.length !== 0}>
            <FormLabel component="legend">{attribute.displayName}</FormLabel>
            {isRadio ? (
                <RadioGroup name={attribute.name} value={valueOrValues} onChange={handleChange}>
                    {options.map(option => (
                        <FormControlLabel
                            key={option}
                            value={option}
                            control={<Radio />}
                            label={inputLabel(i18n, attribute, option)}
                        />
                    ))}
                </RadioGroup>
            ) : (
                <FormGroup>
                    {options.map(option => (
                        <FormControlLabel
                            key={option}
                            control={
                                <Checkbox
                                    checked={valueOrValues instanceof Array ? valueOrValues.includes(option) : false}
                                    onChange={handleChange}
                                    value={option}
                                />
                            }
                            label={inputLabel(i18n, attribute, option)}
                        />
                    ))}
                </FormGroup>
            )}
        </FormControl>
    );
}

function TextareaTag(props: InputFieldByTypeProps) {
    const { attribute, dispatchFormAction, kcClsx, displayableErrors, valueOrValues } = props;

    assert(typeof valueOrValues === "string");

    return (
        <TextField
            color="success"
            id={attribute.name}
            name={attribute.name}
            className={kcClsx("kcInputClass")}
            error={displayableErrors.length !== 0}
            disabled={attribute.readOnly}
            multiline
            fullWidth
            minRows={attribute.annotations.inputTypeRows === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeRows}`)}
            inputProps={{
                maxLength: attribute.annotations.inputTypeMaxlength === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeMaxlength}`)
            }}
            value={valueOrValues}
            onChange={event =>
                dispatchFormAction({
                    action: "update",
                    name: attribute.name,
                    valueOrValues: event.target.value
                })
            }
            onBlur={() =>
                dispatchFormAction({
                    action: "focus lost",
                    name: attribute.name,
                    fieldIndex: undefined
                })
            }
        />
    );
}

function SelectTag(props: InputFieldByTypeProps) {
    const { attribute, dispatchFormAction, kcClsx, displayableErrors, i18n, valueOrValues } = props;

    const isMultiple = attribute.annotations.inputType === "multiselect";

    const options = (() => {
        walk: {
            const { inputOptionsFromValidation } = attribute.annotations;

            if (inputOptionsFromValidation === undefined) {
                break walk;
            }

            assert(typeof inputOptionsFromValidation === "string");

            const validator = (attribute.validators as Record<string, { options?: string[] }>)[inputOptionsFromValidation];

            if (validator === undefined) {
                break walk;
            }

            if (validator.options === undefined) {
                break walk;
            }

            return validator.options;
        }

        return attribute.validators.options?.options ?? [];
    })();

    return (
        <Select
            margin="dense"
            id={attribute.name}
            name={attribute.name}
            className={kcClsx("kcInputClass")}
            error={displayableErrors.length !== 0}
            disabled={attribute.readOnly}
            multiple={isMultiple}
            value={valueOrValues}
            onChange={event =>
                dispatchFormAction({
                    action: "update",
                    name: attribute.name,
                    valueOrValues: isMultiple ? event.target.value : event.target.value
                })
            }
            onBlur={() =>
                dispatchFormAction({
                    action: "focus lost",
                    name: attribute.name,
                    fieldIndex: undefined
                })
            }
            displayEmpty
            fullWidth
        >
            {!isMultiple && <MenuItem value=""><em>Selecione...</em></MenuItem>}
            {options.map(option => (
                <MenuItem key={option} value={option}>
                    {inputLabel(i18n, attribute, option)}
                </MenuItem>
            ))}
        </Select>
    );
}

function inputLabel(i18n: I18n, attribute: Attribute, option: string) {
    const { advancedMsg } = i18n;

    if (attribute.annotations.inputOptionLabels !== undefined) {
        const { inputOptionLabels } = attribute.annotations;

        return advancedMsg(inputOptionLabels[option] ?? option);
    }

    if (attribute.annotations.inputOptionLabelsI18nPrefix !== undefined) {
        return advancedMsg(`${attribute.annotations.inputOptionLabelsI18nPrefix}.${option}`);
    }

    return option;
}
