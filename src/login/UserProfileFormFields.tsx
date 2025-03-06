import { useEffect, Fragment } from "react";
import { assert } from "keycloakify/tools/assert";
import type { KcClsx } from "keycloakify/login/lib/kcClsx";
import {
    useUserProfileForm,
    type FormAction,
    type FormFieldError
} from "keycloakify/login/lib/useUserProfileForm";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import type { Attribute } from "keycloakify/login/KcContext";
import type { KcContext } from "./KcContext";
import type { I18n } from "./i18n";
import { Box, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import React from "react";
import { PasswordRequirements } from "./components/ValidatePassword";
import { MuiTelInput, MuiTelInputCountry } from 'mui-tel-input'

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
                                    kcContext={kcContext}
                                />
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

type InputFieldByTypeProps = {
    attribute: Attribute;
    valueOrValues: string | string[];
    displayableErrors: FormFieldError[];
    dispatchFormAction: React.Dispatch<FormAction>;
    i18n: I18n;
    kcClsx: KcClsx;
    kcContext: KcContext;
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
            const inputNode = <InputTag {...props} fieldIndex={undefined} />;

            const inputPhone = <InputPhoneTag {...props} fieldIndex={undefined} />

            if (attribute.name == "phoneNumber") {
                return (
                    <>
                        {inputPhone}
                    </>
                )
            }

            return inputNode;
        }
    }
}

function InputPhoneTag(props: InputFieldByTypeProps & { fieldIndex: number | undefined }) {
    const { attribute, fieldIndex, i18n, displayableErrors } = props;

    const { advancedMsgStr, currentLanguage } = i18n;

    const [value, setValue] = React.useState('')

    const handleChange = (newValue: string) => {
        setValue(newValue);
        props.dispatchFormAction({ action: "update", name: attribute.name, valueOrValues: newValue });
    };

    const languageToCountryMap: Record<string, MuiTelInputCountry> = {
        "pt-BR": "BR",
        "en": "US",
        "es": "MX",
    };

    const countryCode: MuiTelInputCountry = languageToCountryMap[currentLanguage.languageTag] || "BR";

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <MuiTelInput
                    size="small"
                    error={displayableErrors.find(error => error.fieldIndex === fieldIndex) !== undefined}
                    required={attribute.required}
                    name="phoneNumber"
                    defaultCountry={countryCode}
                    margin="normal"
                    label={advancedMsgStr(attribute.displayName ?? "")}
                    color="success"
                    value={value}
                    onChange={handleChange}
                    sx={{
                        borderRadius: "20px",
                        "& .MuiInputBase-root": {
                            borderRadius: "20px",
                        },
                        "& .MuiInputLabel-root": {
                            borderRadius: "20px",
                        },
                        "& .MuiInputBase-input": {
                            borderRadius: "20px",
                        },
                    }}
                />
            </Box>
            {displayableErrors.some((error) => error.fieldIndex === fieldIndex) && (
                <FormHelperText>
                    {displayableErrors.find((error) => error.fieldIndex === fieldIndex)?.errorMessage}
                </FormHelperText>
            )}
        </>

    );
}

function InputTag(props: InputFieldByTypeProps & { fieldIndex: number | undefined }) {
    const { attribute, fieldIndex, dispatchFormAction, valueOrValues, i18n, displayableErrors } = props;
    const { advancedMsg, advancedMsgStr } = i18n;

    const isArray = Array.isArray(valueOrValues);
    const value = fieldIndex !== undefined && isArray ? valueOrValues[fieldIndex] : valueOrValues;

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <FormControl
            fullWidth
            variant="outlined"
            sx={{ marginBottom: "16px" }}
            error={displayableErrors.some((error) => error.fieldIndex === fieldIndex)}
        >
            <InputLabel size="small" htmlFor={attribute.name} color="success" required={attribute.required}>
                {advancedMsg(attribute.displayName ?? "")}
            </InputLabel>
            <OutlinedInput
                size="small"
                id={attribute.name}
                name={attribute.name}
                label={advancedMsg(attribute.displayName ?? "")}
                color="success"
                sx={{ borderRadius: "20px" }}
                type={attribute.name.includes("password") && !showPassword ? "password" : "text"}
                value={value || ""}
                onChange={(event) => {
                    const newValue =
                        fieldIndex !== undefined && isArray
                            ? (valueOrValues as string[]).map((v, i) => (i === fieldIndex ? event.target.value : v))
                            : event.target.value;

                    dispatchFormAction({ action: "update", name: attribute.name, valueOrValues: newValue });
                }}
                onBlur={() => dispatchFormAction({ action: "focus lost", name: attribute.name, fieldIndex })}
                disabled={attribute.readOnly}
                autoComplete={attribute.autocomplete}
                placeholder={attribute.annotations.inputTypePlaceholder ? advancedMsgStr(attribute.annotations.inputTypePlaceholder) : ""}
                inputProps={{
                    pattern: attribute.annotations.inputTypePattern,
                    size: attribute.annotations.inputTypeSize ? parseInt(`${attribute.annotations.inputTypeSize}`) : undefined,
                    maxLength: attribute.annotations.inputTypeMaxlength ? parseInt(`${attribute.annotations.inputTypeMaxlength}`) : undefined,
                    minLength: attribute.annotations.inputTypeMinlength ? parseInt(`${attribute.annotations.inputTypeMinlength}`) : undefined,
                    max: attribute.annotations.inputTypeMax,
                    min: attribute.annotations.inputTypeMin,
                    step: attribute.annotations.inputTypeStep,
                    ...Object.fromEntries(Object.entries(attribute.html5DataAnnotations ?? {}).map(([key, value]) => [`data-${key}`, value])),
                }}
                fullWidth
                endAdornment={
                    (attribute.name === "password" || attribute.name === "password-confirm") && (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label={showPassword ? 'hide the password' : 'display the password'}
                                onClick={handleClickShowPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    )
                }
            />
            {displayableErrors.some((error) => error.fieldIndex === fieldIndex) && (
                <FormHelperText>
                    {displayableErrors.find((error) => error.fieldIndex === fieldIndex)?.errorMessage}
                </FormHelperText>
            )}
            {attribute.name === "password" && (
                <PasswordRequirements i18n={i18n} password={Array.isArray(value) ? value.join("") : value || ""} />
            )}

        </FormControl>
    );
}

function InputTagSelects(props: InputFieldByTypeProps) {
    const { attribute, dispatchFormAction, kcClsx, i18n, valueOrValues } = props;

    const { classDiv, classInput, classLabel, inputType } = (() => {
        const { inputType } = attribute.annotations;

        assert(inputType === "select-radiobuttons" || inputType === "multiselect-checkboxes");

        switch (inputType) {
            case "select-radiobuttons":
                return {
                    inputType: "radio",
                    classDiv: kcClsx("kcInputClassRadio"),
                    classInput: kcClsx("kcInputClassRadioInput"),
                    classLabel: kcClsx("kcInputClassRadioLabel")
                };
            case "multiselect-checkboxes":
                return {
                    inputType: "checkbox",
                    classDiv: kcClsx("kcInputClassCheckbox"),
                    classInput: kcClsx("kcInputClassCheckboxInput"),
                    classLabel: kcClsx("kcInputClassCheckboxLabel")
                };
        }
    })();

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

    return (
        <>
            {options.map(option => (
                <div key={option} className={classDiv}>
                    <input
                        type={inputType}
                        id={`${attribute.name}-${option}`}
                        name={attribute.name}
                        value={option}
                        className={classInput}
                        aria-invalid={props.displayableErrors.length !== 0}
                        disabled={attribute.readOnly}
                        checked={valueOrValues instanceof Array ? valueOrValues.includes(option) : valueOrValues === option}
                        onChange={event =>
                            dispatchFormAction({
                                action: "update",
                                name: attribute.name,
                                valueOrValues: (() => {
                                    const isChecked = event.target.checked;

                                    if (valueOrValues instanceof Array) {
                                        const newValues = [...valueOrValues];

                                        if (isChecked) {
                                            newValues.push(option);
                                        } else {
                                            newValues.splice(newValues.indexOf(option), 1);
                                        }

                                        return newValues;
                                    }

                                    return event.target.checked ? option : "";
                                })()
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
                    <label
                        htmlFor={`${attribute.name}-${option}`}
                        className={`${classLabel}${attribute.readOnly ? ` ${kcClsx("kcInputClassRadioCheckboxLabelDisabled")}` : ""}`}
                    >
                        {inputLabel(i18n, attribute, option)}
                    </label>
                </div>
            ))}
        </>
    );
}

function TextareaTag(props: InputFieldByTypeProps) {
    const { attribute, dispatchFormAction, kcClsx, displayableErrors, valueOrValues } = props;

    assert(typeof valueOrValues === "string");

    const value = valueOrValues;

    return (
        <textarea
            id={attribute.name}
            name={attribute.name}
            className={kcClsx("kcInputClass")}
            aria-invalid={displayableErrors.length !== 0}
            disabled={attribute.readOnly}
            cols={attribute.annotations.inputTypeCols === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeCols}`)}
            rows={attribute.annotations.inputTypeRows === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeRows}`)}
            maxLength={attribute.annotations.inputTypeMaxlength === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeMaxlength}`)}
            value={value}
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

    return (
        <select
            id={attribute.name}
            name={attribute.name}
            className={kcClsx("kcInputClass")}
            aria-invalid={displayableErrors.length !== 0}
            disabled={attribute.readOnly}
            multiple={isMultiple}
            size={attribute.annotations.inputTypeSize === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeSize}`)}
            value={valueOrValues}
            onChange={event =>
                dispatchFormAction({
                    action: "update",
                    name: attribute.name,
                    valueOrValues: (() => {
                        if (isMultiple) {
                            return Array.from(event.target.selectedOptions).map(option => option.value);
                        }

                        return event.target.value;
                    })()
                })
            }
            onBlur={() =>
                dispatchFormAction({
                    action: "focus lost",
                    name: attribute.name,
                    fieldIndex: undefined
                })
            }
        >
            {!isMultiple && <option value=""></option>}
            {(() => {
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

                return options.map(option => (
                    <option key={option} value={option}>
                        {inputLabel(i18n, attribute, option)}
                    </option>
                ));
            })()}
        </select>
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
