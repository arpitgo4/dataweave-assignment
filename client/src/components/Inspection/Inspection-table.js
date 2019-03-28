
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DatePicker, Select, Input, } from 'antd';

import DataTable from '../containers/DataTable';
import { 
    inspectionActionCreators,
    miscActionCreators,
} from '../../action-creators/index.action-creator';
import { INSPECTION_COLUMNS } from '../../config/data-table-columns';

import { 
    parseMomentToUnixTimeStamp,
    parseUnixTimestampToMoment,
} from '../../config/utils';

const { RangePicker, } = DatePicker;
const { Option, } = Select;
const InputGroup = Input.Group;

class InspectionTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inspections_loading: false,
        };
    }

    render() {
        const { inspections } = this.props;

        return (
            <div>
                {this._renderInspectionTable.bind(this)(inspections)}
            </div>
        );
    }

    _renderInspectionTable(inspections) {
        const { inspections_loading, } = this.state;

        return (
            <DataTable
                rows={this._filter_inspections(inspections)}
                columns={INSPECTION_COLUMNS.call(this)}
                table_name='Inspection Management'
                loading={inspections_loading}
                headerJSX={this._renderHeader.call(this)}
            />
        );
    }

    _renderHeader() {
        const { inspections, } = this.props;
        const { start_timestamp, end_timestamp, } = this.props.inspection_filters;
        const { selected_company, selected_site, selected_facility, } = this.props.inspection_filters;
        const { selected_facility_format, selected_site_format, } = this.props.inspection_filters;
        
        const SELECT_STYLE = { width: 276 };
        const site_formats = [ 
                { text: 'Name', value: 'name' }, 
                { text: 'Number', value: 'uid' }, 
                { text: 'LatLong', value: 'lat_long' }, 
                { text: 'LSD', value: 'lsd' } 
            ];
        const facility_formats = site_formats;

        return (
            <div className="col-md-12">

                <div className="row">

                    <div className="col-md-2">
                        <div className="row">
                            <div className="col-md-12">
                            <Select 
                                onChange={(type => value => this.onFilterSelect(type, value))('company')}
                                placeholder="Select Company"
                                defaultValue={selected_company}
                                style={{...SELECT_STYLE, marginTop: 32 }}>
                                <Option value={undefined}>No Filter</Option>
                                {inspections.map(i => {
                                    const { name } = i.company;
                                    return <Option value={name}>{name}</Option>
                                })}
                            </Select>    
                            </div>
                        </div>
                    </div>

                    <div className="col-md-2 col-md-offset-1">
                        <Select 
                            onChange={(type => value => this.onFilterSelect(type, value))('site_format')}
                            placeholder="Select Site Format"
                            defaultValue={selected_site_format}
                            disabled={selected_company === undefined}
                            style={{...SELECT_STYLE, marginTop: -10 }}>
                            <Option value={undefined}>No Filter</Option>
                            {site_formats.map(s => <Option value={s.value}>{s.text}</Option>)}
                        </Select>    
                    
                        <Select 
                            onChange={(type => value => this.onFilterSelect(type, value))('site')}
                            placeholder="Select Site"
                            value={selected_site}
                            disabled={selected_site_format === undefined}
                            style={{...SELECT_STYLE, marginTop: 6, }}>
                            <Option value={undefined}>No Filter</Option>
                            {inspections.map(i => {
                                const data = i.site[selected_site_format];
                                return <Option value={data}>{data}</Option>
                            })}
                        </Select>
                    </div>

                    <div className="col-md-2 col-md-offset-1">
                        <Select 
                            onChange={(type => value => this.onFilterSelect(type, value))('facility_format')}
                            placeholder="Select Facility Format"
                            defaultValue={selected_facility_format}
                            disabled={selected_site === undefined}
                            style={{...SELECT_STYLE, marginTop: -10 }}>
                            <Option value={undefined}>No Filter</Option>
                            {facility_formats.map(f => <Option value={f.value}>{f.text}</Option>)}
                        </Select>  

                       
                        <Select 
                            onChange={(type => value => this.onFilterSelect(type, value))('facility')}
                            placeholder="Select Facility"
                            value={selected_facility}
                            disabled={selected_facility_format === undefined}
                            style={{...SELECT_STYLE, marginTop: 6, }}>
                            <Option value={undefined}>No Filter</Option>
                            {inspections.map(i => {
                                const data = i.facility[selected_facility_format];

                                // filtering facility dropdown further, on the basis of selected_site & selected_company
                                if (i.site[selected_site_format] === selected_site && 
                                        i.company.name === selected_company)
                                    return <Option value={data}>{data}</Option>
                                else return null;
                            })}
                        </Select> 
                    </div>

                    <div className="col-md-3 pull-right">
                        <RangePicker
                            defaultValue={[
                                parseUnixTimestampToMoment(start_timestamp),
                                parseUnixTimestampToMoment(end_timestamp)
                            ]}
                            style={{ margin: '0 20px', marginTop: 32 }}
                            onChange={this._dateChangeHandler.bind(this)} />
                    </div>
                </div>
            </div>
        );
    }

    latlongChangeHandler(type, e, { dd, dms, dmsArray }) {
        const { saveInspectionFilterInRedux, } = this.props;
        console.log(type, dd);
     
        saveInspectionFilterInRedux(type, dd.join(','));
    }

    onFilterSelect(type, value) {
        const { saveInspectionFilterInRedux, } = this.props;

        // `saveInspectionFilterInRedux` itself adds `selected_`

        // on change in `filter_type`_format value, subsequent filter will reset
        const type_split = type.split('_');
        const identifier = type_split[type_split.length - 1];
        if (identifier === 'format') {
            const filter_type = type_split.filter(t => t !== 'format').join('_');
            console.log(filter_type);
            saveInspectionFilterInRedux(filter_type, undefined);
        }

        saveInspectionFilterInRedux(type, value);
    }

    _filter_inspections(inspections) {
        const { selected_company, selected_facility, selected_site, } = this.props.inspection_filters;
        const { selected_facility_format, selected_site_format, } = this.props.inspection_filters;

        const filtered_inspections = inspections.reduce((acc, i) => {
            const condtions = [];
            if (selected_company)
                condtions.push(i.company.name === selected_company);
    
            if (selected_site && selected_site_format)
                condtions.push(i.site[selected_site_format] === selected_site);

            if (selected_facility && selected_facility_format)
                condtions.push(i.facility[selected_facility_format] === selected_facility);
 
            const inspection_selected = condtions.reduce((acc, c) => acc && c, true);
            if(inspection_selected)
                acc.push(i);

            return acc;
        }, []);

        return filtered_inspections;
    }

    _markInspectionForGuest(inpsection_id, checked) {
        const { markGuestInspections,  } = this.props;

        this.setState({ inspections_loading: true }, () => {
            markGuestInspections([ inpsection_id ], checked)
            .then(() => this.setState({ inspections_loading: false }));
        });
    }

    _dateChangeHandler(dates) {
        const { saveInspectionTimstampsInRedux, } = this.props;
        const [ start_timestamp, end_timestamp ]  = [
            parseMomentToUnixTimeStamp(dates[0]),
            parseMomentToUnixTimeStamp(dates[1])
        ];

        saveInspectionTimstampsInRedux('start_timestamp', start_timestamp);
        saveInspectionTimstampsInRedux('end_timestamp', end_timestamp);
        
        this._fetchInspections(start_timestamp, end_timestamp);
    }

    componentDidMount() {
        const { inspections } = this.props;
        const { start_timestamp, end_timestamp, } = this.props.inspection_filters;

        if (inspections.length === 0) 
            this._fetchInspections(start_timestamp, end_timestamp);
    }

    _fetchInspections(start_timestamp, end_timestamp) {        
        const { getInspections } = this.props;

        this.setState({ inspections_loading: true }, () => {   
            getInspections(start_timestamp, end_timestamp)
            .then(() => this.setState({ inspections_loading: false }));
        });
    }

}

const mapStateToProps = ({ inspections, misc, auth, }) => {
    const { companies, inspection_filters, } = misc;
    const { logged_in_user, } = auth;

    return {
        inspections,
        companies,
        logged_in_user,
        inspection_filters,
    };
};

const mapDispatchToProps = (dispatch) => {
    const { getInspections, markGuestInspections,} = inspectionActionCreators;
    const { saveInspectionFilterInRedux, saveInspectionTimstampsInRedux, } = miscActionCreators;

    return bindActionCreators({
       getInspections,
       markGuestInspections,
       saveInspectionFilterInRedux,
       saveInspectionTimstampsInRedux,
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(InspectionTable);