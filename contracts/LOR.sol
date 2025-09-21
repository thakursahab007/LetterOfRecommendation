// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LOR {
    address public owner;

    enum RecommendationStatus { None, Requested, Approved }

    struct Student {
        string name;
        string course;
        string email;
        RecommendationStatus status;
    }

    mapping(uint256 => Student) private students;
    uint256 public studentCount;

    mapping(address => bool) public approversList;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can access this function");
        _;
    }

    modifier onlyApprover() {
        require(approversList[msg.sender], "Only approvers can approve recommendations");
        _;
    }

    event StudentAdded(uint256 indexed id, string name, string course, string email);
    event RecommendationRequested(uint256 indexed id);
    event RecommendationApproved(uint256 indexed id);

    constructor() {
        owner = msg.sender;
    }

    function addStudent(string memory _name, string memory _course, string memory _email)
        public
        returns (uint256)
    {
        uint256 id = studentCount++;
        students[id] = Student(_name, _course, _email, RecommendationStatus.None);

        emit StudentAdded(id, _name, _course, _email);
        return id;
    }

    function requestRecommendation(uint256 _id) public {
        require(_id < studentCount, "Student doesn't exist");
        require(students[_id].status == RecommendationStatus.None, "Already requested or approved");

        students[_id].status = RecommendationStatus.Requested;
        emit RecommendationRequested(_id);
    }

   function approveRecommendation(uint256 _id) public onlyApprover {
    require(_id < studentCount, "Student doesn't exist");
    require(students[_id].status != RecommendationStatus.Approved, "Recommendation already approved");
    require(students[_id].status == RecommendationStatus.Requested, "Recommendation not requested");

    students[_id].status = RecommendationStatus.Approved;
    emit RecommendationApproved(_id);
}


    function getStudent(uint256 _id)
        public
        view
        returns (string memory, string memory, string memory, string memory)
    {
        require(_id < studentCount, "Student doesn't exist");

        Student memory s = students[_id];

        string memory statusStr = "None";
        if (s.status == RecommendationStatus.Requested) statusStr = "Requested";
        else if (s.status == RecommendationStatus.Approved) statusStr = "Approved";

        return (s.name, s.course, s.email, statusStr);
    }

    function addApprover(address _approver) public onlyOwner {
        require(!approversList[_approver], "Approver already exists");
        approversList[_approver] = true;
    }

    function removeApprover(address _approver) public onlyOwner {
        require(approversList[_approver], "Approver doesn't exist");
        delete approversList[_approver];
    }
}
