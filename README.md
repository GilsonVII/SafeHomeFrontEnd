<div align="center">
  
  # 🏡 SafeHome App
  **Segurança, Autonomia e Cuidado através da Internet das Coisas (IoT)**
  
  <p align="center">
    <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
    <img src="https://img.shields.io/badge/Zustand-443E38?style=for-the-badge&logo=react&logoColor=white" alt="Zustand" />
  </p>

</div>

---

## 📖 Sobre o Projeto
O **SafeHome** é um ecossistema mobile focado em acessibilidade, saúde mental e suporte à vida. Desenvolvido com foco em idosos, pessoas neurodivergentes (TEA, TDAH) e indivíduos em crise de ansiedade, o app atua como uma central de controle residencial e monitoramento de bem-estar, conectando o usuário à sua rede de apoio em tempo real.

O diferencial do SafeHome é a sua interface calma e não-intrusiva (Glassmorphism), aliada a um poderoso motor IoT capaz de integrar soluções customizadas (ESP32) e dispositivos comerciais de mercado.

## ✨ Features Principais
* **🚨 Botão de Pânico Integrado:** Acionamento rápido com *haptic feedback* para avisar a rede de contatos.
* **💡 Gateway IoT Universal:** Controle de lâmpadas, portas e sensores através de ESP32, integrações Tuya/SmartLife e Webhooks (IFTTT).
* **🧘 Design Acessível:** Estética "Glassmorphism" calmante com opções de alto contraste, fontes ajustáveis e redução de estímulos visuais.
* **⌚ Telemetria de Saúde:** Integração planejada para smartwatch (monitoramento de BPM).
* **🛡️ Privacidade Granular:** O usuário decide exatamente qual familiar/contato tem acesso a cada tipo de dado (localização, batimentos, status da casa).

## 🏗️ Arquitetura (MVVM)
O projeto foi estruturado utilizando o padrão **Model-View-ViewModel (MVVM)** para garantir escalabilidade e testes facilitados:
* `models/`: Contratos de dados (TypeScript Interfaces).
* `services/`: Comunicação externa (Axios, Integrações IoT).
* `viewmodels/`: Regras de negócio e consumo de API (Custom Hooks).
* `views/`: Componentes visuais puramente UI.

## 🚀 Como rodar o projeto localmente

### 1. Pré-requisitos
* [Node.js](https://nodejs.org/en/) (Versão LTS)
* [Git](https://git-scm.com/)
* App **Expo Go** instalado no seu smartphone Android ou iOS.

### 2. Passo a Passo

```bash
# Clone este repositório
$ git clone [https://github.com/GilsonVII/SafeHomeFrontEnd.git](https://github.com/GilsonVII/SafeHomeFrontEnd.git)

# Acesse a pasta do projeto no terminal
$ cd SafeHomeFrontEnd

# Instale as dependências
$ npm install

# Inicie a aplicação
$ npx expo start