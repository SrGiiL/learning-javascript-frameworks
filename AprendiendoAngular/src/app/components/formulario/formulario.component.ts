import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  public user: any;


  constructor() {
    this.user = {
      name: '',
      surname: '',
      biography: '',
      gender: ''
    }
  }

  ngOnInit(): void {
  }

  onSubmit() {
    alert('Formulario enviado');
  }
}
