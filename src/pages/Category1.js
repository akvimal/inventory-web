import React, { Component } from 'react';
import { Card } from 'primereact/card';

export default class Category1 extends Component {
    render() {
        return (
            <div>
                <Card className="Card">
                    <p className="CardTitle">Category 1</p>
                    <div className="p-grid">
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
                                25
                                </div>
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
