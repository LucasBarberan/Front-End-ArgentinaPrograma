import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {
  miPorfolioHabilidades:any;
  form:FormGroup;
  form2:FormGroup;
  _id:number=0;
  _indice:number=0;
  value:number|null=0;
  data$:Observable<boolean>;
  edicionHabilidad=
  {
    id:'',
    name: '',
    porcentaje:''
  };
  constructor(private datosPortfolio:PortfolioService, private formBuilder:FormBuilder)
  {
    this.data$ = datosPortfolio.sharingObservable
    this.form=this.formBuilder.group({
      id:'',
      name:new FormControl('',Validators.compose([Validators.required])),
      porcentaje:""
    })
    this.form2=this.formBuilder.group({
      id:'',
      name:new FormControl('',Validators.compose([Validators.required])),
      porcentaje:""
    })
  }

  ngOnInit(): void 
  {
      this.datosPortfolio.obtenerDatos(this.datosPortfolio.url+"/habilidades").subscribe(data =>
      {
        this.miPorfolioHabilidades=data;
      });
  }

  irEditarHabilidad(indice:number,id:number)
  {
    
    this._indice=indice;
    this._id=id;
    this.edicionHabilidad=this.miPorfolioHabilidades[this._indice];
    this.value=parseInt(this.edicionHabilidad.porcentaje);
  }

  editarHabilidad()
  {
    this.datosPortfolio.modificarDatos(this.datosPortfolio.url+"/habilidades/"+this.edicionHabilidad.id,this.form.value).subscribe(repuesta=>{this.ngOnInit();});
      
  }

  agregarHabilidad()
  {
    this.datosPortfolio.guardarDatos(this.datosPortfolio.url+"/habilidades",this.form2.value).subscribe(repuesta=>{this.form.reset();this.ngOnInit();});
    
  }

  borrarHabilidad(id:number)
  {
    this.datosPortfolio.eliminarDatos(this.datosPortfolio.url+"/habilidades/"+id).subscribe(repuesta=>{this.ngOnInit();});
    
  }
}
