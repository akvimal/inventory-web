/* eslint-disable no-sequences */
import React, { useEffect, useRef, useState } from "react";
import DataCard from "../components/DataCard";
import Table from "../components/table";
import Band from "../components/band";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataCard } from "../redux/action";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { fetchTable } from "../redux/action";
import _ from "lodash";
import { Dropdown } from "primereact/dropdown";
import { Column } from "primereact/column";
import getUnique from "../pages/utils/removeDuplicates";
import API from "../config/apconfig";

export default function Device(props) {
  const device = useSelector((state) => state.dataCard.device);
  const tableData = useSelector((state) => state.table.data);
  const innerTableData = useSelector((state) => state.table.data2);
  const [dname, setDname] = useState("ALL");
  const [dlocation, setDlocation] = useState("ALL");
  const [dstatus, setDstatus] = useState("ALL");
  const [item, setItem] = useState(null);
  const [filter, setFilter] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [TraceBackId, setTraceBackId] = useState("");

  let dt = useRef(null);

  const rowClick = (e) => {
    return (
      setDname(e.data.name),
      setDlocation(e.data.location),
      setDstatus(e.data.status)
    );
  };

  const click = (d) => {
    setTraceBackId(d);
    setDname("ALL");
    setDlocation("ALL");
    setDstatus("ALL");
  };

  const dispatch = useDispatch();
  const history = useHistory();
  const locate = useLocation();
  const pathItems = locate.pathname.split("/");
  useEffect(() => {
    dispatch(fetchDataCard("dashboard/device/inventory", "device"));
  }, [dispatch]);
  useEffect(() => {
    if (_.isEmpty(device)) {
    } else {
      dispatch(
        fetchTable("dashboard/company/status", { device: device[0].name })
      );
      setTraceBackId(device[0].name);
      history.push(`/device/${device[0].name}`);
    }
  }, [device, dispatch, history]);

  useEffect(() => {
    API.post("dashboard/company/status", { device: pathItems[2] })
      .then((e) => setFilterData(e.data))
      .catch((e) => console.log(e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathItems[2]]);
  const uniqueName = getUnique(filterData, "name");
  const uniqueLoc = getUnique(filterData, "location");
  const uniqueStatus = getUnique(filterData, "status");

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
  const expander = (
    <Column expander className="expander" style={{ width: "3em" }} />
  );
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
      header: "NAME",
      filterElement: dropDownFilter(name, onFilterNameChange),
      filter: filter,
    },
    {
      field: "location",
      header: "LOCATION",
      filterElement: dropDownFilter(location, onFilterLocationChange),
      filter: filter,
    },
    {
      field: "status",
      header: "STATUS",
      filterElement: dropDownFilter(status, onFilterStatusChange),
      filter: filter,
    },
    { field: "count", header: "COUNT" },
  ];

  const columns1 = [
    { field: "machine_id", header: "MACHINE ID", filter: false },
    { field: "installation_id", header: "CUSTOM ID", filter: false },
    {
      field: "installation_date",
      header: "UPDATE DATE",
      filter: false,
    },
    { field: "location", header: "LOCATION", filter: false },
    { field: "version", header: "VERSION" },
    { field: "cycle", header: "CYCLE" },
  ];

  const columns2 = [
    { field: "installed_id", header: " CUSTOM ID" },
    { field: "installed_date", header: "UPDATE DATE" },
    { field: "name", header: "COMPANY" },
    { field: "location", header: "LOCATION" },
    { field: "status", header: "STATUS" },
    { field: "version", header: "VERSION" },
    { field: "comments", header: "COMMENTS" },
  ];

  const pages = true;

  return (
    <>
      <div id="scroll-cards">
        <div className="mt-3 ml-4 mr-4">
          <DataCard
            name="device"
            id="company"
            url="dashboard/company/status"
            data={device}
            click={click}
          />
        </div>
      </div>
      <div id="table">
        <div className=" mt-3 ml-4 mr-4">
          <Band
            name="Company Name"
            location="location"
            status="status"
            id={{ device: TraceBackId }}
            selectedName={dname}
            selectedLocation={dlocation}
            selectedStatus={dstatus}
            url="dashboard/company/status"
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
                  type="single"
                  select={rowClick}
                  page={pages}
                />
              )}
            />
            <Route
              path="/:device/:innertable"
              render={(props) => (
                <Table
                  tableData={tableData}
                  {...props}
                  columns={columns1}
                  columns2={columns2}
                  // columns3={columns3}
                  rowExpander={expander}
                  row={innerTableData}
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
