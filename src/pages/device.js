import React, { useEffect, useRef, useState } from "react";
import DataCard from "../components/DataCard";
import Table from "../components/table";
import Band from "../components/band";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataCard } from "../redux/action";
import { Route, Switch, useHistory } from "react-router-dom";
import { fetchTable } from "../redux/action";
import _ from "lodash";
import { Dropdown } from "primereact/dropdown";
import { Column } from "primereact/column";

export default function Device() {
  let dt = useRef(null);

  const table = [
    {
      machine_id: "F4:5A:5C:F8:59:BC",
      installation_id: "AU-T0001",
      installation_date: "18-09-2020",
      location: "Auburn",
      uninstallation_date: "18-09-2020",
      // name: "company1",
      // location: "Beavercreek",
      // status: "installed",
      // count: 20,
      history: [
        {
          installation_id: 1,
          installation_date: "20/10/2020",
          location: "Rio De Janeiro",
          status: "Installed",
          uninstallation_date: "30/10/2020",
          company: "Nulla Tempor Odio",
        },
        {
          installation_id: 2,
          installation_date: "20/10/2020",
          location: "Tokiyo",
          status: "Installed",
          uninstallation_date: "30/10/2020",
          company: "Nulla Tempor Odio",
        },
        {
          installation_id: 3,
          installation_date: "20/10/2020",
          location: "Manila",
          status: "Installed",
          uninstallation_date: "30/10/2020",
          company: "Nulla Tempor Odio",
        },
      ],
    },
    {
      machine_id: "B4:5A:5C:F8:59:BC",
      installation_id: "AU-T0002",
      installation_date: "13-09-2020",
      location: "Auburn",
      uninstallation_date: "19-09-2020",
      // name: "company1",
      // location: "Beavercreek",
      // status: "installed",
      // count: 20,
      history: [
        {
          installation_id: 4,
          installation_date: "20/10/2020",
          location: "Rio De Janeiro",
          status: "Installed",
          uninstallation_date: "30/10/2020",
          company: "Nulla Tempor Odio",
        },
        {
          installation_id: 5,
          installation_date: "20/10/2020",
          location: "Tokiyo",
          status: "Installed",
          uninstallation_date: "30/10/2020",
          company: "Nulla Tempor Odio",
        },
        {
          installation_id: 6,
          installation_date: "20/10/2020",
          location: "Manila",
          status: "Installed",
          uninstallation_date: "30/10/2020",
          company: "Nulla Tempor Odio",
        },
      ],
    },
    {
      machine_id: "P4:5A:5C:F8:59:BC",
      installation_id: "AU-T0003",
      installation_date: "18-09-2020",
      location: "Auburn",
      uninstallation_date: "18-09-2020",
      // name: "company1",
      // location: "Beavercreek",
      // status: "installed",
      // count: 20,
      history: [
        {
          installation_id: 7,
          installation_date: "20/10/2020",
          location: "Rio De Janeiro",
          status: "Installed",
          uninstallation_date: "30/10/2020",
          company: "Nulla Tempor Odio",
        },
        {
          installation_id: 8,
          installation_date: "20/10/2020",
          location: "Tokiyo",
          status: "Installed",
          uninstallation_date: "30/10/2020",
          company: "Nulla Tempor Odio",
        },
        {
          installation_id: 9,
          installation_date: "20/10/2020",
          location: "Manila",
          status: "Installed",
          uninstallation_date: "30/10/2020",
          company: "Nulla Tempor Odio",
        },
      ],
    },
    {
      machine_id: "A4:5A:5C:F8:59:BC",
      installation_id: "AU-T0001",
      installation_date: "18-09-2020",
      location: "Auburn",
      uninstallation_date: "18-09-2020",
      // name: "company1",
      // location: "Beavercreek",
      // status: "installed",
      // count: 20,
      history: [
        {
          installation_id: 10,
          installation_date: "20/10/2020",
          location: "Rio De Janeiro",
          status: "Installed",
          uninstallation_date: "30/10/2020",
          company: "Nulla Tempor Odio",
        },
        {
          installation_id: 11,
          installation_date: "20/10/2020",
          location: "Tokiyo",
          status: "Installed",
          uninstallation_date: "30/10/2020",
          company: "Nulla Tempor Odio",
        },
        {
          installation_id: 12,
          installation_date: "20/10/2020",
          location: "Manila",
          status: "Installed",
          uninstallation_date: "30/10/2020",
          company: "Nulla Tempor Odio",
        },
      ],
    },
    {
      machine_id: "Q4:5A:5C:F8:59:BC",
      installation_id: "AU-T0001",
      installation_date: "18-09-2020",
      location: "Auburn",
      uninstallation_date: "18-09-2020",
      // name: "company1",
      // location: "Beavercreek",
      // status: "installed",
      // count: 20,
      history: [
        {
          installation_id: 13,
          installation_date: "20/10/2020",
          location: "Rio De Janeiro",
          status: "Installed",
          uninstallation_date: "30/10/2020",
          company: "Nulla Tempor Odio",
        },
        {
          installation_id: 14,
          installation_date: "20/10/2020",
          location: "Tokiyo",
          status: "Installed",
          uninstallation_date: "30/10/2020",
          company: "Nulla Tempor Odio",
        },
        {
          installation_id: 15,
          installation_date: "20/10/2020",
          location: "Manila",
          status: "Installed",
          uninstallation_date: "30/10/2020",
          company: "Nulla Tempor Odio",
        },
      ],
    },
  ];

  const information = [
    {
      model: "Model No.",
      manufacturer: "manufacturer",
      hardware_version: "Hardware Version",
      commission_date: "Commission Date",
      decommission_date: "Decommission Date",
      cost: "$900",
    },
  ];

  const [dname, setDname] = useState(null);
  const [dlocation, setDlocation] = useState(null);
  const [dstatus, setDstatus] = useState(null);

  const rowClick = (e) => {
    return (
      setDname(e.data.name),
      setDlocation(e.data.location),
      setDstatus(e.data.status)
    );
  };

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchDataCard("dashboard/device/inventory"));
  }, [dispatch]);

  const cardData = useSelector((state) => state.dataCard.data);
  const data = useSelector((state) => state.table.data);
  const innerData = useSelector((state)=>state.table.data2)

  useEffect(() => {
    if (_.isEmpty(cardData)) {
    } else {
      dispatch(
        fetchTable("dashboard/company/status", { device: cardData[0].name })
      );
      localStorage.setItem("device name", cardData[0].name);
      history.push(`/device/${cardData[0].name}`);
    }
  }, [cardData, dispatch, history]);

  const [item, setItem] = useState(null);

  const getUnique = (arr, comp) => {
    const unique = arr
      .map((e) => e[comp])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter((e) => arr[e])
      .map((e) => arr[e]);
    return unique;
  };

  const uniqueName = getUnique(data, "name");
  const uniqueLoc = getUnique(data, "location");
  const uniqueStatus = getUnique(data, "status");

  const name = uniqueName.map((a) => {
    return a.name;
  });

  const location = uniqueLoc.map((loc) => {
    return loc.location;
  });

  const status = uniqueStatus.map((status) => {
    return status.status;
  });

  const onFilterNameChange = (event) => {
    dt.current.filter(event.value, "name", "equals");
    setItem(event.value);
  };
  const onFilterLocationChange = (event) => {
    dt.current.filter(event.value, "location", "equals");
    setItem(event.value);
  };
  const onFilterStatusChange = (event) => {
    dt.current.filter(event.value, "status", "equals");
    setItem(event.value);
  };
  const expander = <Column expander style={{ width: "3em" }} />;
  const dropDownFilter = (options, onChange) => {
    return (
      <Dropdown
        value={item}
        options={options}
        onChange={onChange}
        placeholder="search"
        className="p-column-filter"
        showClear
      />
    );
  };
  const [filter, setFilter] = useState(false);
  const icon = (
    <i
      className="pi pi-filter"
      style={{
        fontSize: "10px",
        cursor: "pointer",
        paddingLeft: "50px",
      }}
      onClick={() => setFilter(!filter)}
    ></i>
  );

  const columns = [
    {
      field: "name",
      header: "Name",
      filterElement: dropDownFilter(name, onFilterNameChange),
      filter: filter,
    },
    {
      field: "location",
      header: "Location",
      filterElement: dropDownFilter(location, onFilterLocationChange),
      filter: filter,
    },
    {
      field: "status",
      header: "Status",
      filterElement: dropDownFilter(status, onFilterStatusChange),
      filter: filter,
    },
    { field: "count", header: "Count" },
  ];

  const columns1 = [
    { field: "machine_id", header: "Machine Id", filter: false },
    { field: "installation_id", header: "Installation Id", filter: false },
    {
      field: "installation_date",
      header: "Installation Date",
      filter: false,
    },
    { field: "location", header: "Location", filter: false },
    {
      field: "uninstallation_date",
      header: "Availability Date",
      filter: false,
    },
  ];

  const columns2 = [
    { field: "installed_id", header: "Installation ID" },
    { field: "installed_date", header: "Installation Date" },
    { field: "location", header: "Location" },
    { field: "status", header: "Status" },
    { field: "uninstallation_date", header: "Uninstallation Date" },
    { field: "name", header: "Company" },
  ];

  const columns3 = [
    { field: "model", header: "Model" },
    { field: "manufacturer", header: "Manufacturer" },
    { field: "version", header: "Hardware Version" },
    { field: "commision_date", header: "Commission Date" },
    { field: "decommision_date", header: "Decommission Date" },
    { field: "cycle", header: "Cycle" },
  ];

  return (
    <>
      <div id="scroll-cards">
        <div className="mt-3 ml-4 mr-4">
          <DataCard name="device" id="company" url="dashboard/company/status" />
        </div>
      </div>
      <div id="table">
        <div className=" mt-3 ml-4 mr-4">
          <Band
            name="Company Name"
            location="location"
            status="status"
            selectedName={dname}
            selectedLocation={dlocation}
            selectedStatus={dstatus}
          />
          <Switch>
            <Route
              exact
              path="/device/:BaconBit"
              render={(props) => (
                <Table
                  tableData={data}
                  filtericon={icon}
                  {...props}
                  refs={dt}
                  columns={columns}
                  columns2={columns2}
                  columns3={columns3}
                  type="single"
                  select={rowClick}
                />
              )}
            />
            <Route
              path="/:device/:innertable"
              render={(props) => (
                <Table
                  tableData={data}
                  {...props}
                  history={information}
                  columns={columns1}
                  columns2={columns2}
                  columns3={columns3}
                  rowExpander={expander}
                  row={innerData}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </>
  );
}
