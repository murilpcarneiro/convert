// Cotações das moedas em relação ao Real (BRL)
const USD = 5.48 // Dólar Americano
const GBP = 7.37 // Libra Esterlina
const EUR = 6.44 // Euro

// Seleção dos elementos do DOM
const form = document.querySelector('form')
const amount = document.getElementById('amount')
const currency = document.getElementById('currency')
const footer = document.querySelector('main footer')
const description = document.getElementById('description')
const result = document.getElementById('result')

// Evento para permitir apenas números no campo de valor
amount.addEventListener('input', () => {
  // Regex para detectar caracteres não numéricos
  const hasCharactersRegex = /\D+/g
  // Remove qualquer caractere que não seja número
  amount.value = amount.value.replace(hasCharactersRegex, '')
})

// Evento de submissão do formulário
form.addEventListener('submit', (e) => {
  // Previne o comportamento padrão do formulário (recarregar a página)
  e.preventDefault()

  // Verifica qual moeda foi selecionada e realiza a conversão
  switch (currency.value) {
    case 'USD':
      convertValues(amount.value, USD, 'U$')
      break
    case 'GBP':
      convertValues(amount.value, GBP, '£')
      break
    case 'EUR':
      convertValues(amount.value, EUR, '€')
      break
  }
})

function convertValues(amount, price, symbol) {
  try {
    // Exibe a cotação da moeda (ex: U$ 1 = R$ 5,48)
    description.textContent = `${symbol} 1 = ${formatCurrency(price)}`

    // Calcula o valor convertido
    let total = amount * price
    total = formatCurrency(total).replace('R$', '')

    // Exibe o resultado da conversão
    result.textContent = `${total} Reais`

    // Adiciona a classe para mostrar o resultado
    footer.classList.add('show-result')
  } catch (error) {
    // Tratamento de erro
    console.error('Error converting values:', error)
    footer.classList.remove('show-result')
    alert('Não foi possível converter os valores. Por favor, tente novamente.')
  }
}

function formatCurrency(value) {
  return Number(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}
