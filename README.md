# web3cli
Proof of concept testing the web3 api


## How to use

The following environment variables need to be set:
  - ETH_HOST
  -- Host and port (no protocol) for the node to connect to
  - FROM
  -- The account you are creating things from
  -- You'll need some ether in there to run contracts
  - ASSIGNEE
  -- The person who gets assigned the mission
  - IPFS_PRODUCT
  -- The hash key address in IPFS for the mission data
  -- We are treating it as a list of products to find
  - IPFS_SCANS
  -- The hash key address in IPFS of the collected data


Then run `sh deploy.sh`

This will do the following:
- Compile the contracts
- Deploy a contract factory
- Run the mission create method on the contract factory
-- This runs the mission constructor. Assigns the data to collect, and pays into the contract.
- Run the contract script which assigns the $ASSIGNEE submits the data as the assignee and then shows the balance of the contract along the way.