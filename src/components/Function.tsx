import { BigNumber } from "ethers";
import React, { useEffect, useState } from "react";
import { Button, Col, FormControl, Row } from "react-bootstrap";
import { TransactionType } from "../enums/TransactionType";

const stringType = ['string', 'address'];

function Function(props: { data: any; callback: any }) {
  const [functionData, setFunctionData] = useState<any>({});
  const [paramValues, setParamValues] = useState<any>({});
  // get file
  useEffect(() => {
    console.log("\x1b[36m%s\x1b[0m", "props", props);
    setFunctionData(props.data);
  }, [props]);

  const renderInputParams = () => {
    return functionData?.inputs?.map((value: any, index: number) => {
      return (
        <div key={value.name}>
          <Row>
            <Col md={8}>
              <Row>
                <Col md={2}>Params {index}:</Col>
                <Col md={12}>
                  <FormControl
                    placeholder={`${value.name}: ${value.type}`}
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(element) => {
                      setParamValues((old: any) => {
                        let input: string | number | BigNumber = element.target.value;
                        const type = value.type;

                        if (stringType.includes(type)) {
                          return { ...old, [value.name]: input };
                        }
                        
                        input = BigNumber.from(input);
                        return { ...old, [value.name]: input };
                      });
                    }}
                  />
                </Col>
              </Row>
              <br />
            </Col>
          </Row>
        </div>
      );
    });
  };
  return (
    <div className="Function">
      <h2>{functionData?.name}</h2>
      {renderInputParams()}
      <Row>
        <Col md={1}>
          <Row>
            <Button
              variant={"success"}
              onClick={() => {
                console.log("\x1b[36m%s\x1b[0m", "paramsValues", paramValues);
                props.callback(
                  functionData.name,
                  TransactionType.CALL,
                  paramValues
                );
              }}
            >
              Call
            </Button>
          </Row>
        </Col>
      </Row>
      <Row className={"mt-1"}>
        <Col md={1}>
          <Row>
            <Button
              variant={"secondary"}
              onClick={() => {
                console.log("\x1b[36m%s\x1b[0m", "paramsValues", paramValues);
                props.callback(
                  functionData.name,
                  TransactionType.SEND,
                  paramValues
                );
              }}
            >
              Send
            </Button>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Function;
