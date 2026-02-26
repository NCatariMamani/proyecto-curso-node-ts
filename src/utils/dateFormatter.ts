// Función de utilidad para formatear fechas
export const formatDate = (date: Date) => {
    const fechaBolivia = date;
    fechaBolivia.setHours(date.getHours() - 4); // Ajuste a UTC-4*/
    return fechaBolivia.toISOString();
};


export const formatDateToString = (date?: string) => {
    const varnull: any = null
    if (!date) return varnull;
    const fechaBolivia = new Date(date);
    //fechaBolivia.setHours(date.getHours() - 4); // Ajuste a UTC-4*/
    return fechaBolivia.toISOString();

};