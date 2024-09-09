# Minimum Value Product

##  Histórico de Versão

| **Data** | **Versão** | **Descrição** | **Autor** |
| :--------: | :--------: | :--------:  | :--------: | 
| 29/07/2024 | 1.0 | Criação do Documento | Gustavo Melo, Gustavo Alves |

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
                <th>Épico</th>
                <th>Feature</th>
                <th>User Story</th>
                <th>Critérios de Aceitação</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td rowspan="9">[EP01] Gestão da Agenda</td>
                <td rowspan="2">[FE01] Identificação</td>
                <td>[US01] Eu, como cliente, quero cadastrar meu telefone para me identificar no sistema.</td>
                <td>
                    - O sistema deve somente aceitar números de telefone com 11 dígitos (DD + 9 dígitos);<br>
                    - O sistema deve fornecer um campo para o usuário inserir seu número de telefone e seu nome;<br>
                    - O sistema deve indicar que o número a ser cadastrado deve possuir um WhatsApp, já que a confirmação/comunicação virá por meio deste.
                </td>
            </tr>
            <tr>
                <td>[US02] Eu, como gerente, quero entrar no sistema como administrador, para realizar todas as minhas funções de gerência.</td>
                <td>
                    - O sistema deve ter os campos de login e senha para serem preenchidos;<br>
                    - O sistema deve reconhecer as informações de login e senha;<br>
                    - O sistema deve ter uma forma de recuperar a senha.
                </td>
            </tr>
            <tr>
                <td rowspan="7">[FE02] Agendamento</td>
                <td>[US03] Eu, como cliente, quero marcar os meus próprios atendimentos em um horário disponível para que eu tenha flexibilidade de escolher um horário que se adapte à minha agenda.</td>
                <td>
                    - O sistema deve permitir que o cliente agende um atendimento em um horário disponível;<br>
                    - Os horários de atendimento disponíveis no sistema devem ser das 8h até às 18h;<br>
                    - Os dias de atendimento disponíveis no sistema devem ser de segunda a sábado;<br>
                    - O sistema deverá negar uma tentativa de agendamento, caso o horário já esteja preenchido.
                </td>
            </tr>
            <tr>
                <td>[US04] Eu, como cliente, quero cancelar meu horário de atendimento para prevenir possíveis faltas inesperadas.</td>
                <td>
                    - O sistema deve permitir o cancelamento de agendamentos;<br>
                    - O sistema deve verificar se o usuário cancelando o horário é de fato o usuário referente àquele horário ao pedir que o usuário insira o número como confirmação;<br>
                    - A fila deve ser atualizada com o cancelamento de um agendamento.
                </td>
            </tr>
            <tr>
                <td>[US05] Eu, como usuário, quero ter acesso às informações de horários livres e agendamentos para me planejar.</td>
                <td>
                    - O sistema deve exibir um calendário com os horários disponíveis;<br>
                    - O usuário deve poder aplicar filtros como intervalo de tempo (manhã, tarde, noite) e duração do compromisso;<br>
                    - Se não houver horários disponíveis no dia selecionado o sistema deve exibir uma mensagem informativa ao usuário;<br>
                    - Devem ser exibidas as pessoas na fila de cada horário.
                </td>
            </tr>
            <tr>
                <td>[US06] Eu, como cliente, quero entrar na fila de um horário que tenho interesse para garantir meu lugar caso o cliente anterior cancele o atendimento.</td>
                <td>
                    - O sistema deve permitir ao cliente entrar em uma fila de espera por um horário ocupado;<br>
                    - O sistema deve rejeitar mais do que 5 pessoas num horário;<br>
                    - O usuário deve ser notificado quando se mover da fila para a vaga.
                </td>
            </tr>
            <tr>
                <td>[US07] Eu, como gerente, quero gerenciar todos os agendamentos de todos os clientes para manter o sistema fiel a mudanças externas e lidar com possíveis erros e enganos.</td>
                <td>
                    - O sistema deve permitir ao administrador cancelar os horários dos clientes independente da vontade dos clientes, para manter a agenda fiel às mudanças externas;<br>
                    - O sistema deve permitir ao administrador marcar os horários dos clientes independente da vontade dos clientes, para manter a agenda fiel às mudanças externas;<br>
                    - O sistema deve notificar o cliente quando o administrador remarcar o seu horário.
                </td>
            </tr>
            <tr>
                <td>[US08] Eu, como gerente, quero que o cliente confirme com antecedência sua sessão para evitar faltas inesperadas e liberar alguma vaga.</td>
                <td>
                    - O usuário deve receber uma notificação por WhatsApp solicitando a confirmação do compromisso em um tempo pré-determinado;<br>
                    - O sistema deve permitir um cancelamento via WhatsApp após a mensagem de confirmação.
                </td>
            </tr>
            <tr>
                <td>[US09] Eu, como gerente, quero receber uma notificação de um novo atendimento, para poder me organizar e receber o cliente.</td>
                <td>
                    - O sistema deve enviar uma notificação ao administrador do sistema indicando um atendimento que foi marcado;<br>
                    - A notificação deve ser enviada ao administrador imediatamente após o atendimento ser marcado.
                </td>
            </tr>
            <tr>
                <td rowspan="5">[EP02] Informações do Estabelecimento</td>
                <td rowspan="3">[FE01] Descrição</td>
                <td>[US10] Eu, como usuário, quero saber das informações básicas do Estúdio Beleza Keuany para conhecer mais da empresa.</td>
                <td>
                    - O sistema deve permitir ao administrador modificar informações relevantes sobre seu estabelecimento para serem exibidas aos clientes.
                </td>
            </tr>
            <tr>
                <td>[US11] Eu, como gerente, quero divulgar meu trabalho através do site, para atrair novos clientes.</td>
                <td>
                    - O sistema deve permitir ao administrador divulgar as redes sociais do estúdio, para que os clientes tenham acesso aos materiais de divulgação do site.
                </td>
            </tr>
            <tr>
                <td>[US12] Eu, como gerente, quero gerenciar os serviços disponibilizados pelo Estúdio Keuany, para os clientes saberem quais serviços são ofertados.</td>
                <td>
                    - O sistema deve permitir ao administrador modificar para os clientes no site quais são os serviços disponibilizados no estúdio dela, assim como tempos médios.
                </td>
            </tr>
            <tr>
                <td rowspan="2">[FE02] Avaliação</td>
                <td>[US13] Eu, como cliente, quero avaliar os serviços empregados pelo Estúdio de Beleza Keuany para mostrar minha opinião sobre o serviço prestado.</td>
                <td>
                    - O sistema deve permitir ao cliente avaliar os serviços ofertados pelo estúdio após experienciar cada serviço;<br>
                    - O sistema deve permitir que o cliente avalie o estabelecimento de forma anônima se ele desejar.
                </td>
            </tr>
            <tr>
                <td>[US14] Eu, como usuário, quero saber como os clientes anteriores da empresa avaliam a qualidade do atendimento para aumentar o engajamento da empresa.</td>
                <td>
                    - O sistema deve apresentar para o administrador as avaliações dos clientes sobre o seu estabelecimento.
                </td>
            </tr>
        </tbody>
    </table>
</body>
</html>

## DOR

<iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSDPYvUoHfku_t9SoYmj_9UjdwslmHRxAxPulH2QtKyYYpNF44b-CkZeDaV3QFlOwCxp-SBywwRgV_1/pubhtml?gid=186001220&amp;single=true&amp;widget=true&amp;headers=false"></iframe>

## DOD

<iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSDPYvUoHfku_t9SoYmj_9UjdwslmHRxAxPulH2QtKyYYpNF44b-CkZeDaV3QFlOwCxp-SBywwRgV_1/pubhtml?gid=325401973&amp;single=true&amp;widget=true&amp;headers=false"></iframe>