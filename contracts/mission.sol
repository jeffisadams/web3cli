pragma solidity >=0.4.0 <0.6.0;

// contract CreateMission {
//     constructor() public { }

//     event MissionCreated(address missionAddress);

//     // Consider an event people can subscribe to
//     function newMission() public returns(Mission) {
//         Mission m = new Mission(msg.sender);
//         emit MissionCreated(address(m));
//         return m;
//     }

//     //tell me a position and I will tell you its address   
//     // function getMission(uint pos) public view returns(address missionAddress) {
//     //     return address(contracts[pos]);
//     // }
// }

contract Mission {
    address owner;
    address assignee;

    // The ipfs address for our products and our scan address
    string public productAddress;
    string public scanAddress;

    enum State { Created, Assigned, Paid }
    State public state = State.Created;

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

    constructor(string memory productHash) public payable {
        productAddress = productHash;
        owner = msg.sender;
    }

    function getOwner() public view returns(address) {
        return owner;
    }

    function assign(address missionAssignee) public onlyOwner inState(State.Created) {
        assignee = missionAssignee;
        state = State.Assigned;
    }

    function submit(string memory scanHash) public onlyAssignee inState(State.Assigned) {
        scanAddress = scanHash;
        msg.sender.transfer(address(this).balance);
    }

    function getBalance() public onlyAssignee view returns (uint256) {
        return address(this).balance;
    }
}