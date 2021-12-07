import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Ticket } from 'src/app/models/ticket';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  form!: FormGroup;
  listOfTickets: Ticket[] =  [];
  visible: boolean = false;
  accion: boolean = true;

  constructor(
    private ticketService: TicketService,
    private nzMessageService: NzMessageService,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.getAllTickets();
  }

  getAllTickets() {
    this.ticketService.getAllTickets().toPromise().then(
      (data: Ticket[]) => this.listOfTickets = data
    )
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      eventoId: [''],
      fecha: [''],
      hora: [''],
      duracion: [''],
      precio: [null],
      silla: [null],
    });
  }

  open(): void {
    this.visible = true;
    this.accion=true;
  }

  close(): void {
    this.visible = false;
    this.buildForm();
  }

  guardar() {
    if (this.accion) {
      this.ticketService.postTicket(this.form.value).toPromise().then((data: any) => {
        //this.listOfHardware.push(data);
        this.nzMessageService.success('El registro fue ingresado con exito!');
        this.listOfTickets = [...this.listOfTickets, data]
        //Limpia el formulario y lo cierra
        this.buildForm();
        this.visible = false;
      }, (error) => {
        this.nzMessageService.error('El registro no pudo ser ingresado, por favor intente de nuevo');
        console.error(error);
      })
    }else{
      this.ticketService.putTicket(this.form.value).toPromise().then(()=>{
        this.getAllTickets();
        this.visible = false;
        this.nzMessageService.success('El registro fue actualizado con exito!');
      }, (error) => {
        this.nzMessageService.error('El registro no pudo ser actualizado, por favor intente de nuevo');
        console.error(error);
      })
    }
  }

  modificar(item:Ticket):void{
    this.accion = false;
    this.visible = true;

    this.form=this.formBuilder.group({
      id: [item.id],
      eventoId: [item.eventoId],
      fecha: [item.fecha],
      hora: [item.hora],
      duracion: [item.duracion],
      precio: [item.precio],
      silla: [item.silla],
    })
  }

  submitForm(): void {
    for (const i in this.form?.controls) {
      this.form?.controls[i].markAsDirty();
      this.form?.controls[i].updateValueAndValidity();
    }
  }

  delete(id: string) {
    this.ticketService.deleteTicket(id).toPromise().then(() => {
      this.nzMessageService.warning('El registro fue eliminado con exito!');
      this.listOfTickets = this.listOfTickets.filter(x => x.id !== id);
    }, (error) => {
      this.nzMessageService.error('El registro no pudo ser eliminado, por favor intente de nuevo');
      console.error(error);
    })
  }

  cancel(): void {
    this.nzMessageService.info('Su registro sigue activo! =D')
  }
}
