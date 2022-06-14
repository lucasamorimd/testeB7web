# Api notes
## Api criada em laravel
Esta api foi criada contendo as seguintes rotas
- notes/list (GET) retorna {message:'Todos os notes', statusCode: 200, notes:[{}]}
- notes/trash (GET) retorna {message: 'Todos os notes excluidos', statusCode: 200, notes:[{}]}
- notes/getOne/{id_notes} (GET) retorna {message: 'Seu note <title>', statusCode200, notes:{}},
- notes/new (POST) recebe { title: string, content: string, type: string } e retorna {message: "Note salvo com sucesso", statusCode:200, notes:{}}
- notes/edit (PUT) recebe {id_note: int, title: string, content: string, type: string } e retorna {message: "Note salvo com sucesso", statusCode:200, notes:{}}
- note/delete (DELETE) recebe {id_note: int} retorna {message: "Note deletado com sucesso", statusCode:200, notes:{}}
- notes/recicle (PUT) recebe {id_note: int} retorna {message: "Note foi reciclado", statusCode:200, notes:{}}

## Banco de dados
Para o banco, foi criado um docker-compose.yml que sobe um banco mysql utilizando as variaveis de ambiente do projeto. Há a utilização de migrations do laravel, ao subir o banco, basta rodar as migrations.

## Subindo ambiente
após clonar o repositório, instalar as dependências.

- docker-compose up para subir o banco de dados,
- php artisan serve para subir o backend e remover o .example do .env.example
Obs.: Caso suba com uma porta diferente (8000), alterar a porta no .env do projeto frontend
