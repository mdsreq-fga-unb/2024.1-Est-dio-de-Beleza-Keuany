// Converte a data para o formato SQL
// 26/08/2024 -> 2024-08-26
export function convertToSQLDate(date: string): string {
    const [day, month, year] = date.split('/');

    return `${year}-${month}-${day}`;
}

// Verifica se uma data está no futuro
export function isFutureDate(date: string): boolean {
    const [day, month, year] = date.split('/');
    const providedDate = new Date(`${year}-${month}-${day}T00:00:00-03:00`);

    const currentDate = new Date();
    const currentUTCDate = new Date(
        currentDate.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
    );

    // Comparar as datas
    return providedDate >= currentUTCDate;
}

// Verifica se a data é real
export function isValidDate(date: string): boolean {
    // Expressão regular para verificar o formato dd/mm/yyyy
    const formatRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

    // Verifica se a data está no formato correto
    if (!formatRegex.test(date)) {
        return false;
    }
    
    const [day, month, year] = date.split('/').map(Number);

    // Verifica se a data é real
    const dateObj = new Date(year, month - 1, day);

    // A data é real se o ano, mês e dia na data criada correspondem aos valores originais
    return dateObj.getFullYear() === year && dateObj.getMonth() === (month - 1) && dateObj.getDate() === day;
}

// Mesmo uso da função acima porém com o datetime DD/MM/YYYY hh:mm
export function isValidDateTimeFormat(dateTimeStr: string): boolean {
    // Expressão regular para validar o formato "DD/MM/YYYY hh:mm"
    const dateTimeRegex = /^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})$/;

    const match = dateTimeStr.match(dateTimeRegex);
    if (!match) return false;

    // Desestruturar os grupos capturados para verificar a validade da data
    const [, day, month, year, hour, minute] = match.map(Number);

    // Verificar se o dia, mês, ano, hora e minuto são válidos
    const isValidDate = day >= 1 && day <= 31 && month >= 1 && month <= 12 && year >= 1000 && year <= 9999;
    const isValidTime = hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59;

    if (!isValidDate || !isValidTime) return false;

    // Verificação adicional para validar datas específicas (considerando meses com menos de 31 dias, anos bissextos, etc.)
    const date = new Date(year, month - 1, day);

    return date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year;
}

// Formata a o date time DD/MM/YYYY hh:mm para o formato datetime do MySQL
export function formatDateTime(dateTimeStr: string): string {
    // Dividir a string em partes de data e hora
    const [datePart, timePart] = dateTimeStr.split(' ');

    // Dividir a parte da data em dia, mês e ano
    const [day, month, year] = datePart.split('/');

    // Formatar a data no estilo YYYY-MM-DD
    const formattedDate = `${year}-${month}-${day}`;

    // Retornar a string formatada no estilo "YYYY-MM-DD HH:MM:SS" SQL
    return `${formattedDate} ${timePart}:00`;
}

// Verifica se o telefone possuí 11 dígitos
export function isValidPhoneNumber(phoneNumber: string): boolean {
    const phoneRegex = /^\d{2}\d{5}\d{4}$/;

    return phoneRegex.test(phoneNumber);
}