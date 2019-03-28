
import React, { Component } from 'react';
import { Select, } from 'antd';

import DataTable from '../containers/DataTable';

import { convert_units, } from '../../config/conversion-utils';
import { LEAK_COLUMNS } from '../../config/data-table-columns';

const { Option, } = Select;

export default class LeakTable extends Component {

    state = {
        selected_pressure_unit: 'Psi',
        selected_mass_rate_unit: 'g/min',     // check conversion-utils before changing keys
        selected_vol_rate_unit: 'SLPM',      // check conversion-utils before changing keys
    };

    pressure_filters = [
        { text: 'kPa', value: 'kpa' },
        { text: 'Psi', value: 'psi' },
        { text: 'bar', value: 'bar' },
    ];

    mass_rate_filters = [
        { text: 'g/min', value: 'g/min' },
        { text: 'kg/hr', value: 'kg/hr' },
        { text: 'kg/day', value: 'kg/day' },
        { text: 'tonne/month', value: 'tonne/month' },
        { text: 'tonne/year', value: 'tonne/year' },
    ];

    volume_rate_filters = [
        { text: 'SLPM', value: 'slpm' },
        { text: 'SLPH', value: 'slph' },
        { text: 'SCM/day', value: 'scm/day' },
        { text: 'SCM/month', value: 'scm/month' },
        { text: 'SCM/yr', value: 'scm/yr' },
        { text: 'SCFH', value: 'scfh' },
        { text: 'SCF/day', value: 'scf/day' },
        { text: 'SCF/yr', value: 'scf/yr' },
    ];

    render() {
        const { imagery, } = this.props;

        return (
            <div>
                {this._renderLeakTable.bind(this)(imagery)}
            </div>
        );
    }
 
    _renderLeakTable(imagery) {
        const { leaks } = imagery;
        
        const converted_leaks = this.processConversions(leaks);

        return (
            <DataTable
                rows={converted_leaks}
                columns={LEAK_COLUMNS.call(this)}
                headerJSX={this._renderHeader(imagery)}
            />
        );
    }

    processConversions(leaks) {
        const { selected_pressure_unit, selected_mass_rate_unit, selected_vol_rate_unit, } = this.state;

        if (selected_pressure_unit)
            leaks = leaks.map(l => {
                l.pressure = convert_units('pressure', l.pressure_units, selected_pressure_unit, l.pressure);
                l.pressure_units = selected_pressure_unit;
                return l;
            });
            
        if (selected_mass_rate_unit)
            leaks = leaks.map(l => {
                l.mass_rate = convert_units('mass_rate', l.mass_rate_units, selected_mass_rate_unit, l.mass_rate);
                l.mass_rate_units = selected_mass_rate_unit;
                return l;
            });

        if (selected_vol_rate_unit)
            leaks = leaks.map(l => {
                l.vol_rate = convert_units('vol_rate', l.vol_rate_units, selected_vol_rate_unit, l.vol_rate);
                l.vol_rate_units = selected_vol_rate_unit;
                return l;
            });

        return leaks;
    }

    _renderHeader(imagery) {
        const { wind_speed, wind_speed_units, wind_direction, cam_direction, } = imagery;
        const { selected_mass_rate_unit, selected_pressure_unit, selected_vol_rate_unit, } = this.state;
        
    //    const [ first_leak ] = imagery.leaks;

        return (
            <div className="col-md-12">

                {/** Leak Details */}
                <div className="row">
                    <div className="col-md-12">
                        <div className="pull-left">
                            <div style={{ fontWeight: 'bold' }}>
                                <span style={{ display: 'block' }}>Wind Speed: {wind_speed} {wind_speed_units}</span>
                                <span style={{ display: 'block' }}>Wind Direction: {wind_direction}&deg;</span>
                                {/* <span style={{ display: 'block' }}>Cam Direction: {cam_direction}&deg;</span> */}
                            </div>
                        </div>
                    </div>
                </div>

                {/** Leaks Units */}
                <div className="row" style={{ marginTop: 15 }}>
                    <div className="col-md-12">

                        <div className="row">
                            <div className="col-md-2">
                                <span><b>Units: </b></span>    
                            </div>

                            <div style={{ marginLeft: 20 }} className="col-md-3">
                                <Select
                                    defaultValue={selected_pressure_unit.toLowerCase()}
                                    onChange={(type => v => this.unitChangeHandler(type, v))('pressure')} 
                                    style={{ width: 110, }}>
                                    {this.pressure_filters.map(f => <Option value={f.value}>{f.text}</Option>)}
                                </Select>
                            </div>

                            <div className="col-md-3">
                                <Select 
                                    defaultValue={selected_mass_rate_unit.toLowerCase()}
                                    onChange={(type => v => this.unitChangeHandler(type, v))('mass_rate')}
                                    style={{ width: 110, }}>
                                    {this.mass_rate_filters.map(f => <Option value={f.value}>{f.text}</Option>)}
                                </Select>
                            </div>

                            <div className="col-md-3">
                                <Select 
                                    defaultValue={selected_vol_rate_unit.toLowerCase()}
                                    onChange={(type => v => this.unitChangeHandler(type, v))('vol_rate')}
                                    style={{ width: 110, }}>
                                    {this.volume_rate_filters.map(f => <Option value={f.value}>{f.text}</Option>)}
                                </Select>
                            </div>
                        </div>

                    </div>
                </div>
            
            </div>
        );
    }

    unitChangeHandler(unit_type, unit) {
        this.setState({ [`selected_${unit_type}_unit`]: unit, });
    }
}