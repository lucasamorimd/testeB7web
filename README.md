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
Para o banco, foi criado um docker-compose.yml que sobe um banco mysql utilizando as variaveis de ambiente do projeto.