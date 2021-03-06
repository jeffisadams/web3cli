#!/bin/bash

rm -rf contractBuild
npm run compile

MISSION_FACTORY_ADDRESS=`nodeGeth deployMissionFactory $ETH_HOST $FROM`


ipfs cat $IPFS_PRODUCT
echo '\n\n'


MISSION_ADDRESS=`nodeGeth createMission $ETH_HOST $MISSION_FACTORY_ADDRESS $FROM $IPFS_PRODUCT`

echo '\n\n'
echo $MISSION_ADDRESS
echo '\n\n'

nodeGeth runMission $ETH_HOST $MISSION_ADDRESS $FROM $ASSIGNEE $IPFS_SCANS


echo '\n\n'
ipfs cat $IPFS_SCANS
echo '\n\n'
