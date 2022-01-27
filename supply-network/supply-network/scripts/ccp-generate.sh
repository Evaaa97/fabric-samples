#!/bin/bash

function one_line_pem {
    echo "`awk 'NF {sub(/\\n/, ""); printf "%s\\\\\\\n",$0;}' $1`"
}

function json_ccp {
    local PP=$(one_line_pem $5)
    local CP=$(one_line_pem $6)
    sed -e "s/\${ORG}/$1/" \
        -e "s/\${ORGMSP}/$2/" \
        -e "s/\${P0PORT}/$3/" \
        -e "s/\${CAPORT}/$4/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        ./connections/ccp-template.json 
}


ORG=producer
ORGMSP=Producer
P0PORT=7051
CAPORT=7054
PEERPEM=./supply-network/crypto-config/peerOrganizations/producer.project.com/tlsca/tlsca.producer.project.com-cert.pem
CAPEM=./supply-network/crypto-config/peerOrganizations/producer.project.com/ca/ca.producer.project.com-cert.pem

echo "$(json_ccp $ORG $ORGMSP $P0PORT $CAPORT $PEERPEM $CAPEM)" > ./connections/connection-producer.json

ORG=manufacturer
ORGMSP=Manufacturer
P0PORT=9051
CAPORT=8054
PEERPEM=./supply-network/crypto-config/peerOrganizations/manufacturer.project.com/tlsca/tlsca.manufacturer.project.com-cert.pem
CAPEM=./supply-network/crypto-config/peerOrganizations/manufacturer.project.com/ca/ca.manufacturer.project.com-cert.pem

echo "$(json_ccp $ORG $ORGMSP $P0PORT $CAPORT $PEERPEM $CAPEM)" > ./connections/connection-manufacturer.json
ORG=deliverer
ORGMSP=Deliverer
P0PORT=10051
CAPORT=9054
PEERPEM=./supply-network/crypto-config/peerOrganizations/deliverer.project.com/tlsca/tlsca.deliverer.project.com-cert.pem
CAPEM=./supply-network/crypto-config/peerOrganizations/deliverer.project.com/ca/ca.deliverer.project.com-cert.pem

echo "$(json_ccp $ORG $ORGMSP $P0PORT $CAPORT $PEERPEM $CAPEM)" > ./connections/connection-deliverer.json

ORG=retailer
ORGMSP=Retailer
P0PORT=11051
CAPORT=10054
PEERPEM=./supply-network/crypto-config/peerOrganizations/retailer.project.com/tlsca/tlsca.retailer.project.com-cert.pem
CAPEM=./supply-network/crypto-config/peerOrganizations/retailer.project.com/ca/ca.retailer.project.com-cert.pem

echo "$(json_ccp $ORG $ORGMSP $P0PORT $CAPORT $PEERPEM $CAPEM)" > ./connections/connection-retailer.json
