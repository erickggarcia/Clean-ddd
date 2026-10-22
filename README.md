# DDD (Domain-driven Design)

Design dirigido à domínio

## Domínio

- Domain Experts
    - Conversa
- Linguagem Ubíqua

- Usuário
    - Cliente
    - Fornecedor
    - Atendente
    - Barman

- Agregados
- Value Objects
- Eventos de domínios
- Subdomínios (Bounded Contexts)
- Entidades
- Casos de uso

# Conceitos

- Aggregate
- WatchedList

## Exemplo

- Order --> OrderItem[]
- Order --> Shipping

- Question --> Attachment[]

### Criação

- Titulo
- Conteúdo
- Anexos (3)

### Edição

- Titulo
- Conteúdo

- Adicionar um novo anexo (create)
- Remover o segundo anexo que tinha sido criado previamente (delete)
- Editar um anexo existente (update)

# Subdominios

### Core: O que dá dinheiro
#### Exemplos:

    - Compra
    - Catálogo
    - Pagameto
    - Entrega
    - Faturamento

### Suporting: Dá suporte para o core funcionar
#### Exemplo:

    - Estoque

### Generic: Você precisa, mas não são tão importantes
### Exemplos:
- Notificação ao cliente
- Promoções
- Chat
