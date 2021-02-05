/* eslint-disable no-sequences */
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
import getUnique from "../pages/utils/removeDuplicates";

export default function Company(props) {
  const data = useSelector((state) => state.table.data);
  const innerData = useSelector((state) => state.table.data2);
  const company = useSelector((state) => state.dataCard.company);
  let dt = useRef(null);

  const [cname, setCname] = useState("ALL");
  const [clocation, setClocation] = useState("ALL");
  const [cstatus, setCstatus] = useState("ALL");
  const [item, setItem] = useState(null);

  const [TraceBackId, setTraceBackId] = useState("");

  const deviceClick = (e) => {
    return (
      setCname(e.data.name),
      setClocation(e.data.location),
      setCstatus(e.data.status)
    );
  };
  const click = (d) => {
    setTraceBackId(d);
    setCname("ALL");
    setClocation("ALL");
    setCstatus("ALL");
  };
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDataCard("dashboard/company/devices", "company"));
  }, [dispatch]);

  useEffect(() => {
    if (_.isEmpty(company)) {
    } else {
      dispatch(
        fetchTable("dashboard/device/status", { company: company[0].name })
      );
      setTraceBackId(company[0].name);
      history.push(`/company/${company[0].name}`);
    }
  }, [company, history, dispatch]);
  const uniqueName = getUnique(data, "name");
  const uniqueLoc = getUnique(data, "location");
  const uniqueStatus = getUnique(data, "status");

  const deviceName = uniqueName.map((a) => {
    return a.name;
  });
  const location = uniqueLoc.map((d) => {
    return d.location;
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
      header: "LOCATION",
      filter: filter,
      filterElement: dropDownFilter(location, onFilterLocationChange),
    },
    {
      field: "name",
      header: "DEVICE NAME",
      filter: filter,
      filterElement: dropDownFilter(deviceName, onFilterDeviceNameChange),
    },
    {
      field: "status",
      header: "STATUS",
      filter: filter,
      filterElement: dropDownFilter(status, onFilterStatusChange),
    },
    { field: "count", header: "COUNT" },
  ];

  const columns1 = [
    { field: "machine_id", header: "MACHINE ID" },
    { field: "installation_id", header: "CUSTOM ID" },
    { field: "installation_date", header: "UPDATE DATE" },
    { field: "location", header: "LOCATION" },
    { field: "version", header: "VERSION" },
    { field: "cycle", header: "CYCLE" },
  ];

  const columns2 = [
    { field: "installed_id", header: "CUSTOM ID" },
    { field: "installed_date", header: "UPDATE DATE" },
    { field: "name", header: "COMPANY" },
    { field: "location", header: "LOCATION" },
    { field: "status", header: "STATUS" },
  ];
  const columns3 = [
    { field: "model", header: "MODEL" },
    { field: "manufacturer", header: "MANUFACTURER" },
    { field: "hardware_version", header: "HARDWARE VERSION" },
    { field: "commision_date", header: "COMMISSION DATE" },
    { field: "decommision_date", header: "DECOMMISSION DATE" },
    { field: "cycle", header: "Cycle" },
  ];
  const pages = true;
  return (
    <>
      <div id="scroll-cards">
        <div className="mt-3 ml-4 mr-4">
          <DataCard
            name="company"
            id="device"
            url="dashboard/device/status"
            data={company}
            click={click}
          />
        </div>
      </div>
      <div id="table">
        <div className="mt-3 ml-4 mr-4">
          <Band
            name="Device Name"
            location="location"
            status="status"
            id={{ company: TraceBackId }}
            selectedName={cname}
            selectedLocation={clocation}
            selectedStatus={cstatus}
            url="dashboard/device/status"
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
                  page={pages}
                />
              )}
            />
            <Route
              path="/:device/:innertable"
              render={(props) => (
                <Table
                  tableData={data}
                  {...props}
                  columns={columns1}
                  columns2={columns2}
                  columns3={columns3}
                  rowExpander={expander}
                  row={innerData}
                  page={pages}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </>
  );
}
