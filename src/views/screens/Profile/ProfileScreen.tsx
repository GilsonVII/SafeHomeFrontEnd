import React from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProfileVM } from '@viewmodels/useProfileVM';
import Input from '@components/ui/Input';
import Button from '@components/ui/Button';
import { getThemeColors } from '@theme/colors';
import { SPACING, BORDER_RADIUS } from '@theme/spacing';
import { FONT_SIZES, FONT_WEIGHTS } from '@theme/typography';

// Tela de Perfil 2 modos


export default function ProfileScreen() {
    const vm = useProfileVM();
    const colors = getThemeColors('forest');

    // Tela de loading 
    if (vm.carregando) {
        return (
            <SafeAreaView style={[styles.container, styles.center, { backgroundColor: colors.background }]}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
                    Carregando perfil...
                </Text>
            </SafeAreaView>
        );
    }

    // Se falhou ao carregar 
    if (!vm.perfil) {
        return (
            <SafeAreaView style={[styles.container, styles.center, { backgroundColor: colors.background }]}>
                <Text style={[styles.errorText, { color: colors.textPrimary }]}>
                    😕 Não foi possível carregar seu perfil
                </Text>
                <Button title="Voltar" variant="ghost" onPress={vm.voltar} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">

                    {/* HEADER */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={vm.voltar} style={styles.backButton} accessibilityLabel="Voltar" accessibilityRole="button">
                            <Text style={[styles.backIcon, { color: colors.primaryDark }]}>←</Text>
                        </TouchableOpacity>

                        <Text style={[styles.title, { color: colors.primaryDark }]}>Perfil</Text>

                        {!vm.editando && (
                            <TouchableOpacity onPress={vm.iniciarEdicao} style={styles.editButton} accessibilityLabel="Editar perfil" accessibilityRole="button">
                                <Text style={[styles.editText, { color: colors.primary }]}>Editar</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* AVATAR + NOME */}
                    <View style={styles.avatarSection}>
                        <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
                            <Text style={[styles.avatarText, { color: colors.textOnPrimary }]}>
                                {vm.primeiroNome.charAt(0).toUpperCase()}
                            </Text>
                        </View>
                        {!vm.editando && (
                            <Text style={[styles.bigName, { color: colors.primaryDark }]}>
                                {vm.perfil.nome}
                            </Text>
                        )}
                    </View>

                    {/* MODO VISUALIZAÇÃO */}
                    {!vm.editando && (
                        <View>
                            <InfoRow label="E-mail" value={vm.perfil.email} colors={colors} />
                            <InfoRow label="Gênero" value={vm.getGeneroLabel(vm.perfil.genero)} colors={colors} />
                            <InfoRow label="Bio" value={vm.perfil.bio || '— Sem bio ainda —'} colors={colors} multiline />

                            <Text style={[styles.footer, { color: colors.textSecondary }]}>
                                Membro desde{' '}
                                {new Date(vm.perfil.data_criacao).toLocaleDateString('pt-BR', {
                                    day: '2-digit', month: 'long', year: 'numeric',
                                })}
                            </Text>
                        </View>
                    )}

                    {/* MODO EDIÇÃO */}
                    {vm.editando && (
                        <View>
                            <Input
                                label="Nome"
                                value={vm.nomeEdit}
                                onChangeText={vm.setNomeEdit}
                                autoCapitalize="words"
                                error={vm.erros.nome}
                                editable={!vm.salvando}
                            />

                            {/* E-mail trancado */}
                            <View style={styles.lockedField}>
                                <Text style={[styles.label, { color: colors.textSecondary }]}>
                                    E-mail (não editável)
                                </Text>
                                <View style={[styles.lockedValue, { backgroundColor: colors.surfaceTinted, borderColor: colors.border }]}>
                                    <Text style={{ color: colors.textSecondary }}>🔒 {vm.perfil.email}</Text>
                                </View>
                            </View>

                            {/* Seletor de gênero */}
                            <View style={styles.generoSection}>
                                <Text style={[styles.label, { color: colors.textSecondary }]}>Gênero</Text>
                                <View style={styles.generoGrid}>
                                    {vm.opcoesGenero.map((opcao) => {
                                        const selecionado = vm.generoEdit === opcao.value;
                                        return (
                                            <TouchableOpacity
                                                key={opcao.value}
                                                onPress={() => vm.setGeneroEdit(opcao.value)}
                                                style={[
                                                    styles.generoOpcao,
                                                    {
                                                        backgroundColor: selecionado ? colors.primary : colors.surface,
                                                        borderColor: selecionado ? colors.primary : colors.border,
                                                    },
                                                ]}
                                                disabled={vm.salvando}
                                                accessibilityRole="radio"
                                                accessibilityState={{ selected: selecionado }}
                                            >
                                                <Text style={{
                                                    color: selecionado ? colors.textOnPrimary : colors.textPrimary,
                                                    fontWeight: selecionado ? '600' : '400',
                                                    fontSize: FONT_SIZES.sm,
                                                }}>
                                                    {opcao.label}
                                                </Text>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                            </View>

                            <Input
                                label={`Bio (${vm.bioEdit.length}/200)`}
                                value={vm.bioEdit}
                                onChangeText={vm.setBioEdit}
                                placeholder="Conte um pouco sobre você..."
                                multiline
                                numberOfLines={3}
                                maxLength={200}
                                style={{ height: 80, textAlignVertical: 'top' }}
                                error={vm.erros.bio}
                                editable={!vm.salvando}
                            />

                            <View style={styles.editActions}>
                                <Button title="Cancelar" variant="ghost" onPress={vm.cancelarEdicao} disabled={vm.salvando} style={{ flex: 1 }} />
                                <Button title="Salvar" onPress={vm.salvarEdicao} loading={vm.salvando} style={{ flex: 1, marginLeft: SPACING.sm }} />
                            </View>
                        </View>
                    )}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

// Subcomponente: linha de info no modo visualização
function InfoRow({ label, value, colors, multiline = false }: { label: string; value: string; colors: any; multiline?: boolean; }) {
    return (
        <View style={[styles.infoRow, { borderBottomColor: colors.borderSubtle }]}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>{label}</Text>
            <Text style={[styles.infoValue, { color: colors.textPrimary }, multiline && { lineHeight: 22 }]}>
                {value}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    center: { alignItems: 'center', justifyContent: 'center' },
    loadingText: { marginTop: SPACING.md, fontSize: FONT_SIZES.md },
    errorText: { fontSize: FONT_SIZES.lg, marginBottom: SPACING.lg },
    scrollContent: { padding: SPACING.xl, paddingTop: SPACING.lg },
    header: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.xl },
    backButton: { padding: SPACING.sm, marginLeft: -SPACING.sm },
    backIcon: { fontSize: 28, fontWeight: '500' },
    title: { flex: 1, fontSize: FONT_SIZES.xxl, fontWeight: FONT_WEIGHTS.bold as any, marginLeft: SPACING.sm },
    editButton: { padding: SPACING.sm },
    editText: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.semibold as any },
    avatarSection: { alignItems: 'center', marginBottom: SPACING.xl },
    avatar: { width: 100, height: 100, borderRadius: BORDER_RADIUS.pill, alignItems: 'center', justifyContent: 'center', marginBottom: SPACING.md },
    avatarText: { fontSize: 40, fontWeight: FONT_WEIGHTS.bold as any },
    bigName: { fontSize: FONT_SIZES.xl, fontWeight: FONT_WEIGHTS.semibold as any },
    infoRow: { paddingVertical: SPACING.md, borderBottomWidth: 1 },
    infoLabel: { fontSize: FONT_SIZES.xs, marginBottom: SPACING.xs, textTransform: 'uppercase', letterSpacing: 0.5 },
    infoValue: { fontSize: FONT_SIZES.md },
    footer: { textAlign: 'center', fontSize: FONT_SIZES.xs, marginTop: SPACING.xxl, fontStyle: 'italic' },
    label: { fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.medium as any, marginBottom: SPACING.xs, marginLeft: SPACING.xs },
    lockedField: { marginBottom: SPACING.md },
    lockedValue: { borderWidth: 1, borderRadius: BORDER_RADIUS.md, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md, minHeight: 48, justifyContent: 'center' },
    generoSection: { marginBottom: SPACING.md },
    generoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
    generoOpcao: { paddingVertical: SPACING.md, paddingHorizontal: SPACING.lg, borderRadius: BORDER_RADIUS.md, borderWidth: 1.5, minWidth: '45%', alignItems: 'center' },
    editActions: { flexDirection: 'row', marginTop: SPACING.lg },
});