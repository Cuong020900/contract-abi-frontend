export type IContract = {
    address: string;
    abi: IABI[];
}

export type IABI = {
    inputs: IAbiInput[];
    name: string;
    output: IAbiOutput[];
    stateMutability: string;
    type: string;
}

export type IAbiInput = {
    internalType: string;
    name: string;
    type: string;
}

export type IAbiOutput = {
    internalType: string;
    name: string;
    type: string;
}