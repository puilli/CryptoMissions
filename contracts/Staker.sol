// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract Staker {

  mapping(address => uint256) public missionBalances;
  mapping(address => string) public missionDetail;
  mapping(address => uint256) public missionIncentivePerHero;
  mapping(address => uint256) public heroBalances;
  address public activeMission;

  event Stake(address indexed sender, uint256 amount);
    
  
  function stake(uint amount, uint amountPerHero, string memory description) public payable {
    activeMission = msg.sender;
    missionBalances[msg.sender] += amount;
    missionIncentivePerHero[msg.sender] = amountPerHero;
    missionDetail[msg.sender] = description;
    emit Stake(msg.sender, amount);
  }

  function withdraw() public {
    uint256 missionBalance = missionBalances[activeMission];
    require(missionBalance > missionIncentivePerHero[activeMission], "Sorry the mission has ben Completed");
    missionBalances[activeMission] = missionBalances[activeMission] - missionIncentivePerHero[activeMission];
    heroBalances[msg.sender] = heroBalances[msg.sender] + missionIncentivePerHero[activeMission];
  }

  
  function getMissionBalance() public view returns (uint){
      return missionBalances[activeMission];
  }

  function getMissionIncentivePerHero() public view returns (uint){
      return missionIncentivePerHero[activeMission];
  }

  function getMissionDescription() public view returns (string memory){
      return missionDetail[activeMission];
  }

  function getHeroBalance() public view returns (uint){
      return heroBalances[msg.sender];
  }



}
