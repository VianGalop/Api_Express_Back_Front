const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)
const userId = urlParams.get('id')
const formEdit = document.getElementById('formEditUser')
const retorno = document.getElementById('regresar')

fetch(`http://localhost:3000/api/users/${userId}/`)
  .then(response => response.json())
  .then((data) =>{
    const {name, email, role} = data
    document.getElementById('name').value = name;
    document.getElementById('email').value = email;
    document.getElementById('role').value = role;
})

formEdit.addEventListener('submit', async (e) =>{
  e.preventDefault();
  const data = new FormData(formEdit);
  const res = await fetch(`http://localhost:3000/api/users/update/${userId}/`,{
    method: 'PATCH',
    body: data
  })
  if(res.status === 200 ){
    alert('Usuario Actualizado')
    window.location.href = '../index.html'
  }else if(res.status === 404){
    alert('Faltan Datos')
  }else{
    alert('Error de actualizacion')
  }
})



retorno.addEventListener('click', () =>{
  window.location.href = '../index.html'
})