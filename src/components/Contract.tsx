import React, { useCallback, useEffect, useState } from "react";
import { TransactionType } from "../enums/TransactionType";
import type { IContract } from "../types/IContract";
import Function from "./Function";
import { Contract as EthersContract, ethers } from "ethers";

function Contract(props: { name: string }) {
  const [contractData, setContractData] = useState<IContract>();
  const [contract, setContract] = useState<EthersContract>();
  // get file
  useEffect(() => {
    const contract: IContract = require(`../abis/${props.name}.json`);

    console.log("\x1b[36m%s\x1b[0m", "abi", contract);
    setContractData(contract);
    setContract(() => {
      return new EthersContract(contract.address, contract.abi);
    });

    // duyet het function trong contract
  }, []);

  const callback = useCallback(
    async (functionName: string, type: TransactionType, data: any) => {
      console.log("\x1b[36m%s\x1b[0m", "{functionName, data}", {
        functionName,
        data,
      });
      const provider: ethers.providers.JsonRpcProvider =
        new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
      const signer = provider.getSigner();
      const res = await contract
        ?.connect(signer)
        .callStatic?.[functionName](...Object.values(data));
      console.log("\x1b[36m%s\x1b[0m", "res", res);
    },
    [contract]
  );

  const renderListFunction = (contractData?: IContract) => {
    const listFunction = contractData?.abi?.filter((value: any) => {
      return value.type === "function";
    });
    return listFunction?.map((value: any) => {
        return <Function data={value} callback={callback}></Function>;
    })
  };
  return (
    <div className="Contract">
      {/* <Function data={contractData?.abi[1]} callback={callback}></Function> */}
      {
          renderListFunction(contractData)
      }
    </div>
  );
}

export default Contract;
