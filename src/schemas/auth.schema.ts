import z from "zod";

const VALUES = ["user", "business", "institution", "admin"] as const;

export const loginSchema = z.object({
    body: z.object({
        username: z.string()
            .nonempty('El nombre de usuario es requerido.')
            .min(6, "Se necesita un minimo de 6 caracteres para el nombre de usuario."),
        password: z.string()
            .nonempty('La contraseña es requerida.')
            .min(6, "Se necesita un minimo de 6 caracteres para su contraseña.")
    }),
});

export const registerSchema = z.object({
    body: z.object({
        username: z.string().nonempty('El nombre de usuario es requerido.').min(6, "Se necesita un minimo de 6 caracteres para el nombre de usuario."),
        password: z.string().nonempty('La contraseña es requerida.').min(6, "Se necesita un minimo de 6 caracteres para su contraseña."),
        email: z.string().nonempty('El email es requerido.').email(),
        role: z.enum(VALUES)
    }),
});

