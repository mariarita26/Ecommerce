import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICliente } from 'src/app/interface/cliente';
import { AlertasService } from 'src/app/services/alertas.service';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.scss'],
})
export class ListarUsuarioComponent implements OnInit {

  clientes: ICliente[] = [];
  displayedColumns = ['imagem','nome', 'email', 'cpf', 'dataDeNascimento', 'actions'];

  constructor(
    private clienteService: ClientesService,
    private alertaService: AlertasService
  ) {}

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.clienteService.listar().subscribe((clientes: ICliente[]) => {
      this.clientes = clientes;
    });
  }

  // deletar(id?: number): void {
  //   if (id) {
  //     this.clienteService.excluirCliente(id).subscribe(() => {
  //       this.alertaService.alertaSucesso('Cliente removido com sucesso');

       
  //     })
  //     return;
  //   }
  // }

  deletar2(id: number) {
    if (id) {
      this.clienteService.excluirCliente(id).subscribe(() => {
        this.alertaService.alertaSucesso('Cliente removido com sucesso');
        const pfdecerto = this.clientes.findIndex( c => c.id === id);
        if (pfdecerto > -1) {
          this.clientes.splice(pfdecerto, 1);
        } 
      })
      this.listar();
    }      
  }
}
