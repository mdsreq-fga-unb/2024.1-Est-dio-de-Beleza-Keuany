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