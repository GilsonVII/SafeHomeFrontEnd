export type Gender = 'MASCULINO' | 'FEMININO' | 'OUTRO' | 'NAO_INFORMADO';

export interface User {
    id_usuario: number;
    nome: string;
    email: string;
    genero: Gender | null;
    bio?: string | null;
    is_patient: boolean;
    fcm_token?: string | null;
    data_criacao: string;
}

export const getGenderLabel = (g: Gender | null | undefined): string => {
    if (!g) return 'Não informado';
    const labels: Record<Gender, string> = {
        MASCULINO: 'Masculino',
        FEMININO: 'Feminino',
        OUTRO: 'Outro',
        NAO_INFORMADO: 'Prefiro não informar',
    };
    return labels[g];
};
