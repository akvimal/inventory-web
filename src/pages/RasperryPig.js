import React, { Component } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

export default class RasperryPig extends Component {
    render() {
        return (
            <div>
                <Card>
                    <p className="cardname">RasperryPig</p>
                    <Button type="button" label="Installed" className="cardButton"></Button>
                    <Button type="button" label="Available" className="cardButton"></Button>
                    <Button type="button" label="Bioclean" className="cardButton"></Button>
                </Card>
            </div>
        )
    }
}
