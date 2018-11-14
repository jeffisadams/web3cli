pragma solidity ^0.4.24;

contract Structured {
    ScanData public productData;

    struct ScanData {
        string name;
        uint price;
    }

    function set(string name, uint price) {
        productData = ScanData(name, price);
    }

    function getName() returns (string) {
        return productData.name;
    }

    function getPrice() returns (uint) {
        return productData.price;
    }
}
