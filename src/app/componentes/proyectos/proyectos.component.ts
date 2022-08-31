import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  miPorfolioProyectos:any;
  form:FormGroup;
  form2:FormGroup;
  _id!: number;
  _indice!:number;
  data$:Observable<boolean>;
  edicionProyecto={
    id:'',
    name:'',
    descripcion:'',
    link:'',
    linkImagen:'',
    fecha:''
  };
  constructor(private datosPortfolio:PortfolioService, private formBuilder:FormBuilder)
  {
    this.data$=datosPortfolio.sharingObservable;
    this.form=this.formBuilder.group({
      id:'',
      name:new FormControl('',Validators.compose([Validators.required])),
      descripcion:new FormControl('',Validators.compose([Validators.required])),
      link:new FormControl('',Validators.compose([Validators.required])),
      linkImagen:new FormControl('',Validators.compose([Validators.required])),
      fecha:new FormControl('',Validators.compose([Validators.required])),
    })
    this.form2=this.formBuilder.group({
      id:'',
      name:new FormControl('',Validators.compose([Validators.required])),
      descripcion:new FormControl('',Validators.compose([Validators.required])),
      link:new FormControl('',Validators.compose([Validators.required])),
      linkImagen:new FormControl('',Validators.compose([Validators.required])),
      fecha:new FormControl('',Validators.compose([Validators.required])),
    })
  }

  ngOnInit(): void
  {
    this.datosPortfolio.obtenerDatos(this.datosPortfolio.url+"/proyectos").subscribe(data =>
    {
      this.miPorfolioProyectos=data;
    });
  }
  agregarProyecto() 
  {
    this.datosPortfolio.guardarDatos(this.datosPortfolio.url+"/proyectos",this.form.value).subscribe(repuesta=>{this.form.reset();this.ngOnInit();});
    
  }
  borrarProyecto(id:number)
  {
    console.log(id);
    this.datosPortfolio.eliminarDatos(this.datosPortfolio.url+"/proyectos/"+id).subscribe(repuesta=>{this.ngOnInit();});
  
  }
  irEditarProyecto(indice:number,id:number)
  {
    this._indice=indice;
    this._id=id;
    this.edicionProyecto=this.miPorfolioProyectos[this._indice];
    console.log(indice);
    console.log(id);
    console.log(this.edicionProyecto);
  }
  editarProyecto()
  {
    this.edicionProyecto=this.form2.value;
    console.log(this.edicionProyecto);
    this.datosPortfolio.modificarDatos(this.datosPortfolio.url+"/proyectos/"+this._id,this.form2.value).subscribe(repuesta=>{this.ngOnInit();});
    
  }
}
