import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  miPorfolioEducacion:any;
  edicionEducacion=
  {
    id:'',
    institucion:'',
    linkImagen:'',
    carrera:'',
    estado:'',
    tiempoDesde:'',
    tiempoHasta:''
  };
  form:FormGroup;
  form1:FormGroup;
  _id!: number;
  _indice!:number;
  data$:Observable<boolean>;
  constructor(private datosPortfolio:PortfolioService, private formBuilder:FormBuilder)
  {
    this.data$ = datosPortfolio.sharingObservable;
    this.form=this.formBuilder.group({
      id: '',
      institucion: new FormControl('',Validators.compose([Validators.required])),
      linkImagen:new FormControl('',Validators.compose([Validators.required])),
      carrera:new FormControl('',Validators.compose([Validators.required])),
      estado:new FormControl('',Validators.compose([Validators.required])),
      tiempoDesde:new FormControl('',Validators.compose([Validators.required])),
      tiempoHasta:new FormControl('',Validators.compose([Validators.required])),
    })
    this.form1=this.formBuilder.group({
      id:'',
      institucion:new FormControl('',Validators.compose([Validators.required])),
      linkImagen:new FormControl('',Validators.compose([Validators.required])),
      carrera:new FormControl('',Validators.compose([Validators.required])),
      estado:new FormControl('',Validators.compose([Validators.required])),
      tiempoDesde:new FormControl('',Validators.compose([Validators.required])),
      tiempoHasta:new FormControl('',Validators.compose([Validators.required]))
    })
   }

  ngOnInit(): void
  {
    this.datosPortfolio.obtenerDatos(this.datosPortfolio.url+"/educacion").subscribe(data =>
    {
      this.miPorfolioEducacion=data;
    });
  }
  agregarEducacion()
  {
    this.datosPortfolio.guardarDatos(this.datosPortfolio.url+"/educacion",this.form.value).subscribe(repuesta=>{this.form.reset();this.ngOnInit();});
    
   
  }
  borrarEducacion(id:number)
  {
    this.datosPortfolio.eliminarDatos(this.datosPortfolio.url+"/educacion/"+id).subscribe(repuesta=>{this.ngOnInit();});
    
  }
  irEditarEducacion(indice:number,id:number)
  {
    this._indice=indice;
    this._id=id;
    this.edicionEducacion=this.miPorfolioEducacion[this._indice];
  }
  editarEducacion()
  {
    this.edicionEducacion=this.form1.value;
    this.datosPortfolio.modificarDatos(this.datosPortfolio.url+"/educacion/"+this._id,this.form1.value).subscribe(repuesta=>{this.ngOnInit();});
    
  }
}
