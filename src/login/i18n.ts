/* eslint-disable @typescript-eslint/no-unused-vars */
import { i18nBuilder } from "keycloakify/login";
import type { ThemeName } from "../kc.gen";

/** @see: https://docs.keycloakify.dev/features/i18n */
const { useI18n, ofTypeI18n } = i18nBuilder
    .withCustomTranslations({
        "pt-BR": {
            wellcomeMsg: "Bem vindo à plataforma EVE! 👋",
            formMsg: "Por favor, faça login na sua conta",
            backLogin: "Ja possui conta fazer Login",
            registerMsg: "Planejar eventos começa aqui 🚀",
            registerFormMsg: "Transforme a maneira como você planeja seus eventos.",
            forgotPassword: "Esqueceu a Senha 🔒",
            forgotPasswordFormMsg: "Insira seu e-mail e enviaremos instruções para redefinir sua senha.",
            acceptTerms: "Declaro que li e aceito os termos",
            termsMsg: "Now that we know who you are, I know who I am. I'm not a mistake! It all makes sense! In a comic, you know how you can tell who the arch-villain's going to be? He's the exact opposite of the hero. And most times they're friends, like you and me! I should've known way back when... You know why, David? Because of the kids. They called me Mr Glass.</p><p>Now that we know who you are, I know who I am. I'm not a mistake! It all makes sense! In a comic, you know how you can tell who the arch-villain's going to be? He's the exact opposite of the hero. And most times they're friends, like you and me! I should've known way back when... You know why, David? Because of the kids. They called me Mr Glass.</p><p>Now that we know who you are, I know who I am. I'm not a mistake! It all makes sense! In a comic, you know how you can tell who the arch-villain's going to be? He's the exact opposite of the hero. And most times they're friends, like you and me! I should've known way back when... You know why, David? Because of the kids. They called me Mr Glass.",
            verifyEmailTitle: "Verifique seu e-mail ✉️",
            verifyEmailMsg1: "O link de recuperação de senha da conta foi enviado para o seu endereço de e-mail: ",
            verifyEmailMsg2: "Por favor, siga o link no e-mail para continuar.",
            dontReceiveEmail: "Não recebeu o e-mail?",
            resend: "Reenviar",
            wait: "Aguarde",
            waitMsg: " segundos, para reenviar",
            //update password
            updatePassword: "Redefinir Senha 🔒",
            updatePasswordMsg: "Sua nova senha deve ser diferente das senhas usadas anteriormente.",
            requireMsg: "Sua senha deve conter",
            require1: "O número mínimo de caracteres é 8 e o máximo é 21",
            require2: "Deve conter letras maiúsculas.",
            require3: "Deve conter números.",
            require4: "Deve conter caracteres especiais.",
            equalPasswords: "As senhas não são iguais."
        },
        en: {
            wellcomeMsg: "Welcome to the EVE platform! 👋",
            formMsg: "Please log in to your account",
            backLogin: "Back to Login",
            registerMsg: "Planning events starts here 🚀",
            registerFormMsg: "Transform the way you plan your events.",
            forgotPassword: "Forgot Password 🔒",
            forgotPasswordFormMsg: "Enter your email and we will send you instructions to reset your password.",
            acceptTerms: "I agree to the terms and conditions",
            termsMsg: "Now that we know who you are, I know who I am. I'm not a mistake! It all makes sense! In a comic, you know how you can tell who the arch-villain's going to be? He's the exact opposite of the hero. And most times they're friends, like you and me! I should've known way back when... You know why, David? Because of the kids. They called me Mr Glass.</p><p>Now that we know who you are, I know who I am. I'm not a mistake! It all makes sense! In a comic, you know how you can tell who the arch-villain's going to be? He's the exact opposite of the hero. And most times they're friends, like you and me! I should've known way back when... You know why, David? Because of the kids. They called me Mr Glass.</p><p>Now that we know who you are, I know who I am. I'm not a mistake! It all makes sense! In a comic, you know how you can tell who the arch-villain's going to be? He's the exact opposite of the hero. And most times they're friends, like you and me! I should've known way back when... You know why, David? Because of the kids. They called me Mr Glass.",
            verifyEmailTitle: "Check your email ✉️",
            verifyEmailMsg1: "The account password recovery link has been sent to your email address: ",
            verifyEmailMsg2: "Please follow the link in the email to continue.",
            dontReceiveEmail: "Didn't receive the email?",
            resend: "Resend",
            wait: "Wait",
            waitMsg: " seconds to resend",
            //update password
            updatePassword: "Reset Password 🔒",
            updatePasswordMsg: "Your new password must be different from the passwords you used previously.",
            requireMsg: "Your password must contain",
            require1: "The minimum number of characters is 8 and the maximum is 21",
            require2: "Must contain uppercase letters.",
            require3: "Must contain numbers.",
            require4: "Must contain special characters.",
            equalPasswords: "The passwords are not equal."
        },
        es: {
            wellcomeMsg: "¡Bienvenidos a la plataforma EVE! 👋",
            formMsg: "Por favor inicia sesión en tu cuenta",
            backLogin: "Login",
            registerMsg: "La planificación de eventos comienza aquí 🚀",
            registerFormMsg: "Transforma la forma en que planificas tus eventos.",
            forgotPassword: "Olvidé mi contraseña 🔒",
            forgotPasswordFormMsg: "Ingrese su correo electrónico y le enviaremos instrucciones para restablecer su contraseña.",
            acceptTerms: "Declaro que li e aceito os termos",
            termsMsg: "Now that we know who you are, I know who I am. I'm not a mistake! It all makes sense! In a comic, you know how you can tell who the arch-villain's going to be? He's the exact opposite of the hero. And most times they're friends, like you and me! I should've known way back when... You know why, David? Because of the kids. They called me Mr Glass.</p><p>Now that we know who you are, I know who I am. I'm not a mistake! It all makes sense! In a comic, you know how you can tell who the arch-villain's going to be? He's the exact opposite of the hero. And most times they're friends, like you and me! I should've known way back when... You know why, David? Because of the kids. They called me Mr Glass.</p><p>Now that we know who you are, I know who I am. I'm not a mistake! It all makes sense! In a comic, you know how you can tell who the arch-villain's going to be? He's the exact opposite of the hero. And most times they're friends, like you and me! I should've known way back when... You know why, David? Because of the kids. They called me Mr Glass.",
            verifyEmailTitle: "Revisa tu correo electrónico ✉️",
            verifyEmailMsg1: "El enlace de recuperación de contraseña de la cuenta ha sido enviado a su dirección de correo electrónico: ",
            verifyEmailMsg2: "Siga el enlace del correo electrónico para continuar.",
            dontReceiveEmail: "No recibiste el correo electrónico?",
            resend: "Reenviar",
            wait: "espera",
            waitMsg: "segundos, para reenviar",
            //update password
            updatePassword: "Restablecer contraseña 🔒",
            updatePasswordMsg: "Su nueva contraseña debe ser diferente de las contraseñas que utilizó anteriormente.",
            requireMsg: "Su contraseña debe contener",
            require1: "El número mínimo de caracteres es 8 y el máximo es 21",
            require2: "Debe contener letras mayúsculas.",
            require3: "Debe contener números.",
            require4: "Debe contener caracteres especiales.",
            equalPasswords: "Las contraseñas no son iguales."
        }
    })
    .withThemeName<ThemeName>().build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
