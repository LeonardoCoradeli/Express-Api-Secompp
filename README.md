### **API de Gerenciamento de Tarefas - Minicurso SECOMPP**

Bem-vindos ao minicurso de desenvolvimento de APIs com Express.js e TypeScript\!

Este projeto foi desenvolvido por Leonardo Cendes, Lucas Hungaro e seus colegas para a Semana da Computação de Presidente Prudente (SECOMPP). Trata-se de uma API RESTful completa para gerenciamento de tarefas, construída com as tecnologias mais modernas do ecossistema Node.js.

O objetivo é demonstrar de forma prática como estruturar uma aplicação robusta, escalável e de fácil manutenção, seguindo as melhores práticas de desenvolvimento de software.

### **Como Rodar o Projeto**

Para executar a aplicação em seu ambiente local, siga os passos abaixo:

1.  **Pré-requisitos:**

      * **Node.js:** Certifique-se de que você tem o Node.js (versão 14 ou superior) instalado.
      * **Docker e Docker Compose (Recomendado):** Para subir a instância do MongoDB de forma rápida e isolada. Alternativamente, você pode usar uma instalação local do MongoDB.

2.  **Instalação:**

      * Clone este repositório: `git clone <url-do-repositorio>`
      * Acesse o diretório do projeto: `cd <nome-do-repositorio>`
      * Instale as dependências: `npm install`

3.  **Executando o Banco de Dados com Docker:**

      * Na raiz do projeto, execute o seguinte comando para iniciar o contêiner do MongoDB em segundo plano:
        ```bash
        docker-compose up -d
        ```
      * Com isso, um banco de dados MongoDB estará rodando na porta `27017`. A aplicação já está pré-configurada em `src/config/database.ts` para se conectar a este endereço (`mongodb://localhost:27017/taskmanager`).

4.  **Execução da API:**

      * Para iniciar o servidor em modo de desenvolvimento (com recarregamento automático a cada alteração), execute: `npm run dev`
      * Para iniciar o servidor em modo de produção, execute: `npm start`
      * O servidor estará rodando em `http://localhost:3000`.

5.  **Documentação da API (Swagger):**

      * Após iniciar o servidor, acesse `http://localhost:3000/api-docs` em seu navegador para visualizar a documentação interativa da API, gerada com o Swagger.

### **Estrutura do Projeto**

A aplicação foi organizada de forma a separar as responsabilidades, facilitando o entendimento e a manutenção do código. Abaixo está uma breve descrição de cada diretório principal:

  * **`src/config`**: Contém os arquivos de configuração.

      * `database.ts`: Responsável pela conexão com o banco de dados MongoDB.
      * `swagger.ts`: Define as configurações para a geração da documentação da API com o Swagger.

  * **`src/controllers`**: Os controladores são responsáveis por receber as requisições HTTP, processar os dados de entrada e enviar a resposta ao cliente.

      * `taskController.ts`: Contém os métodos para lidar com as rotas de tarefas (criar, listar, atualizar, etc.).

  * **`src/middlewares`**: Funções que são executadas entre a requisição e a resposta.

      * `errorHandler.ts`: Um middleware centralizado para capturar e tratar todos os erros da aplicação.
      * `validateObjectId.ts`: Valida se o ID passado como parâmetro na URL é um ObjectId válido do MongoDB.

  * **`src/models`**: Define os esquemas e modelos do Mongoose, que representam a estrutura dos documentos no banco de dados.

      * `Task.ts`: Define o esquema da coleção de "Tasks", com seus campos, tipos, validações e índices.

  * **`src/repositories`**: A camada de repositório é responsável por abstrair a lógica de acesso ao banco de dados.

      * `taskRepository.ts`: Implementa os métodos para interagir com a coleção de tarefas (buscar, criar, atualizar, deletar).

  * **`src/routes`**: Define as rotas (endpoints) da API.

      * `taskRoutes.ts`: Mapeia as rotas HTTP (GET, POST, PUT, DELETE) para os métodos correspondentes no `taskController` e contém a documentação OpenAPI/Swagger.

  * **`src/services`**: Contém a lógica de negócio da aplicação.

      * `taskService.ts`: Implementa as regras de negócio para as operações com tarefas, como validações e chamadas ao repositório.

  * **`src/types`**: Define as interfaces e tipos do TypeScript, garantindo a tipagem forte em todo o projeto.

      * `task.types.ts`: Contém as interfaces (`ITask`, `ITaskDocument`) e enums (`TaskStatus`, `TaskPriority`) relacionadas às tarefas.

  * **`src/utils`**: Funções utilitárias que podem ser reutilizadas em várias partes do projeto.

      * `asyncHandler.ts`: Um wrapper para funções assíncronas em rotas Express, que captura erros e os repassa para o `errorHandler`.
      * `errors.ts`: Define uma classe de erro customizada (`AppError`) para um melhor controle de erros.
      * `validators.ts`: Funções para validar os dados de entrada.

  * **`src/server.ts`**: O ponto de entrada da aplicação. É responsável por inicializar o servidor Express, conectar ao banco de dados, configurar os middlewares e registrar as rotas.
