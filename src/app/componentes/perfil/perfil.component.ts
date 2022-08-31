import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { delay, Observable } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class PerfilComponent implements OnInit {
  miPorfolio:any;
  ocultar=false;
  form:FormGroup;
  form2:FormGroup;
  data$:Observable<boolean>;
  /* isLoad$:Observable<boolean>; */

  edicionPerfil={
    nombre:'',
    descripcion:'',
    linkImagen:''
  }
  public archivo:any;
  public previsualizacion: string | null ="";
  

  constructor(private datosPortfolio:PortfolioService, private formBuilder:FormBuilder)
  { 
    /* this.isLoad$=datosPortfolio.isLoad; */
    this.data$=datosPortfolio.sharingObservable;
    this.form=this.formBuilder.group({
      nombre:['',[Validators.required]],
      descripcion:['',[Validators.required]]
    })
    this.form2=this.formBuilder.group({linkImagen:['',Validators.required]})
  }

  ngOnInit(): void 
  {
    this.datosPortfolio.obtenerDatos(this.datosPortfolio.url+"/perfil").subscribe(data =>
      {
        this.miPorfolio=data;
        console.log(this.miPorfolio);
        console.log(this.previsualizacion);
        /* this.datosPortfolio.isLoadData=true; */
        this.previsualizacion=this.miPorfolio[0].linkImagen;
      });
  }

  editarNombre()
  {
   this.ocultar=true;
  }

  btnAceptar()
  {
    this.datosPortfolio.modificarDatos(this.datosPortfolio.url+"/perfil/1",this.form.value).subscribe(resp=>{this.ngOnInit();this.form.reset();});
    this.ocultar=false
    
  }
  btnCancelar()
  {
    this.ocultar=false;
  }

  
  capturarFile(event:any):any{
    this.previsualizacion=this.form2.value.linkImagen;
  }
  guardarImagen(){
    this.datosPortfolio.modificarDatos(this.datosPortfolio.url+"/perfil/1",this.form2.value).subscribe(resp=>{this.ngOnInit();})
  }
}

