import React, { Component } from 'react';
import { Card } from 'primereact/card';
export default class BaconBit extends Component {
    render() {
        return (
            <div>
                <Card className="Card">
                    <p className="CardTitle">Bacon Bit</p>
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
