export const STORAGE_KEYS = {
    SECURE: {
        AUTH_TOKEN: 'safehome_auth_token',       // JWT recebido no login
        USER_ID:    'safehome_user_id',          // ID do usuário logado
    },
    LOCAL: {
        THEME_MODE:          '@safehome/settings/theme_mode',           // 'light' | 'dark' | 'system'
        COLOR_THEME:         '@safehome/settings/color_theme',          // 'forest' | 'ocean' | ...
        FONT_SIZE:           '@safehome/settings/font_size',            // 1 a 4
        EMERGENCY_NARRATION: '@safehome/settings/emergency_narration',  // boolean
        REDUCE_MOTION:       '@safehome/settings/reduce_motion',        // boolean
        HIGH_CONTRAST:       '@safehome/settings/high_contrast',        // boolean
        ONBOARDING_DONE:     '@safehome/onboarding_done',               // boolean
    },
} as const;