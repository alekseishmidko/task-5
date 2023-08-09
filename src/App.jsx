import { Form, Slider, InputNumber, Select, Button, Table } from "antd";
import React from "react";
import { faker } from "@faker-js/faker";
import { columns } from "./utils/columns";
// import { CSVLink } from "react-csv";
// import { headers } from "./utils/headersCVS ";
import CVSLink from "./cvs-link/CVSLink";
import SkrollBtn from "./scroll-btn/SkrollBtn";

import ScrollToTopButton from "./scroll-btn/SkrollBtn";
const App = () => {
  const [region, setRegion] = React.useState("az");
  const [errorCount, setErrorCount] = React.useState(0);
  const [seed, setSeed] = React.useState("");
  const [users, setUsers] = React.useState([]);

  const handleSeedChange = (e) => {
    setSeed(e);
  };

  const handleRandomSeed = () => {
    setSeed(Math.floor(Math.random() * 100000));
  };

  const generateUsers = (count, usersLength) => {
    const newUsers = [];
    usersLength = usersLength ? usersLength : 0;
    for (let i = 0; i < count; i++) {
      const user = {
        key: usersLength + i + 1,
        index: usersLength + i + 1,
        id: faker.random.numeric(10),
        fullName: faker.name.fullName(),
        address:
          faker.random.numeric(10) % 4 === 0 ||
          faker.random.numeric(10) % 9 === 0
            ? `${faker.address.countryCode(
                region
              )} ${faker.address.streetAddress(region)}`
            : `${faker.address.zipCode()} ${faker.address.cityName(
                region
              )} ${faker.address.streetAddress()} `,
        phone:
          faker.random.numeric(10) % 4 === 0
            ? faker.phone.imei()
            : faker.phone.number(),
      };

      handleError(user);
      newUsers.push(user);
    }

    return newUsers;
  };

  const handleError = (user) => {
    const alphabet =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (let j = 0; j < errorCount; j++) {
      const field = faker.helpers.arrayElement([
        "fullName",
        "address",
        "phone",
      ]);
      console.log(field);
      const value = user[field];
      console.log(value, "value");
      if (value.length > 0) {
        const type = Math.floor(Math.random() * 3);

        if (type === 0) {
          const index = Math.floor(Math.random() * value.length);
          user[field] = value.slice(0, index) + value.slice(index + 1);
        } else if (type === 1) {
          const index = Math.floor(Math.random() * (value.length + 1));
          const char = alphabet[Math.floor(Math.random() * alphabet.length)];
          user[field] = value.slice(0, index) + char + value.slice(index);
        } else {
          const index = Math.floor(Math.random() * (value.length - 1));
          user[field] =
            value.slice(0, index) +
            value.charAt(index + 1) +
            value.charAt(index) +
            value.slice(index + 2);
        }
      }
    }
  };
  React.useEffect(() => {
    faker.setLocale(region);
    faker.seed(+seed);
    setUsers(generateUsers(20));
  }, [region, errorCount, seed]);

  const handleScroll = (e) => {
    const bottom =
      Math.floor(e.target.scrollHeight - e.target.scrollTop) ===
      e.target.clientHeight;
    if (bottom) {
      setUsers([...users, ...generateUsers(10, users.length)]);
    }
  };

  return (
    <>
      <div className="p-11">
        <Form className="flex justify-around ">
          <Form.Item label={"Region"}>
            <Select
              style={{ width: 120 }}
              value={region}
              onChange={(value) => setRegion(value)}
              options={[
                { value: "az", label: "Azerbaijan" },
                { value: "sk", label: "Slovakia" },
                { value: "mk", label: "Makedonia" },
                { value: "pl", label: "Poland" },
                { value: "af_ZA", label: "South Africa" },
              ]}
            />
          </Form.Item>
          <Form.Item label={"Error"}>
            <div className="flex">
              <Slider
                className="flex-auto"
                style={{ width: 440 }}
                min={0}
                max={10}
                onChange={(e) => setErrorCount(e)}
                value={errorCount}
                step={0.01}
              />
              <InputNumber
                className="ml-4"
                min={0}
                max={1000}
                step={0.1}
                value={errorCount}
                onChange={(e) => setErrorCount(e)}
              />
            </div>
          </Form.Item>
          <Form.Item label={"Seed"} className="ml-12">
            <div className="">
              <InputNumber
                className="mr-3 flex-auto"
                value={seed}
                onChange={handleSeedChange}
              />
              <Button onClick={handleRandomSeed}>Random</Button>
            </div>
          </Form.Item>
        </Form>

        <div
          onScroll={handleScroll}
          className="overflow-auto relative"
          style={{ height: "570px" }}
        >
          <div className="mb-6">
            <ScrollToTopButton />
            <CVSLink users={users} />
          </div>
          <Table
            columns={columns}
            dataSource={users}
            size="large"
            pagination={false}
            bordered
          />
        </div>
      </div>
    </>
  );
};

export default App;
// rename
