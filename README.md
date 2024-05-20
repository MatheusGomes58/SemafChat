# SemafChat

SemafChat é uma aplicação web desenvolvida em React que oferece uma plataforma de bate-papo com funcionalidades adicionais, como jogos integrados e a capacidade de trocar os teclados para diferentes códigos de comunicação: semáforo, libras, morse e o alfabeto normal.

## Funcionalidades

- **Bate-papo em tempo real:** Converse com amigos e familiares em salas de chat privadas ou públicas.
- **Jogos integrados:** Divirta-se jogando com seus contatos diretamente na plataforma.
- **Teclado personalizável:** Troque entre diferentes teclados para se comunicar usando códigos semafóricos, Libras (Língua Brasileira de Sinais), código Morse ou o alfabeto normal.

## Tecnologias Utilizadas

- **Frontend:** React
- **Backend:** js
- **Banco de Dados:** realtime database e firestore da google
- **Autenticação:** google autentications

## Como Usar

### Pré-requisitos

- Node.js
- npm (ou yarn)

### Instalação

1. Clone o repositório:

    ```bash
    git clone https://github.com/seuusuario/chatapp.git
    cd chatapp
    ```

2. Instale as dependências do frontend:

    ```bash
    cd frontend
    npm install
    ```

3. Instale as dependências do backend:

    ```bash
    cd ../backend
    npm install
    ```

### Executando a Aplicação

1. Inicie o backend:

    ```bash
    npm start
    ```

2. Inicie o frontend:

    ```bash
    cd ../frontend
    npm start
    ```

3. Abra o navegador e acesse `http://localhost:3000`.

### Uso do Teclado Personalizável

Na interface de bate-papo, você pode selecionar o tipo de teclado desejado a partir de um menu suspenso. As opções incluem:

- **Alfabeto Normal:** Padrão alfabeto posicional.
- **Código Semafórico:** Utilize bandeiras para enviar mensagens.
- **Libras:** Teclado adaptado para representar sinais de Libras.
- **Código Morse:** Envie mensagens em código Morse utilizando pontos e traços.

## Contribuição

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adicionei nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

Aproveite a experiência de bate-papo e jogos com comunicação diversificada no ChatApp!
