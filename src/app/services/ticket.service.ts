import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Ticket, TicketWithOutId } from '../models/ticket';

const API= environment.urlBackend + "/tickets";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(
    private http: HttpClient
  ) { }

  // GET
  getAllTickets() {
    return this.http.get<Ticket[]>(`${API}`)
  }

  //POST
  postTicket(ticket:TicketWithOutId){
    return this.http.post(`${API}`,ticket);
  }

  //PUT
  putTicket(ticket:Ticket){
    return this.http.put(`${API}/${ticket.id}`,ticket)
  }

  //PATCH
  // patchTicket(ticket:TicketWithOutId){
  //   return this.http.patch(`${API}/${ticket.id}`, ticket)
  // }

  //DELETE
  deleteTicket(id:string){
    return this.http.delete(`${API}/${id}`)
  }
}
