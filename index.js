
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

const contractAddress = '0x0a73e8e443AD5D2Cb8541ce5D6B70Efd4421113a'
const abi = JSON.parse(
  '[ { "inputs": [ { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "amountPerHero", "type": "uint256" }, { "internalType": "string", "name": "description", "type": "string" } ], "name": "stake", "outputs": [], "stateMutability": "payable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "Stake", "type": "event" }, { "inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "activeMission", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getHeroBalance", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getMissionBalance", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, {	"inputs": [],	"name": "getMissionDescription", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getMissionIncentivePerHero", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "heroBalances", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "missionBalances", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "missionDetail", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "",	"type": "address" } ], "name": "missionIncentivePerHero", "outputs": [ {	"internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" } ]'
)





// Contract
const getContract = async web3 => {
  const quote = new web3.eth.Contract(abi, contractAddress)
  return quote
}

//Smart contract functions
const balance = async (result, contract, accounts) => {
  result = await contract.methods.getMissionBalance().call({ from: accounts[0] })
  document.getElementById('infoMissionBalance').innerHTML = result
}

const balance2 = async (result, contract, accounts) => {
  result = await contract.methods.getMissionBalance().call({ from: accounts[0] })
  document.getElementById('infoMissionBalance2').innerHTML = result
}

//Smart contract functions
const heroBalance = async (result, contract, accounts) => {
  result = await contract.methods.getHeroBalance().call({ from: accounts[0] })
  document.getElementById('infoHeroBalance').innerHTML = result
}


//Smart contract functions
const missionDescription = async (result, contract, accounts) => {
  result = await contract.methods.getMissionDescription().call({ from: accounts[0] })
  document.getElementById('infoMissionDescription').innerHTML = result
}

//Smart contract functions
const rewardHero = async (result, contract, accounts) => {
  result = await contract.methods.getMissionIncentivePerHero().call({ from: accounts[0] })
  document.getElementById('infoRewardPerHero').innerHTML = result
}



const stake = (result, contract, accounts) => {
  let inputDescription
  let inputReward
  let inputBudget
  $('#inputDescription').on('change', e => {
    inputDescription = e.target.value
  })
  $('#inputReward').on('change', e => {
    inputReward = e.target.value
  })
  $('#inputBudget').on('change', e => {
    inputBudget = e.target.value
  })

  $('#form').on('submit', async e => {
    e.preventDefault()
    await contract.methods.stake(inputBudget, inputReward, inputDescription).send({ from: accounts[0] })
    balance(result, contract, accounts)
    balance2(result, contract, accounts)
    missionDescription(result, contract, accounts)
    rewardHero(result, contract, accounts)
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
    balance2(result, contract, accounts)
    heroBalance(result, contract, accounts)
    missionDescription(result, contract, accounts)
    rewardHero(result, contract, accounts)
  })
}




// App
async function quoteApp() {
  const web3 = await getWeb3()
  const accounts = await web3.eth.getAccounts()
  const contract = await getContract(web3)
  let quote
  
  balance(quote, contract,accounts)
  balance2(quote, contract,accounts)
  heroBalance(quote, contract,accounts)
  missionDescription(quote, contract,accounts)
  rewardHero(quote, contract,accounts)
  
  withdraw(quote, contract, accounts)
  stake(quote, contract, accounts)
}

quoteApp()
