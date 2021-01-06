import React, { useEffect, useRef, useState } from "react";
import DataCard from "../components/DataCard";
import Table from "../components/table";
import Band from "../components/band";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataCard } from "../redux/action";
import { Route, Switch, useHistory } from "react-router-dom";
import { fetchTable } from "../redux/table/action";
import _ from "lodash";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";

export default function Company() {
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
  const data = useSelector((state) => state.table.data);
  const [cname, setCname] = useState(null);
  const [clocation, setClocation] = useState(null);
  const [cstatus, setCstatus] = useState(null);
  const deviceClick = (e) => {
    return (
      setCname(e.data.device_name),
      setClocation(e.data.location),
      setCstatus(e.data.status)
    );
  };
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDataCard("dashboard/company/devices"));
  }, [dispatch]);

  const cardData = useSelector((state) => state.dataCard.data);
  const tableData = useSelector((state) => state.table.data);

  useEffect(() => {
    if (_.isEmpty(cardData)) {
    } else {
      dispatch(
        fetchTable("dashboard/device/status", { company: cardData[0].name })
      );
      localStorage.setItem("device name", cardData[0].name);
      history.push(`/company/${cardData[0].name}`);
    }
  }, [cardData]);
  const [item, setItem] = useState(null);
  let dt = useRef(null);
  const getUnique = (arr, comp) => {
    const unique = arr
      .map((e) => e[comp])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter((e) => arr[e])
      .map((e) => arr[e]);
    return unique;
  };

  const uniqueName = getUnique(tableData, "name");
  const uniqueLoc = getUnique(tableData, "location");
  const uniqueStatus = getUnique(tableData, "status");

  const location = uniqueName.map((a) => {
    return a.location;
  });

  const deviceName = uniqueLoc.map((d) => {
    return d.name;
  });

  const status = uniqueStatus.map((status) => {
    return status.status;
  });

  const onFilterLocationChange = (event) => {
    dt.current.filter(event.value, "location", "equals");
    setItem(event.value);
  };
  const onFilterDeviceNameChange = (event) => {
    dt.current.filter(event.value, "name", "equals");
    setItem(event.value);
  };
  const onFilterStatusChange = (event) => {
    dt.current.filter(event.value, "status", "equals");
    setItem(event.value);
  };
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
  const expander = <Column expander style={{ width: "3em" }} />;
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
      field: "location",
      header: "Location",
      filter: filter,
      filterElement: dropDownFilter(location, onFilterLocationChange),
    },
    {
      field: "name",
      header: "Device Name",
      filter: filter,
      filterElement: dropDownFilter(deviceName, onFilterDeviceNameChange),
    },
    {
      field: "status",
      header: "Status",
      filter: filter,
      filterElement: dropDownFilter(status, onFilterStatusChange),
    },
    { field: "count", header: "Count" },
  ];

  const columns1 = [
    { field: "machine_id", header: "Machine Id" },
    { field: "installation_id", header: "Installation Id" },
    { field: "installation_date", header: "Installation Date" },
    { field: "location", header: "Location" },
    { field: "uninstallation_date", header: "Availability Date" },
  ];

  const columns2 = [
    { field: "installation_id", header: "Installation ID" },
    { field: "installation_date", header: "Installation Date" },
    { field: "location", header: "Location" },
    { field: "status", header: "Status" },
    { field: "uninstallation_date", header: "Uninstallation_date" },
    { field: "company", header: "Company" },
  ];
  const columns3 = [
    { field: "model", header: "Model" },
    { field: "manufacturer", header: "Manufacturer" },
    { field: "version", header: "Hardware Version" },
    { field: "commision_date", header: "Commission Date" },
    { field: "decommision_date", header: "Decommission Date" },
    { field: "cost_per_device", header: "Cost" },
  ];

  return (
    <>
      <div id="scroll-cards">
        <div className="mt-3 ml-4 mr-4">
          <DataCard name="company" id="device" url="dashboard/device/status" />
        </div>
      </div>
      <div id="table">
        <div className="mt-3 ml-4 mr-4">
          <Band
            name="Device Name"
            location="location"
            status="status"
            selectedName={cname}
            selectedLocation={clocation}
            selectedStatus={cstatus}
          />
          <Switch>
            <Route
              exact
              path="/company/:companyname"
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
                  select={deviceClick}
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
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </>
  );
}
