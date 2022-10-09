
// Web3
const getWeb3 = () => {
  return new Promise((resolve, reject) => {
    window.addEventListener('load', async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum)
        try {
          // ask user permission to access his accounts
          await window.ethereum.request({ method: 'eth_requestAccounts' })
          resolve(web3)
        } catch (error) {
          reject(error)
        }
      } else {
        reject('MetaMask is NOT installed')
      }
    })
  })
}

const contractAddress = '0x072d29B6691B0b8e79B1Be9F865745C4BFC96307'
const abi = JSON.parse(
  '[ { "inputs": [], "name": "execute", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "stake", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "exampleExternalContractAddress",	"type": "address" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address",	"name": "sender",	"type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "Stake", "type": "event" }, { "inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "balance", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "balances", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "deadline", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "exampleExternalContract", "outputs": [ { "internalType": "contract ExampleExternalContract", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "threshold", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "timeLeft", "outputs": [ { "internalType": "uint256", "name": "timeleft", "type": "uint256" } ], "stateMutability": "view", "type": "function" } ]'
)



// Contract
const getContract = async web3 => {
  const quote = new web3.eth.Contract(abi, contractAddress)
  return quote
}

//Smart contract functions
const balance = async (result, contract, accounts) => {
  result = await contract.methods.balance().call({ from: accounts[0] })
  document.getElementById('lastInfo').innerHTML = result
}

const stake = (result, contract, accounts) => {
  let input
  $('#input').on('change', e => {
    input = e.target.value
  })

  $('#form').on('submit', async e => {
    e.preventDefault()
    await contract.methods.stake(input).send({ from: accounts[0] })
    balance(result, contract, accounts)
  })
}

const withdraw = (result, contract, accounts) => {
  let input
  $('#input-withdraw').on('change', e => {
    input = e.target.value
  })

  $('#form-withdraw').on('submit', async e => {
    e.preventDefault()
    await contract.methods.withdraw().send({from: accounts[0] })
    balance(result, contract, accounts)
  })
}




// App
async function quoteApp() {
  const web3 = await getWeb3()
  const accounts = await web3.eth.getAccounts()
  const contract = await getContract(web3)
  let quote
  
  balance(quote, contract,accounts)
  withdraw(quote, contract, accounts)
  stake(quote, contract, accounts)
}

quoteApp()