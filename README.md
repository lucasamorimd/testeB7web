1. Quais as partes principais de uma requisição HTTP?
   As principais partes são os métodos (GET, POST, PUT, DELETE, PATCH e etc.), a rota ou URL de pra onde será feita a requisição e a versão
   do HTTP.

2. Qual a diferença entre colocar um script dentro do "head" e no fim do "body"?
   Na tag "head" o script será carregado primeiro do que o resto da página e dentro da tag "body" ele será carregado na ordem em que
   está inserido.

3. Qual a diferença entre display: block e display: inline-block ?
   Block terá comportamento apenas de um bloco, pegará 100% do
   espaço disponível do seu elemento pai e inline-block será um
   elemento inline, mas que permite alteração em propriedades como
   margin, padding, width e height.
   
4. É possível criar um site responsivo SEM media queries? Por que?
   Sim, Porque existe a possibilidade de utilizar porcentagens e vh
   combinados a utilização de tabelas para distribuir o layout como faziam os maias ao desenvolverem suas páginas nas pedras.

5. No Javascript, é obrigatório usar VAR para criar uma variável?
   Não. Pode ser criado utilizando LET.

6. Criar funções com "function() {}" e com "() => {}" tem alguma diferença além da sintaxe?
   Sim, várias. Funções anônimas não podem ser chamadas antes da sua criação e arrow functions não podem ser utilizadas em construtores, entre outras diferenças.

7. Explique a lógica pra fazer uma paginação.
   Receber um Offset ou estabelecer um padrão e se esse offset for maior do que 0, subtrai por 1, multiplica pela quantidade de itens que deverá ter na página e na query utilizar o LIMIT "offset","qtd_itens"

8. Qual a melhor forma de armazenar uma imagem no banco de dados?
   Armazenar apenas a URL do local da imagem no campo e deixar a imagem
   no servidor pra onde a URL armazenada no banco aponta.

9.  No React, quantos useEffect eu posso usar?
    Quantos forem necessários para controlar as ações.
    
10. Quais métodos de requisição preciso para criar um CRUD via API?
    É necessário os métodos POST(C), GET(R), PUT(U), DELETE(D).