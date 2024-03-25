const formUser = document.getElementById('formNewUser')
const retorno = document.getElementById('retorna')

formUser.addEventListener('submit', async (e) => {
  e.preventDefault() // Prevenir que se refresque la pagina o otros situaciones por defecto

  const data = new FormData(formUser); // Recibe un formulario por defecto
  // enviar la Data al API
  // fetch -> heramienta para simplificar la comunicacion en tre FRONT y BACKEND para una peticion */
   const res = await fetch('http://localhost:3000/api/users/create/', { 
    method: 'POST',
    body: data
  });
 
  // Verifica que la data se enviaron los datos
   if (res.status === 201) {
    const data = await res.json()
    alert("Gracias por registrarse")
    window.location.href = '../index.html'
  }else if(res.status === 400){
    alert("Faltan datos")
  }else {
    alert('Lo siento, no se puedo registrar')
  }
}) 

console.log(retorno);

retorno.addEventListener('click', () =>{
  window.location.href = '../index.html'
})