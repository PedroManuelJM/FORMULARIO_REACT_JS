

import React, { Component } from 'react';
import { Row, Col, Form, Input, Label, FormGroup ,Button,FormFeedback } from 'reactstrap';
import swal from 'sweetalert'; /* importando sweealert */
import './App.css';
// expresiones regulares
const textoRegex =RegExp(/^[a-zA-Z, ,ÑñÁáÉéÍíÓóÚúÜü]+$/);
const telefonoRegex =RegExp(/^[0-9]{3}[-. ][0-9]{3}[-. ][0-9]{4}$/);
const correoRegex=RegExp(/^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})$/);
const passwordRegex=RegExp(/^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/)
const generoRegex = RegExp(/^[A-ZÑñÁÉÍÓÚÜ]{1}[a-záéíóúü]+$/)
const placaRegex=RegExp(/^[A-Z]{3}[- ][0-9]{3}$/)
class App extends Component {

  constructor(props){
    super(props);
    // formulario
    this.state={ // ==> es el estado del campo del formulario
     nombres:'',  
     apellidos:'',
     edad:'',
     // validaciones del formulario
     mensajeNombre:'Valor invalido',
     mensajeApellido:'',
     mensajeEdad:'',
     invalidNombre:false,
     invalidApellido:false,
     invalidEdad:false,
    }
    // ligar el evento onchange con el constructor
    this.onChange=this.onChange.bind(this);
    this.EnviarBasedeDatos=this.EnviarBasedeDatos.bind(this);
  }

  // se activa el evento cuyo método es onchange
  // lo cual trae información del campo o valor

  onChange(e){
    let name= e.target.name;
    let value=e.target.value; 

    this.setState({
      [name]:value,
    });
    console.log(this.state); // mostrando en consola el cambio */
  }

  LimpiarFormulario(){
        document.getElementById('nombre').value = '';
        document.getElementById('apellido').value = '';
        document.getElementById('edad').value = '';
  }

  EnviarBasedeDatos(e){
    e.preventDefault();
    //validando los campos
    let valido =true;
    if(this.state.nombres ===''){ // || this.state.nombres === textoRegex.test(this.state.nombres)
        this.setState({
          invalidNombre:true,
          mensajeNombre:'El campo nombre es obligatorio',
        });
        valido=false;
    }
    if(this.state.apellidos===''){
      this.setState({
        invalidApellido:true,
        mensajeApellido:'El campo apellido es obligatorio',
      });
      valido=false;
    }
    if(this.state.edad ===''){
      this.setState({
        invalidEdad:true,
        mensajeEdad:'Indica tu edad',
      });
      valido=false;
    }
    if(valido){
      console.log("Se envian los datos."+JSON.stringify(this.state));
      var formData = new FormData();
      formData.append("nombres", this.state.nombres) // nombre_categoria es el nombre del atributo de la variable tabla categoria
      formData.append("apellidos", this.state.apellidos)
      formData.append("edad", this.state.edad)
      const rutaServicio = "https://pedrojm.000webhostapp.com/db_alumno/registraralumnos.php";// registrarcat.php
      fetch(rutaServicio, {
        method: 'POST',
        body: formData,
    })
        .then(
            res => res.text()
        )
        .then(
            (result) => {
                console.log(result);
                this.LimpiarFormulario();
                swal(
                  {
                      text: " Se registro el participante " + this.state.nombres + " .",
                      icon: "success",
                      button: "Ok",
                      timer: "2000",
                  });
            }
        )
    }
  }
  render() {

    return (
      <div className="container-fluid">
        <Row>
           <Col xs="12" id="titulo" className="text-center">
              Formulario validaciones
           </Col>
        </Row>
        <Row>
          <Col xs="3">
               
          </Col>
          <Col xs="6">
            <h2>Registro de Participantes</h2>
            <Form onSubmit={this.EnviarBasedeDatos}>
              <FormGroup>
                <Label>Nombres</Label>
                <Input type="text" id="nombre" name="nombres" value={this.state.nombres} onChange={this.onChange} invalid={this.state.invalidNombre} />    
                <FormFeedback>{this.state.mensajeNombre}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label>Apellidos</Label>
                <Input type="text" id="apellido" name="apellidos" value={this.state.apellidos} onChange={this.onChange} invalid={this.state.invalidApellido}/>    
                <FormFeedback>{this.state.mensajeApellido}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label>Edad</Label>
                <Input type="number" id="edad" name="edad" className="col-2" value={this.state.edad} onChange={this.onChange} invalid={this.state.invalidEdad}  min='1' step='1'/>    
                <FormFeedback>{this.state.mensajeEdad}</FormFeedback>
              </FormGroup>
              <FormGroup>
               <Button color="success">Guardar</Button>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}
export default App;