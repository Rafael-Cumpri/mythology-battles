# Mitologia Grega - Batalha de Heróis

Este é um projeto que simula batalhas entre heróis da mitologia grega, onde você pode criar, visualizar, atualizar e deletar informações sobre os heróis e também realizar combates entre eles. O banco de dados utilizado para este projeto é o PostgreSQL.

## Instruções de Uso

### Pré-requisitos

- Node.js
- PostgreSQL

### Instalação

1. Clone este repositório:

   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
´

2. Acesse o diretório do projeto:
   ```bash
   cd nome-do-repositorio
´

3. Instale as dependências:
   ```bash
   npm install
´

4. Execute o servidor:
   ```bash
   npm run dev
´

O servidor estará rodando em http://localhost:3036.

### Endpoints da API

- `GET /heroes`: Retorna todos os heróis cadastrados.
- `GET /heroes/:id`: Retorna as informações de um herói específico pelo ID.
- `POST /heroes`: Cria um novo herói.
- `PUT /heroes/:id`: Atualiza as informações de um herói existente.
- `DELETE /heroes/:id`: Remove um herói do banco de dados.
- `GET /battles`: Retorna todas as batalhas registradas, incluindo os detalhes dos heróis vencedores.
- `POST /heroes/combate/:id1/:id2`: Realiza um combate entre dois heróis, registrando o vencedor no banco de dados.

### Estrutura do Banco de Dados

Para executar este projeto, é necessário criar um banco de dados no PostgreSQL com as seguintes tabelas:

```sql
CREATE DATABASE batalhasherois;

\c batalhasherois;
USE batalhasherois;

CREATE TABLE herois (
    id SERIAL PRIMARY KEY NOT NULL,
    nome VARCHAR(255) NOT NULL,
    bencaodivina VARCHAR(255) NOT NULL,
    forca INT NOT NULL,
    resistencia INT NOT NULL,
    velocidade INT NOT NULL,
    bencaooumaldicaoo VARCHAR(255) NOT NULL,
    equipamento VARCHAR(255)
);

CREATE TABLE batalhas (
    id SERIAL PRIMARY KEY NOT NULL,
    heroi_id1 INT NOT NULL,
    heroi_id2 INT NOT NULL,
    vencedor_id INT NOT NULL,
    FOREIGN KEY (heroi_id1) REFERENCES herois(id),
    FOREIGN KEY (heroi_id2) REFERENCES herois(id),
    FOREIGN KEY (vencedor_id) REFERENCES herois(id)
);

INSERT INTO herois (nome, bencaodivina, forca, resistencia, velocidade, bencaooumaldicaoo, equipamento) VALUES ('Hércules', 'Zeus', 10, 9, 7, 'Força', 'Espada');
INSERT INTO herois (nome, bencaodivina, forca, resistencia, velocidade, bencaooumaldicaoo, equipamento) VALUES ('Aquiles', 'Apolo', 8, 10, 7, 'Resistência', 'Escudo');
INSERT INTO herois (nome, bencaodivina, forca, resistencia, velocidade, bencaooumaldicaoo, equipamento) VALUES ('Perseu', 'Hermes', 7, 6, 10, 'Força', 'Espada');
INSERT INTO herois (nome, bencaodivina, forca, resistencia, velocidade, bencaooumaldicaoo, equipamento) VALUES ('Teseu', 'Ares', 8, 5, 8, 'Resistência', 'Escudo');
INSERT INTO herois (nome, bencaodivina, forca, resistencia, velocidade, bencaooumaldicaoo, equipamento) VALUES ('Medusa', 'Hades', 9, 4, 7, 'Petrificação', NULL);
INSERT INTO herois (nome, bencaodivina, forca, resistencia, velocidade, bencaooumaldicaoo, equipamento) VALUES ('Manticora', 'Hades', 4, 6, 10, 'Espinhos', NULL);
INSERT INTO herois (nome, bencaodivina, forca, resistencia, velocidade, bencaooumaldicaoo, equipamento) VALUES ('Cerberus', 'Hades', 9, 9, 7, 'Mordida', NULL);
INSERT INTO herois (nome, bencaodivina, forca, resistencia, velocidade, bencaooumaldicaoo, equipamento) VALUES ('Minotauro', 'Hades', 9, 9, 5, 'Chifres', 'Machado Duplo');
INSERT INTO herois (nome, bencaodivina, forca, resistencia, velocidade, bencaooumaldicaoo, equipamento) VALUES ('Centauro', 'Hades', 7, 7, 10, 'Flechas', 'Arco');
INSERT INTO herois (nome, bencaodivina, forca, resistencia, velocidade, bencaooumaldicaoo, equipamento) VALUES ('Quimera', 'Hades', 6, 10, 8, 'Fogo', 'Lança');
INSERT INTO herois (nome, bencaodivina, forca, resistencia, velocidade, bencaooumaldicaoo, equipamento) VALUES ('Hidra', 'Hades', 7, 10, 5, 'Regeneração', NULL);
INSERT INTO herois (nome, bencaodivina, forca, resistencia, velocidade, bencaooumaldicaoo, equipamento) VALUES ('Dédalo', 'Atena', 7, 4, 10, 'Engenhosidade', 'Asas de cera');
INSERT INTO herois (nome, bencaodivina, forca, resistencia, velocidade, bencaooumaldicaoo, equipamento) VALUES ('Ajax', 'Poseidon', 8, 8, 7, 'Coragem', 'Escudo de sete peles');
INSERT INTO herois (nome, bencaodivina, forca, resistencia, velocidade, bencaooumaldicaoo, equipamento) VALUES ('Quíron', 'Apolo', 9, 6, 10, 'Sabedoria', 'Arco e flecha');
INSERT INTO herois (nome, bencaodivina, forca, resistencia, velocidade, bencaooumaldicaoo, equipamento) VALUES ('Orfeu', 'Apolo', 5, 5, 5, 'Música', 'Lira');
INSERT INTO herois (nome, bencaodivina, forca, resistencia, velocidade, bencaooumaldicaoo, equipamento) VALUES ('Jasão', 'Hermes', 8, 8, 8, 'Liderança', 'Espada');
INSERT INTO herois (nome, bencaodivina, forca, resistencia, velocidade, bencaooumaldicaoo, equipamento) VALUES ('Leão de Neméia', 'Hades', 10, 10, 5, 'Pele impenetrável', NULL);
INSERT INTO herois (nome, bencaodivina, forca, resistencia, velocidade, bencaooumaldicaoo, equipamento) VALUES ('Talos', 'Hefesto', 10, 10, 5, 'Bronze', NULL);
INSERT INTO herois (nome, bencaodivina, forca, resistencia, velocidade, bencaooumaldicaoo, equipamento) VALUES ('Circe', 'Hermes', 5, 5, 10, 'Magia', NULL);
INSERT INTO herois (nome, bencaodivina, forca, resistencia, velocidade, bencaooumaldicaoo, equipamento) VALUES ('Pégaso', 'Apolo', 7, 7, 10, 'Asas', NULL);
