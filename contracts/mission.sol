pragma solidity >=0.4.0 <0.6.0;

contract CreateMission {
    constructor() public { }

    event MissionCreated(address missionAddress);

    // Consider an event people can subscribe to
    function newMission(string memory ipfsProductAddress) public payable returns(Mission) {
        Mission m = (new Mission).value(msg.value)(ipfsProductAddress, msg.sender);
        emit MissionCreated(address(m));
        return m;
    }
}

contract Mission {
    address owner;
    address assignee;

    // The ipfs address for our products and our scan address
    string public productAddress;
    string public scanAddress;

    enum State { Created, Assigned, Paid }
    State public state = State.Created;

    constructor(string memory productHash, address creator) public payable {
        productAddress = productHash;
        owner = creator;
    }

    modifier inState(State _state) {
        require(state == _state, "This contract is not in the proper state");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can do this action");
        _;
    }

    modifier onlyAssignee() {
        require(msg.sender == assignee, "Only the assignee can do this action");
        _;
    }

    function assign(address missionAssignee) public onlyOwner inState(State.Created) {
        assignee = missionAssignee;
        state = State.Assigned;
    }

    function submit(string memory scanHash) public onlyAssignee inState(State.Assigned) {
        scanAddress = scanHash;
        msg.sender.transfer(address(this).balance);
        state = State.Paid;
    }

    function getBalance() public onlyAssignee view returns (uint256) {
        return address(this).balance;
    }
}