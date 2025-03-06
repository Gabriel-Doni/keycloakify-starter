import { Attribute } from "keycloakify/login";
import { FormFieldError, FormAction } from "keycloakify/login/lib/getUserProfileApi";
import { KcClsx } from "keycloakify/login/lib/kcClsx";
import { I18n } from "../i18n";

export type InputFieldByTypeProps = {
    attribute: Attribute;
    valueOrValues: string | string[];
    displayableErrors: FormFieldError[];
    dispatchFormAction: React.Dispatch<FormAction>;
    i18n: I18n;
    kcClsx: KcClsx;
};
