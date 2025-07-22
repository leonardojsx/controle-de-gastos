let listaGastos = JSON.parse(localStorage.getItem('gastos')) || []
let totalGastos = 0
let editandoIndex = -1

const form = document.querySelector('.form-gasto')
const inputDescricao = document.getElementById('idesc')
const inputValor = document.getElementById('ival')


atualizarTela()


form.addEventListener('submit', function (event) {
  event.preventDefault()

  const descricao = inputDescricao.value.trim()
  const valor = parseFloat(inputValor.value)

  if (descricao === '' || isNaN(valor) || valor <= 0) {
    alert('Por favor, preencha todos os campos corretamente.')
    return
  }

  if (editandoIndex === -1) {
 
    const gasto = { descricao, valor }
    listaGastos.push(gasto)
  } else {
  
    const gastoAntigo = listaGastos[editandoIndex]
    totalGastos -= gastoAntigo.valor

    listaGastos[editandoIndex] = { descricao, valor }
    editandoIndex = -1
  }

  salvarGastos()
  atualizarTela()


  inputDescricao.value = ''
  inputValor.value = ''
  inputDescricao.focus()
})


function adicionarGastoNaTela(gasto, index) {
  const novoGasto = document.createElement('div')
  novoGasto.classList.add('gasto-item')

  novoGasto.innerHTML = `
    <p><strong>${gasto.descricao}</strong> - R$ ${gasto.valor.toFixed(2)}</p>
    <button onclick="editarGasto(${index})">Editar</button>
    <button onclick="excluirGasto(${index})">Excluir</button>
  `

  document.querySelector('.lista-gastos').appendChild(novoGasto)
}


function excluirGasto(index) {
  totalGastos -= listaGastos[index].valor
  listaGastos.splice(index, 1)
  salvarGastos()
  atualizarTela()
}


function editarGasto(index) {
  const gasto = listaGastos[index]
  inputDescricao.value = gasto.descricao
  inputValor.value = gasto.valor
  editandoIndex = index
}


function atualizarTela() {
  const lista = document.querySelector('.lista-gastos')
  lista.innerHTML = ''
  totalGastos = 0

  listaGastos.forEach((gasto, index) => {
    adicionarGastoNaTela(gasto, index)
    totalGastos += gasto.valor
  })

  atualizarTotal()
}


function atualizarTotal() {
  document.querySelector('.total-gastos').innerHTML = `
    <p>Total de gastos do mês: <strong>R$ ${totalGastos.toFixed(2)}</strong></p>
  `
}


function salvarGastos() {
  localStorage.setItem('gastos', JSON.stringify(listaGastos))
}
