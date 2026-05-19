import React from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useHomeVM } from "@viewmodels/useHomeVM";
import { getThemeColors } from "@theme/colors";
import { SPACING, BORDER_RADIUS } from "@theme/spacing";
import { FONT_SIZES, FONT_WEIGHTS } from "@theme/typography";

export default function HomeScreen() {
  const vm = useHomeVM();
  const colors = getThemeColors("forest");

  // Decide a cor do status baseado no valor recebido da API.
  const getCorDoStatus = (): string => {
    if (!vm.status) return colors.textSecondary;
    switch (vm.status.status) {
      case "Estável":
        return colors.status.success;
      case "Atenção":
        return colors.status.warning;
      case "Crítico":
        return colors.status.danger;
      default:
        return colors.textSecondary;
    }
  };
}
