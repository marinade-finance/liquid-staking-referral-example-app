#!/bin/bash

SCRIPT_DIR=$(dirname "$0")
BUILD_DIR="$SCRIPT_DIR/../build/"

aws s3 sync $BUILD_DIR s3://marinade-liquid-staking-referral-app --delete
