import React, { Component } from 'react';
import { Card } from 'primereact/card';

export default class Device extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [
                { name: "BaconBit", Type: "", status: "Installed"},
                { name: "BaconBit", Type: "", status: "Installed"},
                { name: "BaconBit", Type: "", status: "Repair"},
                { name: "BaconBit", Type: "", status: "Available"},
                { name: "BaconBit", Type: "", status: "Bioclean"},
                { name: "BaconBit", Type: "", status: "Installed"},
                { name: "BaconBit", Type: "", status: "Installed"},
                { name: "Rasperry pig", Type: "", status: "Installed"},
                { name: "Rasperry pig", Type: "", status: "Installed"},
                { name: "Rasperry pig", Type: "", status: "Repair"},
                { name: "Rasperry pig", Type: "", status: "Available"},
            ]
        };
    }
    // const namesArr = names.filter((val, id) => {
    //     names.indexOf(val) == id;  // this just returns true
    // });

    getName = () => {
        return this.state.products.map((value,index) => {
             return value.name;

            // return (
            //     <div key={index}>
            //       { value.name}
            //     </div>
            //    );
        //   if (id === value.id) {
        //     return value.orgname;
        //   } else {
        //     return null;
        //   }
        });
      };

     uniqueNames=() => this.getName().filter((val,name) => this.getName().indexOf(val) == name);
      names=()=>Array.from(new Set(this.getName()))
      indexofnames =() =>{ 
          return this.names().map((value,index) =>{
            return (
                <div key={index}>
                  { value.name}
                </div>
               );


      })
    }

    render() {
        console.log("name",this.names());
        console.log("name2",this.indexofnames());
        return (
            <div>
            <Card className="Card">
                <p className="CardTitle">{this.names()}</p>
                <div className="p-grid p-align-center">
                    <div className="p-col grid">
                        Installed
                        <br></br>
                        <div className="grid-Content">
                            100
                        </div>
                    </div>
                    <div className="p-col grid">
                        Available
                        <br></br>
                        <div className="grid-Content">
                            25
                        </div>
                    </div>
                    <div className="p-col grid">
                        Bioclean
                        <br></br>
                        <div className="grid-Content">
                            25</div>
                    </div>
                    <div className="p-col grid">
                        Repair
                        <br></br>
                        <div className="grid-Content">
                            25
                        </div>
                    </div>
                    <div className="p-col grid">
                        Disconnected
                        <br></br>
                        <div className="grid-Content">
                            25
                        </div>
                    </div>
                </div>
            </Card>
        </div>
        )
    }
}
