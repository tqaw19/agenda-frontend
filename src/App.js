import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = ({
      
      title: 'Agenda usando ReactJS y Django Rest Framework',
      titulo: 'Insertar nuevo usuario', 
      usuarios:[],
      pos: null,
      id: 0,
      nombre: '',
      apellido: '',
      telefono: '',
      dni: ''

    })
    this.cambioNombre = this.cambioNombre.bind(this);
    this.cambioApellido = this.cambioApellido.bind(this);    
    this.cambioTelefono = this.cambioTelefono.bind(this);
    this.cambioDni = this.cambioDni.bind(this);

    this.mostrar = this.mostrar.bind(this);
    this.guardar = this.guardar.bind(this);
    this.eliminar = this.eliminar.bind(this);
  }

 
  componentWillMount() {
    axios.get(`http://localhost:8000/api/usuarios/`)
      .then((res) => {
        this.setState({usuarios:res.data})
      });
  } 


  render() {

    return (
         <div className="App">
         <h2>{this.state.title}</h2>
    <div class="container">
<div class="card">
<div class="card-header"></div>
	<div class="row">
		
        
        <div class="col-md-12">
 
        <div class="table-responsive">

                
              <table id="mytable" class="table table-borded table-striped">
                   
                   <thead>
                   
                   <th>Código</th>
                   <th>Nombre</th>
                    <th>Apellido</th>
                     <th>Telefono</th>
                     <th>DNI</th>
                      <th>Mantenimiento</th>

                   </thead>
    <tbody>
        {this.state.usuarios.map((usuario, index) => {
            return (
              <tr key={usuario.id}>
                <td>{usuario.id}<input type="checkbox" class="checkthis"/></td>
                <td>{usuario.nombre}</td>
                <td>{usuario.apellido}</td>
                <td>{usuario.telefono}</td>
                <td>{usuario.dni}</td>
                
                <td><button onClick={()=>this.mostrar(usuario.id, index)} className="btn btn-success"><i className="fa fa-upload"></i> Editar</button></td>
                <td><button onClick={()=>this.eliminar(usuario.id)} className="btn btn-danger"><i className="fa fa-trash"></i> Borrar</button></td>
              </tr>
            );
          })}
        </tbody>
        </table>
      </div>
      </div>
      <div class="container">
      <h1>{this.state.titulo}</h1>
        <form onSubmit={this.guardar}>
          <input type="hidden" value={this.state.id} />
          <p>Ingrese Nombre: <input type="text" value={this.state.nombre} onChange={this.cambioNombre} /></p>
          <p>Ingrese Apellidos: <input type="text" value={this.state.apellido} onChange={this.cambioApellido} /></p>
          <p>Ingrese Telefono: <input type="text" value={this.state.telefono} onChange={this.cambioTelefono} /></p>
          <p>Ingrese DNI: <input type="text" value={this.state.dni} onChange={this.cambioDni} /></p>          
          <p><input type="submit"/></p>
        </form> 
        </div>
      </div>
      </div>
      </div>
      </div>
    );
  }


  cambioNombre(e) {
    this.setState( {
      nombre: e.target.value
    })
  }

  cambioApellido(e) {
    this.setState( {
      apellido: e.target.value
    })
  }

  cambioTelefono(e) {
    this.setState( {
      telefono: e.target.value
    })
  }

  cambioDni(e) {
    this.setState( {
      dni: e.target.value
    })
  }


  mostrar(cod,index){
    axios.get('http://localhost:8000/api/usuarios/'+cod+'/')
    .then(res => {
      this.setState( {
        pos: index,
        titulo: 'Editar',
        id : res.data.id,
        nombre : res.data.nombre,
        apellido : res.data.apellido,
        telefono : res.data.telefono,
        dni : res.data.dni
      })
    });
  }

  guardar(e){
    e.preventDefault();
    let cod = this.state.id;
    let datos = {
      nombre : this.state.nombre,
      apellido : this.state.apellido,
      telefono : this.state.telefono,
      dni : this.state.dni
    }
    if(cod>0){ //Editamos un registro
      axios.put('http://localhost:8000/api/usuarios/'+cod+'/', datos )
      .then(res => {
        let indx = this.state.pos;
        this.state.usuarios[indx] = res.data;
        var temp = this.state.usuarios;
        this.setState( {
          pos: null,
          titulo:'Nuevo',
          id: 0,
          nombre : '',
          apellido : '',
          telefono : 0,
          dni : '',
          usuarios : temp
        });
      }).catch((error)=>{
        console.log(error.toString());
      });
    }else{ // Nuevo registro
      axios.post('http://localhost:8000/api/usuarios/', datos )
      .then(res => {
        this.state.usuarios.push(res.data);
        var temp = this.state.usuarios;
        this.setState( {
          id: 0,
          nombre : '',
          apellido : '',
          telefono : 0,
          dni : '',
          usuarios : temp
        });
      }).catch((error)=>{
        console.log(error.toString());
      });
    }
  }


  eliminar(cod){
    axios.delete('http://localhost:8000/api/usuarios/'+cod+'/')
    .then(res => {
      var temp = this.state.usuarios.filter((usuario)=>usuario.id !== cod);
      this.setState({
        usuarios: temp
      })
    });
  }

}

export default App;
