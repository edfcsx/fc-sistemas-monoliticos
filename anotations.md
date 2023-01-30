## Entities

"Uma entidade é algo único que é capaz de ser alterado de forma contínua durante um longo período de tempo."

Vernon, Vaughn. Implementing Domain-Driven Design. Pearson Education. Kindle Edition.

"Uma entidade é algo que possui uma continuidade em seu ciclo de vida e pode ser distinguida independente dos atributos que são importantes para a aplicação do usuário. Pode ser uma pessoa, cidade, carro, um ticket de loteria ou uma transação bancária."

Evans, Eric. Domain Driven (p. 91). Pearson Education. Kindle Edition.

Entidade = IDENTIDADE

Principios:
- consistência constante em primeiro lugar: A entidade sempre vai ter que representar obrigatoriamente o estado correto e atual daquele elemento.
- princípio de autovalidação: Uma entidade por padrão ela sempre vai ter que se auto validar, caso isso seja terceirizado para qualquer outra parte do sistema, ela corre o risco de por erro externo a mesma ficar incosistente.

### Entidade Anêmica
Uma entidade anêmica, armazena apenas dados como por exemplo um DTO, não contendo lógica.

### Entidade VS ORM
Uma entidade no DDD deve ser focada em négocio enquanto a entidade do ORM é focada em persistência, nesse caso podemos atribuir até outras nomeclaturas como por exemplo model, tendo como o unico objetivo facilitar a vida para persistência de dados.

exemplo:

(complexidade de negocio)\
Domain
  - entity (regra de negocio)
    - customer.ts (regra de negocio)

(complexidade acidental)\
Infra (mundo externo)
  - entity / model
    - customer.ts (getters, setters)


## Value Objects
"Quando você se preocupa apenas com os atributos de um elemento de um model, classifique isso como um Value Object."

"Trate o value object como imutável."

Evans, Eric. Domain Driven Design (p.99). Pearson Education. Kindle Edition.

regras:
  - O value object tem que se auto validar.
  - O value object não possui id, pois ele não é único mas apenas um conjunto de propriedades.
  - Ele é imutável.

## Aggregates / Agregados
"Um agregado é um conjunto de objetos associados que tratamos como uma unidade para propósito de mudança de dados"

Evans, Eric. Domain Driven Design (p.126). Pearson Education. Kindle Edition.

![Alt text](./imgs/aggregates.png?raw=true "Aggregates")


## Domain Services
"Um serviço de domínio é uma operação sem estado que cumpre uma tarefa específica de domínio. Muitas vezes, a melhor indicação de que você deve criar um Serviço no modelo de domínio é quando a operação que você precisa executar pareça não se encaixar como um método em um Agregado ou um Objeto de valor."

Vernon, Vaughn. Implementing Domain-Driven Design. Pearson Education. Kindle Edition.

"Quando um processo ou transformação significativa no domínio não for uma responsabilidade natural de uma ENTIDADE ou OBJETO DE VALOR, adicione uma operação ao modelo como uma interface autônoma declarada como um SERVIÇO. Defina a interface baseada na linguagem do modelo de domínio e certifique-se de que o nome da operação faça parte do UBIQUITOUS LANGUAGE. Torne o serviço sem estado".

Evans, Eric. Domain-Driven Design (p.106). Pearson Education. Kindle Edition

Estamos falando de uma entidade stateless sem estado, que está relacionada as entidades de negócio e não por exemplo a um serviço de envio de e-mail.

Perguntas:
  - uma entidade pode realizar uma ação que vai afetar todas as entidades?
  - como realizar uma operação em lote?
  - como calcular algo cuja as informações constam em mais de uma entidade?

Cuidados:
  - Quando houver muitos Domain Services em seu projeto, Talvez isso pode indicar que seus agregados estão anêmicos.
  - Domain Services são Stateless.

## Repositories
Um repositório comumente se refere a um local de armazenamento, geralmente considerado um local de segurança ou preservação dos itens nele armazenados. Quando você armazena algo em um repositório e depois
 retorna para recuperá-lo, você espera que ele esteja no mesmo estado que estava quando você o colocou. Em algum momento, você pode optar por remover o item armazenado do repositório.

Vernon, Vaughn. Implementing Domain-Driven Design. Pearson Eduacation. Kindle Edition.

Esses objetos semelhantes a coleções são sobre persistência. Todo tipo Agregado persistente terá um Repositório. De um modo geral, existe uma relação um-para-um entre um tipo Agregado e um Repositório.

Vernon, Vaughn. Implementing Domain-Driven Design. Pearson Eduacation. Kindle Edition.

## Domain Events
"Use um evento de domínio para capturar uma ocorrência de algo que aconteceu no domínio.""

Vernon, Vaughn. Implementing Domain-Driven Design. Pearson Education. Kindle Edition.

"A essência de um evento de domínio é que você o usa para capturar coisas que podem desencadear uma mudança no estado do aplicativo que você está desenvolvendo. Esses objetos de evento são processados para causar alterações no sistema e armazenados para fornecer um AuditLog."

Fowler, Margin. Domain Event.

Todo evento deve ser representado em uma ação realizada no passado:
- UserCreated
- OrderPlaced
- EmailSent

### Quando utilizar?
Normalmente um Domain Event deve ser utilizado quando queremos notificar outros Bounded Contexts de uma mudança de estado.

### Componentes
- Event
- Handler: Executa o processamento quando um evento é chamado.
- Event Dispatcher: Responsável por armazenar e executar os handlers de um evento quando ele for disparado.

### Dinâmica
<ol>
  <li>Criar um "Event Dispatcher"</li>
  <li>Criar um "Evento"</li>
  <li>Criar um Handler para o "Evento"</li>
  <li>Registrar o Evento, juntamento com o Handler no "event Dispatcher"</li>
</ol>

Agora para disparar um evento, basta executar o método "notify" do "event Dispatcher". Nesse momento todos os handlers registrados no evento serão executados.

## Módulos

Em um contexto DDD, Módulos em seu modelo servem como contêiners nomeados para classes de objetos de domínio que são altamente coesas entre si. O Objetivo deve ser baixo acoplamento entre as classes que estão em módulos diferentes. Como os módulos usados no DDD não são compartimentos de armazenamento anêmicos ou genéricos, também é importante nomear adequadamente os Módulos.

Vernon, Vaughn. Implementando Design Orientado a Dominio. Pearson Education. Kindle Edition.

- Respeitar a linguagem universal
- Baixo acoplamento
- Um ou mais agregados devem estar juntos somente se fazem sentido
- Organizado pelo domínio / subdomínio e não pelo tipo de objetos
- Devem respeitar a mesma divisão quando estão em camadas diferentes

## Factories

Desloque a necessidade de criar instâncias de objetos complexos e AGREGADOS, para um objeto separado, que pode não ter responsabilidade no modelo de domínio, mas ainda não faz parte do design do domínio. Forneça uma interface que encapsule toda a criação complexa e que não exija que o cliente faça referência às classes concretas dos objetos que estão sendo instanciados. Crie AGGREGATES inteiros de uma única vez, reforçando suas invariantes.

Evans, Eric. Domain Driven Design (p.138). Pearson Education Kindle Edition.
