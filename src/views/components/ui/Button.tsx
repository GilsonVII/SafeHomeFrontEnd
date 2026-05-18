import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
    ViewStyle,
} from 'react-native';
import { getThemeColors } from '@theme/colors';
import { SPACING, BORDER_RADIUS } from '@theme/spacing';
import { FONT_SIZES, FONT_WEIGHTS } from '@theme/typography';

interface Props extends Omit<TouchableOpacityProps, 'style'> {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'ghost';
    loading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
}

export default function Button({
    title,
    onPress,
    variant = 'primary',
    loading = false,
    disabled = false,
    style,
    ...rest
}: Props) {
    const colors = getThemeColors('forest');
    const isDisabled = disabled || loading;

    const containerStyle: ViewStyle = {
        ...styles.base,
        ...(variant === 'primary' && { backgroundColor: colors.primary }),
        ...(variant === 'secondary' && {
            backgroundColor: colors.surface,
            borderColor: colors.primary,
            borderWidth: 1.5,
        }),
        ...(variant === 'ghost' && { backgroundColor: 'transparent' }),
        ...(isDisabled && { opacity: 0.5 }),
        ...style,
    };

    const textColor = variant === 'primary' ? colors.textOnPrimary : colors.primaryDark;

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={isDisabled}
            style={containerStyle}
            accessibilityLabel={title}
            accessibilityRole="button"
            accessibilityState={{ disabled: isDisabled, busy: loading }}
            {...rest}
        >
            {loading ? (
                <ActivityIndicator color={textColor} />
            ) : (
                <Text style={[styles.text, { color: textColor }]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    base: {
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.xl,
        borderRadius: BORDER_RADIUS.md,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 48, 
    },
    text: {
        fontSize: FONT_SIZES.md,
        fontWeight: FONT_WEIGHTS.semibold as any,
    },
});
