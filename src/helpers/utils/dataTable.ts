export function extractDataFromTable(dataTable) {

    const headers = dataTable.rawTable[0];
    const values = dataTable.rawTable[1];
    const result: { [key: string]: string } = {};
    headers.forEach((header, index) => {

        let value = values[index].replace(/"/g, '');
        result[header] = value;
    });

    return result;
}