import React, { useState } from "react";
import styled from "styled-components";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./App.css";
import { string } from "yargs";

const Containter = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  text-align: center;
  height: 100vh;
`;

const Header = styled.div`
  display: flex;
  height: 10%;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: black;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: start;
  align-items: center;
  background-color: pink;
`;

const Card = styled.div`
  align-items: center;
  padding: 10px 0px;
  width: 375px;

  // border: solid black 3px;
`;

const Chart = styled.div`
  width: 375px;
  height: 275px;
  padding: 10px 0px;

`;

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 5px;
`;

const Col = styled.div<{ flex: number }>`
  flex: ${({ flex }) => flex};
  input {
    width: 100px;
  }
`;

function App() {
  const [init, setInit] = useState(0);
  const [add, setAdd] = useState(0);
  const [months, setMonths] = useState(0);
  const [ratePerMonth, setRate] = useState(1);

  const [initInput, setInitInput] = useState("");
  const [addInput, setAddInput] = useState("");
  const [monthsInput, setMonthsInput] = useState("");
  const [rateInput, setRateInput] = useState("");

  const [totalInit, setTotalInit] = useState("0");
  const [totalMoney, setTotalMoney] = useState("0");
  const [totalProf, setTotalProf] = useState("0");
  const [profRate, setProfRate] = useState("0");

  const [chartData, setChartData] = useState<{name: string; money: number}[]>([]);

  const calc = () => {
    let money = init;
    let data = [];
    for (let i = 0; i < months; i++) {
      money = money * ratePerMonth + add;
      data.push({
        "name": `${(i+1)/12}`,
        "money": Math.floor(money),
      });
    }

    setChartData(data);

    const _totalMoney = Math.floor(money);
    const _totalInit = add * months + init;
    const _totalProf = _totalMoney - _totalInit;
    const _profRate = Math.floor((_totalProf / _totalInit) * 100);

    setTotalInit(addComma(_totalInit.toString()));
    setTotalMoney(addComma(_totalMoney.toString()));
    setTotalProf(addComma(_totalProf.toString()));
    setProfRate(addComma(isNaN(_profRate) ? "0" : _profRate.toString()));
  };

  const addComma = (str: string) => {
    let res = str;
    for (let i = str.length - 3; i > 0; i -= 3) {
      res = res.slice(0, i) + "," + res.slice(i);
    }
    return res;
  };

  const onClickClear = () => {
    setInit(0);
    setAdd(0);
    setMonths(0);
    setRate(1);

    setInitInput("");
    setAddInput("");
    setMonthsInput("");
    setRateInput("");

    setTotalInit("0");
    setTotalMoney("0");
    setTotalProf("0");
    setProfRate("0");

    setChartData([]);
  };

  const onClickOk = () => {
    calc();
  };

  const onChangeInit = (event: React.ChangeEvent<HTMLInputElement>) => {
    let input = event.target.value.replaceAll(",", "");
    const inputNumber = parseInt(input);
    if (!isNaN(inputNumber)) {
      setInit(inputNumber);
      setInitInput(addComma(input));
    } else {
      setInitInput("");
    }
  };

  const onChangeAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
    let input = event.target.value.replaceAll(",", "");
    const inputNumber = parseInt(input);
    if (!isNaN(inputNumber)) {
      setAdd(inputNumber);
      setAddInput(addComma(input));
    } else {
      setAddInput("");
    }
  };

  const onChangeTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = parseInt(event.target.value);
    if (!isNaN(input)) {
      setMonths(input * 12);
      setMonthsInput(event.target.value);
    } else {
      setMonthsInput("");
    }
  };

  const onChangeRate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = parseInt(event.target.value);
    if (!isNaN(input)) {
      setRate(Math.pow(input / 100 + 1, 1 / 12));
      setRateInput(event.target.value);
    } else {
      setRateInput("");
    }
  };

  return (
    <Containter>
      <Header>Money Calculator</Header>
      <Content>
        <Card>
          <Row>
            <Col flex={2}>?????????</Col>
            <Col flex={1}>
              <input value={initInput} onChange={onChangeInit} />
            </Col>
            <Col flex={1}></Col>
          </Row>
          <Row>
            <Col flex={2}>???????????????</Col>
            <Col flex={1}>
              <input value={addInput} onChange={onChangeAdd} />
            </Col>
            <Col flex={1}>/???</Col>
          </Row>
          <Row>
            <Col flex={2}>?????????</Col>
            <Col flex={1}>
              <input value={monthsInput} onChange={onChangeTime} />
            </Col>
            <Col flex={1}>???</Col>
          </Row>
          <Row>
            <Col flex={2}>????????????</Col>
            <Col flex={1}>
              <input value={rateInput} onChange={onChangeRate} />
            </Col>
            <Col flex={1}>%</Col>
          </Row>
          <Row>
            <button onClick={onClickClear}>??????</button>
            <button onClick={onClickOk}>??????</button>
          </Row>
          <Row>
            <span>????????????{totalInit}</span>
            <span>????????????{totalMoney}</span>
          </Row>
          <Row>
            <span>????????????{totalProf}</span>
            <span>????????????{profRate}%</span>
          </Row>
        </Card>
        <Chart>
          {chartData.length > 0 && (
            <ResponsiveContainer>
              <LineChart
                width={730}
                data={chartData}
                margin={{ top: 10, left: 10, right: 15, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="money" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Chart>
      </Content>
    </Containter>
  );
}

export default App;
