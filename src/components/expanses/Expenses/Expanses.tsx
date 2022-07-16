import React, { Fragment } from "react";
import { ExpansesSortTable } from "../ExpansesSortTable";
import tab from "../../../mocks/tab.json";
import { useTab } from "../../../hooks/useTab";
import "./Expanses.scss";
import { ExpansesFilterTable } from "../ExpansesFilterTable";

type Tab = {
  id: string;
  title: string;
};
const tabData: Tab[] = tab;
export const Expanses: React.FC = () => {
  const { activeTab: active, changeTabHandler: changeTabsHandler } = useTab(
    tab[0].id
  );
  let content = <p>No Content</p>;
  if (active === tab[0].id) {
    content = <ExpansesSortTable />;
  }
  if (active === tab[1].id) {
    content = <ExpansesFilterTable />;
  }

  return (
    <Fragment>
      <div className="tab">
        <ul className="tab__list">
          {tabData.map((tab) => (
            <li
              className={active === tab.id ? "tab__item" : ""}
              key={tab.id}
              id={tab.id}
              onClick={() => {
                changeTabsHandler(tab.id);
              }}
            >
              {tab.title}
            </li>
          ))}
        </ul>
      </div>
      {content}
    </Fragment>
  );
};
