// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.13;

import "./interface/IERC20.sol";
import "./helper/ReentrancyGuard.sol";
import "./helper/SafeERC20.sol";

contract IFO is ReentrancyGuard {
    using SafeBEP20 for IERC20;

    // Info of each user.
    struct UserInfo {
        uint256 amount; // How many tokens the user has provided.
        bool claimed; // default false
    }

    // admin address
    address public adminAddress;
    // The raising token
    IERC20 public depositeToken;
    // The offering token
    IERC20 public offeringToken;
    // The block number when IFO starts
    uint256 public startBlock;
    // The block number when IFO ends
    uint256 public endBlock;
    // total amount of raising tokens need to be raised
    uint256 public raisingAmount;
    // total amount of offeringToken that will offer
    uint256 public offeringAmount;
    // total amount of raising tokens that have already raised
    uint256 public totalAmount;
    // address => amount
    mapping(address => UserInfo) public userInfo;
    // participators
    address[] public addressList;

    event Deposit(address indexed user, uint256 amount);
    event Harvest(
        address indexed user,
        uint256 offeringAmount,
        uint256 excessAmount
    );

    constructor(
        IERC20 _depositeToken,
        IERC20 _offeringToken,
        uint256 _startBlock,
        uint256 _endBlock,
        uint256 _offeringAmount,
        uint256 _raisingAmount,
        address _adminAddress
    ) {
        
        depositeToken = _depositeToken; // address(XYZ)
        offeringToken = _offeringToken; // address(ABC)
        startBlock = _startBlock; // 0
        endBlock = _endBlock; // 200
        offeringAmount = _offeringAmount; // 1
        raisingAmount = _raisingAmount; // 1000
        totalAmount = 0;
        adminAddress = _adminAddress;
    }

    modifier onlyAdmin() {
        require(msg.sender == adminAddress, "Only admin can call the function");
        _;
    }

    // ########################## Admin only ######################################

    function setOfferingAmount(uint256 _offerAmount) public onlyAdmin {
        require(block.number < startBlock, "You can not change the offering amount after it start");
        offeringAmount = _offerAmount;
    }

    function setRaisingAmount(uint256 _raisingAmount) public onlyAdmin {
        require(block.number < startBlock, "You can not change the Raising amount after it start");
        raisingAmount = _raisingAmount;
    }

    function finalWithdraw(
        uint256 _lpAmount,
        uint256 _offerAmount
    ) public onlyAdmin {
        require(
            _lpAmount < depositeToken.balanceOf(address(this)),
            "not enough token 0"
        );
        require(
            _offerAmount < offeringToken.balanceOf(address(this)),
            "not enough token 1"
        );
        depositeToken.safeTransfer(address(msg.sender), _lpAmount);
        offeringToken.safeTransfer(address(msg.sender), _offerAmount);
    }

    // ########################## external ######################################

    function deposit(uint256 _amount) external nonReentrant {
        require(
            block.number > startBlock && block.number < endBlock,
            "It's not started"
        );
        require(_amount > 0, "amount must be > 0");
        depositeToken.safeTransferFrom(address(msg.sender), address(this), _amount);
        uint256 userDepositedAmount = userInfo[msg.sender].amount;
        if (userDepositedAmount == 0) {
            addressList.push(address(msg.sender));
        }
        userInfo[msg.sender].amount = userDepositedAmount + _amount;
        totalAmount = totalAmount + _amount;
        emit Deposit(msg.sender, _amount);
    }

    function harvest() external nonReentrant {
        require(block.number > endBlock, "You can harvest after staking period close");
        require(userInfo[msg.sender].amount > 0, "You did not deposited any amount to this staking");
        require(!userInfo[msg.sender].claimed, "You do not have any reward to harvest");
        uint256 offeringTokenAmount = getOfferingAmount(msg.sender);
        uint256 refundingTokenAmount = getRefundingAmount(msg.sender);
        offeringToken.safeTransfer(address(msg.sender), offeringTokenAmount);
        if (refundingTokenAmount > 0) {
            depositeToken.safeTransfer(address(msg.sender), refundingTokenAmount);
        }
        userInfo[msg.sender].claimed = true;
        emit Harvest(msg.sender, offeringTokenAmount, refundingTokenAmount);
    }

    // ########################## View ######################################

    function hasHarvest(address _user) external view returns (bool) {
        return userInfo[_user].claimed;
    }

    // allocation 100000 means 0.1(10%), 1 meanss 0.000001(0.0001%), 1000000 means 1(100%)
    function getUserAllocation(address _user) public view returns (uint256) {
        return (userInfo[_user].amount * 1e12 * 1e6) / totalAmount;
    }

    // get the amount of IFO token you will get
    function getOfferingAmount(address _user) public view returns (uint256) {
        if (totalAmount > raisingAmount) {
            uint256 allocation = getUserAllocation(_user);
            return (offeringAmount * allocation) / 1e6;
        } else {
            // userInfo[_user] / (raisingAmount / offeringAmount)
            return (userInfo[_user].amount * offeringAmount) / raisingAmount;
        }
    }

    // get the amount of lp token you will be refunded
    function getRefundingAmount(address _user) public view returns (uint256) {
        if (totalAmount <= raisingAmount) {
            return 0;
        }
        uint256 allocation = getUserAllocation(_user);
        uint256 payAmount = (raisingAmount * allocation) / 1e6;
        return userInfo[_user].amount - payAmount;
    }

    function getAddressListLength() external view returns (uint256) {
        return addressList.length;
    }

    
}
