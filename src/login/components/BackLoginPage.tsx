import { Link, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { I18n } from "../i18n";
import { KcContext } from "../KcContext";

interface BackLoginPageProps {
    kcContext: KcContext;
    i18n: I18n;
}

export const BackLoginPage = ({ kcContext, i18n }: BackLoginPageProps) => {

    const { url } = kcContext;
    const { msg } = i18n;

    return (
        <Link
            underline="none"
            tabIndex={6}
            href={url.loginUrl}
            sx={{ fontSize: "14px", display: "inline-flex", alignItems: "center" }}
        >
            <ArrowBackIcon sx={{ color: "#8DC63F", fontSize: "14px" }} />
            <Typography sx={{ color: "#8DC63F", fontSize: "14px", marginLeft: "4px" }}>
                {msg("backLogin")}
            </Typography>
        </Link>
    );
};
