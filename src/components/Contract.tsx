import React, { useCallback, useEffect, useState } from "react";
import { TransactionType } from "../enums/TransactionType";
import type { IContract } from "../types/IContract";
import Function from "./Function";
import { Contract as EthersContract, ethers } from "ethers";
import { Accordion } from "react-bootstrap";
import './Contract.css'

function Contract(props: { name: string }) {
  const [contractData, setContractData] = useState<IContract>();
  const [contract, setContract] = useState<EthersContract>();
  // get file
  useEffect(() => {
    const contract: IContract = require(`../abis/${props.name}`);

    console.log("\x1b[36m%s\x1b[0m", "abi", contract);
    setContractData(contract);
    setContract(() => {
      return new EthersContract(contract.address, contract.abi);
    });
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

      if (type === TransactionType.CALL) {
        const res = await contract
          ?.connect(signer)
          .callStatic?.[functionName](...Object.values(data));
        console.log("\x1b[36m%s\x1b[0m", "res", res);
        return res;
      }

      const tx = await contract
        ?.connect(signer)
        ?.[functionName](...Object.values(data));
      console.log("\x1b[36m%s\x1b[0m", "txHash", tx);
      return tx;
    },
    [contract]
  );

  const renderListFunction = (contractData?: IContract) => {
    const listFunction = contractData?.abi?.filter((value: any) => {
      return value.type === "function";
    });
    return listFunction?.map((value: any) => {
      return (
        <>
          <Accordion defaultActiveKey="1">
            <Accordion.Item eventKey="0">
              <Accordion.Header style={{boxShadow: '1px 1px 2px 2px #AAA'}}>{value.name}</Accordion.Header>
              <Accordion.Body>
                <Function data={value} callback={callback}></Function>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <br />
        </>
      );
    });
  };
  return (
    <div className="Contract">
      <h1 className="title" style={{textShadow: '2px 2px #AAA'}}>{props.name}</h1>
      {renderListFunction(contractData)}
    </div>
  );
}

export default Contract;
