import React, { useState } from "react";
import "./ReactTabs.css";

const tabsData = [
  {
    label: "Profile",
    content: <div>Profile Info Content</div>,
  },
  {
    label: "Dashboard",
    content: <div>Dashboard Content</div>,
  },
  {
    label: "Settings",
    content: <div>Settings Content</div>,
  },
  {
    label: "Invoice",
    content: <div>Invoice Content</div>,
  },
];

const ReactTabs = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <div className="react-tabs-container">
      <div className="tabs-container">
        {tabsData?.map((data, index) => {
          return (
            <button
              className={`tab ${selectedTab == index ? "active" : ""}`}
              onClick={() => setSelectedTab(index)}
            >
              {data.label}
            </button>
          );
        })}
      </div>
      <div className="data-container">{tabsData[selectedTab].content}</div>
    </div>
  );
};

export default ReactTabs;
