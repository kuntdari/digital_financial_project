// SPDX-License-Identifier: MIT and Korea-University 
pragma solidity ^0.8.3;

import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "hardhat/console.sol";

contract Logic is Initializable, UUPSUpgradeable, ReentrancyGuardUpgradeable, OwnableUpgradeable {
   using CountersUpgradeable for CountersUpgradeable.Counter;
  CountersUpgradeable.Counter private _itemIds;
  CountersUpgradeable.Counter private _itemsSold;
  IERC20Upgradeable public tokenAccepted;
  uint256 surveyPrice;
  
   function initialize(address _token) initializer public {
        __Ownable_init();
        __UUPSUpgradeable_init();
        tokenAccepted =IERC20Upgradeable(_token);
        surveyPrice= 15 ether;
      
    }

  struct Users {
   
    address user;
    bool minted;
  }

  mapping(address => Users) private idToUsers;

  event UserMinted (
 
    address indexed user,
    bool minted
  );

  function survey(
    uint256 surveytotal
  ) public payable nonReentrant {
    require(surveytotal > 0, "Please send some answers");
    require(!ifUserMinted(msg.sender),"already minted for this survey");
  
    idToUsers[msg.sender] =  Users(
      msg.sender,
      true
    );

    IERC20Upgradeable(tokenAccepted).transfer(msg.sender, surveytotal*surveyPrice);

    emit UserMinted(
 
      msg.sender,
      true
    );
  }

  function ifUserMinted(address user) public view returns (bool result) {

      if (idToUsers[user].user==msg.sender) {
        return true;
      } else{
        return false;
      }

  }

  function winthdraw (address payable _addr) public onlyOwner {
    _addr.transfer(address(this).balance);
  }

    function winthdrawNXT (address payable _addr, uint256 _amount) public onlyOwner {
        IERC20Upgradeable(tokenAccepted).transferFrom(address(this),_addr, _amount);
  }

      function _authorizeUpgrade(address newImplementation)
        internal
        onlyOwner
        override
    {}

}