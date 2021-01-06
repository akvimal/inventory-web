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
  const device = useSelector((state) => state.dataCard.device);
  const tableData = useSelector((state) => state.table.data);
  const innerTableData = useSelector((state) => state.table.data2);
  const [dname, setDname] = useState(null);
  const [dlocation, setDlocation] = useState(null);
  const [dstatus, setDstatus] = useState(null);
  const [item, setItem] = useState(null);

  let dt = useRef(null);

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
    dispatch(fetchDataCard("dashboard/device/inventory", "device"));
  }, [dispatch]);

  useEffect(() => {
    if (_.isEmpty(device)) {
    } else {
      dispatch(
        fetchTable("dashboard/company/status", { device: device[0].name })
      );
      localStorage.setItem("device name", device[0].name);
      history.push(`/device/${device[0].name}`);
    }
  }, [device, dispatch, history]);

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
          <DataCard
            name="device"
            id="company"
            url="dashboard/company/status"
            data={device}
          />
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
              path="/device/:deviceName"
              render={(props) => (
                <Table
                  tableData={tableData}
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
                  tableData={tableData}
                  {...props}
                  history={information}
                  columns={columns1}
                  columns2={columns2}
                  columns3={columns3}
                  rowExpander={expander}
                  row={innerTableData}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </>
  );
}
