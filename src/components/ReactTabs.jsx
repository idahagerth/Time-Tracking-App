import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Home from "../pages/Home";
import Projects from "../pages/Projects";

export default function ReactTabs() {
  const [tabKey, initTabKey] = useState("one");
  return (
    <div>
      <Tabs fill activeKey={tabKey} onSelect={(e) => initTabKey(e)}>
        <Tab eventKey="one" title="Project">
          <Projects />
        </Tab>
        <Tab eventKey="two" title="Tasks">
          <Home />
        </Tab>
      </Tabs>
    </div>
  );
}
