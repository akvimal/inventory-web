import React, { useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import { Button } from "react-bootstrap";

export const BulkUpload = (props) => {
  const [uploadData] = useState([]);
  const getTokenFromStorage = () => localStorage.getItem("token");
  const headers = {
    headers: {
      Accept: "application/json",
      "auth-token": getTokenFromStorage(),
    }
  }

  const onFileUpload = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const workBook = XLSX.read(bufferArray, {
          type: "buffer",
          cellDates: true,
        });
        const workSheetName = workBook.SheetNames[0];
        const workSheet = workBook.Sheets[workSheetName];
        const data = XLSX.utils.sheet_to_json(workSheet, { raw: false });

        if (props.toUpload === "device") {
          data
            .map((e) => {
              return props.devTypes.forEach((v) => {
                return props.orgLocations.forEach((l) => {
                  if (
                    e.location === l.location &&
                    e.organization === l.organization
                  ) {
                    if (e.deviceType === v.name) {
                      uploadData.push({
                        type_id: v.id,
                        version: e.version,
                        custom_id: e.customId,
                        alternate_id: e.alternateId,
                        comm_date: e.commisionDate,
                        org_location_id: l.id,
                        comments: e.comments,
                      });
                    }
                  }
                });
              });
            })
            .map(() => resolve(uploadData));
        }
      };

      fileReader.onerror = (err) => {
        reject(err);
      };
    });

    promise.then((data) => {
      console.log(data);
      axios
        .post(props.url, { data: data },headers)
        .then(() => alert(`Uploaded successfully `))
        .catch((e) => alert(e));
    });
  };

  const downloadTemplate = () => {
    let workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      XLSX.utils.json_to_sheet(props.template),
      "template"
    );
    XLSX.writeFile(workbook, "template.xlsx");
  };

  return (
    <div>
      <br />
      <Button variant="warning" onClick={() => downloadTemplate()}>
        download template
      </Button>
      <br />
      <br />
      <input
        className="form-control search-value"
        type="file"
        id="fileUpload"
        onChange={(e) => {
          const file = e.target.files[0];
          onFileUpload(file);
        }}
      />
      <br />
    </div>
  );
};
