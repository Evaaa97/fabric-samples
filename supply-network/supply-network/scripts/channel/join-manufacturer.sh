#!/bin/bash
ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/project.com/orderers/orderer.project.com/msp/tlscacerts/tlsca.project.com-cert.pem
CORE_PEER_LOCALMSPID=ManufacturerMSP
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/manufacturer.project.com/peers/peer0.manufacturer.project.com/tls/ca.crt
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/manufacturer.project.com/users/Admin@manufacturer.project.com/msp
CORE_PEER_ADDRESS=peer0.manufacturer.project.com:9051
CHANNEL_NAME=mychannel
CORE_PEER_TLS_ENABLED=true
peer channel join -b mychannel.block >&log.txt
cat log.txt