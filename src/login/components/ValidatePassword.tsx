import { Box, Typography } from "@mui/material";
import { I18n } from "../i18n";
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';

export const PasswordRequirements = ({ i18n, password }: { i18n: I18n, password: string }) => {

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