import React from "react";
import BaconBit from '../pages/BaconBit';
import Device from './device';
import RasperryPig from '../pages/RasperryPig';
import Category1 from '../pages/Category1';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import Table from '../components/table';
import { Get_Clients } from '../middlewares/app';
const leftContents = (
  <React.Fragment>
    <div className="Bar-leftcontent">
      <div>
        Showing Result
        Company Name: All
        Location: All
        Status: All
      </div>
    </div>

  </React.Fragment>
);

const rightContents = (
  <React.Fragment>
    <InputText placeholder="Search" type="text" className="toolbar-inputtext" />
  </React.Fragment>
);

const HomePage = (props) => {
  return (
    <React.Fragment>

      <div className="homepagebody">
        {/* <div className="container"> */}
        <br></br>
        <div >
          <p className="device">Device</p>
        </div>
        <hr className="divider"></hr>
        <div className="scrollpanel-demo">

          <div className="p-grid">
            <div className="p-col-12 p-md-4">
              <ScrollPanel style={{ width: '325%', height: '170px' }} className="custombar2">
                <div style={{ lineHeight: '1.5', width: '1525px' }}>
                  <div className="p-grid p-align-center ">
                    <div className="p-col"><BaconBit /></div>
                    <div className="p-col"><RasperryPig /></div>
                    <div className="p-col"><Category1 /></div>
                    {/* <div className="p-col"><Device /></div> */}
                  </div>
                </div>
              </ScrollPanel>
            </div>
          </div>
        </div>
        <Toolbar left={leftContents} right={rightContents} />
        <br></br>
        <Table />
      </div>
      {/* </div> */}
    </React.Fragment>
  );
};

export default HomePage;
