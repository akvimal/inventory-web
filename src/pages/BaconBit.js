import React, { Component } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import Installed from "../components/Installed"

export default class BaconBit extends Component {
    render() {
        return (
            <div>
                <Card >
                    <p className="cardname">Bacon Bit</p>
                    <Button type="button" label="Installed" className="cardButton"></Button>
                    <Button type="button" label="Available" className="cardButton"></Button>
                    <Button type="button" label="Bioclean" className="cardButton"></Button>
                </Card>

            </div>
        )
    }
}
