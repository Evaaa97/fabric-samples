#!/bin/bash
PEER=$1
ORG=$2
MSP=$3
PORT=$4
VERSION=$5

ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/project.com/orderers/orderer.project.com/msp/tlscacerts/tlsca.project.com-cert.pem
CORE_PEER_LOCALMSPID=$MSP
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/$ORG.project.com/peers/$PEER.$ORG.project.com/tls/ca.crt
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/$ORG.project.com/users/Admin@$ORG.project.com/msp
CORE_PEER_ADDRESS=$PEER.$ORG.project.com:$PORT
CHANNEL_NAME=mychannel
CORE_PEER_TLS_ENABLED=true
peer channel join -b mychannel.block >&log.txt
cat log.txt