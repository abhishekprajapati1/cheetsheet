import React from 'react';


const CustomTab = () => {
  const [activeTabId, setActiveTabId] = React.useState("home"); // home will be default
  
  const handleTabClick = (e) => {
    let { id: tabId } = e.currentTarget.dataset;
    setActiveTabId(tabId);
  }

  return (
    <section className='app-container'>
      
      <div>
        {/* tab list */}
        <ul className='tabList'>
          <li
            className={`nav-item cursor-pointer ${activeTabId === "tab1" && "activeTab" }`}
            role="button"
            data-id="tab1"
            onClick={(e) => handleTabClick(e)}
          >
            Tab 1
          </li>
          <li
            className={`nav-item cursor-pointer ${activeTabId === "tab2" && "activeTab" }`}
            role="button"
            data-id="tab2"
            onClick={(e) => handleTabClick(e)}
          >
            Tab 2
          </li>
          <li
            className={`nav-item cursor-pointer ${activeTabId === "tab3" && "activeTab" }`}
            role="button"
            data-id="tab3"
            onClick={(e) => handleTabClick(e)}
          >
            Tab 3
          </li>
        </ul>
      </div>
      {/* end of tab list */}
      
      
      
      {/* tab content */}
      <div className="tabContent">
        {
          activeTabId === "tab1" &&
          <div>
            Tab content for Tab 1
          </div>
        }
        {
          activeTabId === "tab2" &&
          <div>
            Tab content for Tab 2
          </div>
        }
        {
          activeTabId === "tab3" &&
          <div>
            Tab content for Tab 3
          </div>
        }
      </div>
      {/* end of tab content */}

    </section>
  )
}

export default CustomTab;
