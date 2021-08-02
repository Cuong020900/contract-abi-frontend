import React, { useEffect, useState } from "react";
import { Button, Col, FormControl, InputGroup, Row } from "react-bootstrap";
import { TransactionType } from "../enums/TransactionType";

function Function(props: { data: any; callback: any }) {
  const [functionData, setFunctionData] = useState<any>({});
  const [paramValues, setParamValues] = useState<any>({});
  // get file
  useEffect(() => {
    console.log("\x1b[36m%s\x1b[0m", "props", props);
    setFunctionData(props.data);
    console.log("\x1b[36m%s\x1b[0m", "functionData", functionData);
  }, [props]);

  const renderInputParams = () => {
    return functionData?.inputs?.map((value: any, index: number) => {
      return (
        <div key={value.name}>
          <Row>
            <Col md={4}></Col>
            <Col md={4}>
              <InputGroup.Text>Params {index}</InputGroup.Text>
              <FormControl
                placeholder={`${value.name}: ${value.type}`}
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={(element) => {
                  setParamValues((old: any) => {
                    return { ...old, [value.name]: element.target.value };
                  });
                }}
              />
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
      <Button
        onClick={() => {
          console.log("\x1b[36m%s\x1b[0m", "paramsValues", paramValues);
          props.callback(functionData.name, TransactionType.CALL, paramValues);
        }}
      >
        Call
      </Button>
      <Button>Send</Button>
    </div>
  );
}

export default Function;
