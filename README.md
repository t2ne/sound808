
# Sound808 🎵

Uma aplicação para gerir músicas, álbuns, géneros e artistas. Permite realizar operações como visualização, adição, atualização e exclusão de registos, com uma interface simples e interativa.

## 🌟 Funcionalidades

- **Gestão de Músicas, Álbuns, Géneros e Artistas**: Adicione, edite, exclua e visualize informações sobre músicas, álbuns, géneros e artistas.
- **Operações Assíncronas**: A aplicação comunica com uma API backend para realizar as operações CRUD de forma eficiente.
- **Interface Responsiva**: Adapta-se a diferentes tamanhos de tela.

## 🛠️ Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/t8ne/sound808.git
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd sound808
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Instale o `nodemon` globalmente:
   ```bash
   npm install -g nodemon
   ```

5. Execute o servidor da API com `nodemon`:
   ```bash
   nodemon server.js
   ```

6. Para acessar a base de dados, inicie o XAMPP ou MAMP e cole o código da base de dados onde os dados de músicas, álbuns, géneros e artistas estão armazenados.
   
7. Abra um novo terminal e mude-se para o diretório frontend:
   ```bash
   cd frontend
   ```

8. Execute o Svelte:
   ```bash
   npm run dev
   ```

## 🔧 Configuração

- **Conexão com o Backend**: Certifique-se de que a URL de comunicação com a API no código está correta.
- **Banco de Dados**: Certifique-se de que o XAMPP/MAMP está em execução e que a base de dados está configurada corretamente para a aplicação.

## 🌐 Navegadores Suportados

Testado e a funcionar em:
- Chrome
- Firefox
- Safari
- Edge

## 🙋‍♂️ Autor

@t8ne - @cyzuko - @eduardoc0uto

## 🎓 Projeto Académico

Este projeto foi desenvolvido como parte de um trabalho académico, demonstrando a construção de uma aplicação web para gestão de dados com integração de API e backend.

