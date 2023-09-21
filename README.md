# README.md - Backend
Essa é  a parte backend do projeto Desafio Técnico - Gerenciador de Arquivos GLB com Integração ao Model Viewer proposto pela Bugaboo Studio. Este sistema web permite aos usuários fazer o upload de arquivos GLB (formato de arquivo 3D) e visualizá-los usando o Model Viewer pelo front-end.

## Instruções de Uso
Para executar a parte backend do projeto, siga estas etapas:

1. Clone este repositório:
```bash
git clone https://github.com/revem/backend-model-viewer.git
```
2. Navegue até o diretório do backend:
```bash
cd backend-model-viewer
```
3. Instale as dependências do projeto:

```bash
npm install
```

4. Instale o Xampp ou outro aplicativo que instancie o MySQL na sua máquina.
```
https://www.apachefriends.org/pt_br/index.html
```

5. Inicie o servidor backend:
```
npm start
```
O servidor estará em execução na porta 5000 (ou na porta especificada no arquivo index.js).

## Recursos e Funcionalidades
- Autenticação de Usuário: Os usuários podem fazer login usando um nome de usuário e senha. A autenticação é integrada com a conta do usuário para verificar as permissões.

- Upload de Arquivo GLB: Os usuários autenticados podem fazer upload de arquivos GLB válidos. O formato do arquivo é validado antes de ser armazenado.

- Gerenciamento de Arquivos: Os arquivos GLB enviados pelos usuários são armazenados e podem ser listados por meio de endpoints dedicados.

- Integração com Model Viewer: O Model Viewer é usado para exibir os arquivos GLB carregados, fornecendo uma visualização dedicada para cada arquivo GLB.

## Como Contribuir
Se você deseja contribuir para este projeto, siga estas etapas:

1. Faça um fork deste repositório.

2. Crie um branch para suas alterações:
```bash
git checkout -b minha-nova-funcionalidade
```
3. Faça suas alterações e faça commit delas:
```bash
git commit -m "Adicionei uma nova funcionalidade"
```
4. Faça o push das alterações para o seu fork:
```bash
git push origin minha-nova-funcionalidade
```
5. Abra um pull request neste repositório para revisão.

## Contato
Se você tiver alguma dúvida ou precisar de assistência, sinta-se à vontade para entrar em contato comigo.