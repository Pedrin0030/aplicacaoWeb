# 📂 Sistema de Gestão de Documentos 

[![Deploy on Render](https://img.shields.io/badge/Render-🚀_Acesse_o_Site-green?style=for-the-badge&logo=render)](https://gestao-documentos-rma.onrender.com)

Este projeto é uma aplicação Web Full Stack desenvolvida para o gerenciamento centralizado de documentos. O sistema oferece uma solução robusta para o upload, organização e listagem de arquivos em tempo real, contando com um módulo de histórico de comentários para facilitar o acompanhamento e a colaboração sobre cada documento.



## 🚀 Tecnologias Utilizadas

* **Backend:** Python 3.10+ com Framework **Flask**.
* **Banco de Dados:** SQLite com **SQLAlchemy** (ORM) para persistência de dados.
* **Frontend:** HTML5, CSS3 (Modern Dark Theme) e JavaScript (Vanilla).
* **Comunicação:** Fetch API para integração assíncrona entre Front e Back.
* **Localização:** Ajuste automático para o fuso horário de Brasília (UTC-3).

## 🛠️ Funcionalidades (Requisitos Atendidos)

* **4.1 Upload de Documentos:** Envio de arquivos (PDF, JPG, PNG) com validação de formato e salvamento em diretório seguro.
* **4.2 Listagem Dinâmica:** Visualização instantânea dos documentos cadastrados com metadados (título, descrição e data).
* **4.3 Histórico de Comentários:** Inserção e visualização de comentários vinculados a cada documento, com registro automático de data e hora.
* **Ações Independentes:** Botões separados para **Visualizar** (abrir em nova aba) e **Download** (baixa direta do arquivo).
* **Interface UX:** Design em "Dark Mode" para redução de fadiga visual e melhor usabilidade.

## 📁 Estrutura do Projeto



```text
.
├── app.py              # Servidor Flask, modelos do Banco e Rotas
├── gestao_documentos.db # Banco de dados SQLite (gerado automaticamente)
├── uploads/            # Armazenamento físico dos arquivos enviados
├── templates/          # Estrutura HTML da página
│   └── index.html
└── static/             # Arquivos de estilo e lógica do cliente
    ├── css/
    │   └── style.css
    └── js/
        └── script.js
```

## 🔧 Instalação e Execução

Siga os passos abaixo para configurar o ambiente e rodar o projeto em sua máquina local:

### 1. Pré-requisitos
Certifique-se de ter o **Python 3.10** ou superior instalado em seu sistema.

### 2. Clonar o Repositório
```bash
git clone [https://github.com/seu-usuario/nome-do-seu-repositorio.git](https://github.com/seu-usuario/nome-do-seu-repositorio.git)
cd nome-do-seu-repositorio
```
### 3. Criar Ambiente Virtual (Recomendado)

Para manter as dependências do projeto isoladas e evitar conflitos:

#### No Windows:
```bash
python -m venv venv
venv\Scripts\activate
```
#### No Linux ou macOS:
```bash
python3 -m venv venv
source venv/bin/activate
```
### 4. Instalar Dependências
Com o ambiente virtual ativado, instale os pacotes necessários:
```bash
pip install flask flask-sqlalchemy
```

### 5. Executar a Aplicação
Inicie o servidor local:
```bash
python app.py
```
### 6. Acessar o Sistema
Após o comando acima, o terminal indicará que o servidor está rodando. Abra seu navegador e acesse:

👉 http://127.0.0.1:5000

## ✒️ Autor

- Pedro Paulo Santos Almeida - Software Engineering Student (UnB)

