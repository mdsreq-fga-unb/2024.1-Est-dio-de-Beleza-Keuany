# Requisitos e Critérios

##  Histórico de Versão

| **Data** | **Versão** | **Descrição** | **Autor** |
| :--------: | :--------: | :--------:  | :--------: | 
| 29/07/2024 | 1.0 | Criação do Documento | Gustavo Melo, Gustavo Alves |

---

## Personas
* **Cliente**: Pessoa que utiliza os serviços do Espaço de Design de Sobrancelhas. Interessado em agendar serviços, visualizar informações sobre serviços oferecidos, avaliar o salão, receber comunicações sobre agendamentos, entre outras necessidades relacionadas à experiência como cliente.

* **Gerente**: Pessoa responsável pela administração e operação do salão de beleza. Suas preocupações incluem a gestão da agenda, a adição e remoção de serviços, acompanhamento de avaliações dos clientes, entre outras tarefas relacionadas à administração do salão.

* **Usuário**: É tanto o cliente, quanto o gerente do salão. Tem acesso às funcionalidades destinadas a ambas as personas.

---

## Requisitos Funcionais

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Documentação de Projeto</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
        }   
    </style>
</head>
<body>
    <table>
        <thead>
            <tr>
                <td><b>Épico</b></td>
                <td><b>Feature</b></td>
                <td><b>User Story</b></td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td rowspan="9"><b>[EP01]</b> Gestão da Agenda</td>
                <td rowspan="2"><b>[FE01]</b> Identificação</td>
                <td><b>[US01]</b> Eu, como cliente, quero cadastrar meu telefone para me identificar no sistema.</td>
            </tr>
            <tr>
                <td><b>[US02]</b> Eu, como gerente, quero entrar no sistema como administrador, para realizar todas as minhas funções de gerência.</td>
            </tr>
            <tr>
                <td rowspan="7"><b>[FE02]</b> Agendamento</td>
                <td><b>[US03]</b> Eu, como cliente, quero marcar os meus próprios atendimentos em um horário disponível para que eu tenha flexibilidade de escolher um horário que se adapte à minha agenda.</td>
            </tr>
            <tr>
                <td><b>[US04]</b> Eu, como cliente, quero cancelar meu horário de atendimento para prevenir possíveis faltas inesperadas.</td>
            </tr>
            <tr>
                <td><b>[US05]</b> Eu, como usuário, quero ter acesso às informações de horários livres e agendamentos para me planejar.</td>
            </tr>
            <tr>
                <td><b>[US06]</b> Eu, como cliente, quero entrar na fila de um horário que tenho interesse para garantir meu lugar caso o cliente anterior cancele o atendimento.</td>
            </tr>
            <tr>
                <td><b>[US07]</b> Eu, como gerente, quero gerenciar todos os agendamentos de todos os clientes para manter o sistema fiel a mudanças externas e lidar com possíveis erros e enganos.</td>
            </tr>
            <tr>
                <td><b>[US08]</b> Eu, como gerente, quero que o cliente confirme com antecedência sua sessão para evitar faltas inesperadas e liberar alguma vaga.</td>
            </tr>
            <tr>
                <td><b>[US09]</b> Eu, como gerente, quero receber uma notificação de um novo atendimento, para poder me organizar e receber a cliente.</td>
            </tr>
            <tr>
                <td rowspan="5"><b>[EP02]</b> Informações do Estabelecimento</td>
                <td rowspan="3"><b>[FE03]</b> Descrição</td>
                <td><b>[US10]</b> Eu, como usuário, quero saber das informações básicas do Estúdio Beleza Keuany para conhecer mais da empresa.</td>
            </tr>
            <tr>
                <td><b>[US11]</b> Eu, como gerente, quero divulgar meu trabalho através do site, para atrair novos clientes.</td>
            </tr>
            <tr>
                <td><b>[US12]</b> Eu, como gerente, quero gerenciar os serviços disponibilizados pelo Estúdio Keuany, para os clientes saberem quais serviços são ofertados.</td>
            </tr>
            <tr>
                <td rowspan="2"><b>[FE04]</b> Avaliação</td>
                <td><b>[US13]</b> Eu, como cliente, quero avaliar os serviços empregados pelo Estúdio de Beleza Keuany para mostrar minha opinião sobre o serviço prestado.</td>
            </tr>
            <tr>
                <td><b>[US14]</b> Eu, como usuário, quero saber como os clientes anteriores da empresa avaliam a qualidade do atendimento para aumentar o engajamento da empresa.</td>
            </tr>
        </tbody>
    </table>
</body>
</html> 

---

## Requisitos Não-Funcionais

| **Tipo** | **Descrição** |
| :--------: | :--------: |
| Suportabilidade | **[RNF01]** A aplicação deve ser compatível com os principais navegadores Web/Mobile em suas versões a partir de 2024: Chrome 115, Edge 115, Opera 100, Safari 17.1, FireFox 115. |
| Usabilidade | **[RNF02]** O site deve ser adequado a diferentes tamanhos de tela de dispositivos moobile e desktop. |
| Interface | **[RNF03]** A aplicação deverá seguir a identidade visual do salão (paleta de cores, logomarca, banners). |

---

## Critérios de Priorização

### Valor de Negócio (Business Value)

Significa quanto é a contribuição para o produto final, inclui impacto financeiro, satisfação de cliente e benefícios para o negócio. Varia de 1 a 4, da seguinte forma:

- **1**: A US fornece um valor mínimo de negócio, ou seja, a funcionalidade resolve apenas uma pequena fração do problema.
- **2**: A US fornece um valor razoável de negócio, ou seja, a funcionalidade propõe resolver uma parte do problema.
- **3**: A US fornece um alto valor de negócio, ou seja, a funcionalidade resolve boa parte do problema.
- **4**: A US fornece um valor considerável de negócio, ou seja, a funcionalidade é indispensável para a solução do problema.

### Dificuldade (Difficulty)

Significa a dificuldade técnica e operacional de desenvolver uma funcionalidade. Varia de 1 a 3, da seguinte forma:

- **3**: A US apresenta um alto grau de dificuldade técnica, ou seja, requer um maior esforço para desenvolver a funcionalidade e uma maior competência.
- **2**: A US apresenta um médio grau de dificuldade técnica, ou seja, a funcionalidade não é tão difícil de ser implementada, porém, requer certa atenção.
- **1**: A US apresenta um baixo grau de dificuldade técnica, ou seja, não é necessário tanto esforço para desenvolver a funcionalidade, com uma competência baixa, ou mediana é possível fazer.

### Pontuação Final dos Critérios de Priorização
A pontuação final dos critérios de priorização será uma simples soma de cada resultado por épico:

<p style="text-align: center;"><b>vn + d = p</b></p>

### Pontuação de Priorização por User Story

| US   | Funcionalidades                                | Valor de Negócio (1 a 4) | Dificuldade (1 a 3) | Pontuação |
|------|------------------------------------------------|--------------------------|--------------------------|-----------|
| US01 | Cadastro do telefone                           | <p align="center">4</p>  | <p align="center">1</p> | <p align="center">5</p> |
| US02 | Acesso de Administrador                        | <p align="center">4</p>  | <p align="center">2</p> | <p align="center">6</p> |
| US03 | Agendar um horário                             | <p align="center">4</p>  | <p align="center">1</p> | <p align="center">5</p> |
| US04 | Retirar agendamento                            | <p align="center">4</p>  | <p align="center">2</p> | <p align="center">4</p> |
| US05 | Consultar horários disponíveis e ocupados      | <p align="center">3</p>  | <p align="center">2</p> | <p align="center">5</p> |
| US06 | Entrar na fila                                 | <p align="center">3</p>  | <p align="center">3</p> | <p align="center">6</p> |
| US07 | Gerenciamento Administrativo de Agendamentos   | <p align="center">2</p>  | <p align="center">1</p> | <p align="center">3</p> |
| US08 | Confirmação com Antecedência                   | <p align="center">4</p>  | <p align="center">3</p> | <p align="center">7</p> |
| US09 | Notificação de novo atendimento                | <p align="center">2</p>  | <p align="center">2</p> | <p align="center">4</p> |
| US10 | Saber informações sobre o estabelecimento      | <p align="center">2</p>  | <p align="center">1</p> | <p align="center">3</p> |
| US11 | Divulgar o trabalho no site                    | <p align="center">3</p>  | <p align="center">1</p> | <p align="center">4</p> |
| US12 | Gerenciar os serviços oferecidos pelo estúdio  | <p align="center">3</p>  | <p align="center">2</p> | <p align="center">5</p> |
| US13 | Avaliar os serviços                            | <p align="center">2</p>  | <p align="center">1</p> | <p align="center">3</p> |
| US14 | Visualização das avaliações                    | <p align="center">2</p>  | <p align="center">1</p> | <p align="center">3</p> |
