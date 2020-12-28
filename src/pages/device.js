import React, { useEffect,useRef,useState  } from "react";
import DataCard from "../components/DataCard";
import Table from "../components/table";
import Band from "../components/band";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataCard } from "../redux/action";
import { Route, Switch, useHistory } from "react-router-dom";
import { fetchTable } from "../redux/action";
import _ from "lodash";
import { Dropdown } from "primereact/dropdown";

export default function Device() {

  let dt = useRef(null);

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
  const tableData = useSelector((state) => state.table.data);

  useEffect(() => {
    if (_.isEmpty(cardData)) {
    } else {
      dispatch(
        fetchTable("dashboard/company/status", { device: cardData[0].name })
      );
      history.push(`/device/${cardData[0].name}`);
    }
  }, [cardData]);

  const [item, setItem] = useState(null);


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
    dt.current.filter(event.value, 'name', 'equals');
    setItem(event.value);
}
const onFilterLocationChange = (event) => {
  dt.current.filter(event.value, 'location', 'equals');
  setItem(event.value);
}
const onFilterStatusChange = (event) => {
  dt.current.filter(event.value, 'status', 'equals');
  setItem(event.value);
}

  const dropDownFilter =(options,onChange)=>{
    return  <Dropdown
    value={item}
    options={options}
    onChange={onChange}
    placeholder="search"
    className="p-column-filter"
    showClear
  />
  }

  const columns = [
    { field: "name", header: "Name", filterElement: dropDownFilter(name,onFilterNameChange), filter:true},
    { field: "location", header: "Location", filterElement: dropDownFilter(location,onFilterLocationChange) ,filter:true},
    { field: "status", header: "Status", filterElement: dropDownFilter(status,onFilterStatusChange) ,filter:true},
    { field: "count", header: "Count" },
  ];

  const columns1 = [
    { field: "machine_id", header: "Machine Id" },
    { field: "installation_id", header: "Installation Id" },
    { field: "installation_date", header: "Uninstallation Date" },
    { field: "location", header: "Location" },
    { field: "uninstallation_date", header: "Uninstallation Date" },
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
                  {...props}
                  refs={dt}
                  columns={columns}
                  type="single"
                  select={rowClick}
                />
              )}
            />
            <Route
              path="/:device/:innertable"
              render={(props) => <Table {...props} columns={columns1} />}
            />
          </Switch>
        </div>
      </div>
    </>
  );
}
