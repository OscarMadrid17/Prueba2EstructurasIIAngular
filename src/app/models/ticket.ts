export class Ticket {
    "id": string;
    "eventoId": number;
    "fecha": string;
    "hora": number;
    "duracion": number;
    "precio": number;
    "silla": number;
}


export class TicketWithOutId {
    "eventoId": number;
    "fecha": string;
    "hora": number;
    "duracion": number;
    "precio": number;
    "silla": number;
}