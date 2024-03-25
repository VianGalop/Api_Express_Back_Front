fetch('http://localhost:3000/api/users/all/')
  .then(response => response.json())
  .then((data) =>{
    console.log(data);
    data.forEach(user => {
      bodyTable.innerHTML += `<tr>
      <td>${user.id_user}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td>
          <img src="http://localhost:3000/api/imagen/${user.picture}" alt="imagen" height="50">
      </td>
      <td>
          <a href="../pages/update.html?id=${user.id_user}"><button class="btn btn-primary">Editar</button></a>
          <button type="submit" id="deleteBtn" onclick= "deleteUser(${user.id_user})" class="btn btn-danger" >Eliminar</button>
      </td>
  </tr>`
    });
  })

  //const queryString = window.location.search;
  //const urlParams = new URLSearchParams(queryString)
  //const userId = urlParams.get('id')

  async function deleteUser (id) {
    const decision = prompt('¿Desea eliminar al usuario? Si/NO');
    console.log(decision);
    if(isNaN(decision)){
      switch(decision.toLocaleLowerCase()){
        case 'si':
            const res = await fetch(`http://localhost:3000/api/users/delete/${id}/`,{
              method: 'DELETE',
            })
            if(res.status === 204 ){
              alert('Usuario Eliminado')
              window.location.href = 'index.html'
            }else{
              alert('Error de eliminacion')
            } 
            window.location.href = 'index.html'
        break;
        case 'no':
          window.location.href = 'index.html'
          break;
        default:
          alert("Decision no valida")  
          window.location.href = 'index.html'
          break
      }
    }else{
      console.log("null");
    }
  }
  
  /* borrar.addEventListener('click', () =>{
    console.log("Hola");
    alert('Hola')
  }) */

  /*borrar.addEventListener('click', async (e) =>{
      e.preventDefault();
      const decision = prompt("¿Desea eliminar al usuario?")
      if(decision === 'No'){
          alert("NO Elimino")
          // window.location.href = 'index.html'
      }else{
          alert("Elimino")
          //const data = new FormData(formEdit);
          /* const res = await fetch(`http://localhost:3000/api/users/delete/${userId}/`,{
          method: 'DELETE',
          body: data
          })
          if(res.status === 204 ){
          alert('Update of user')
          window.location.href = 'index.html'
          }else{
          alert('Error de actualizacion')
          } 
      }
  })*/
  