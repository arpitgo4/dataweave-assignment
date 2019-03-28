
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Link, } from 'react-router';
import { Breadcrumb, } from 'antd';

import DataTable from '../containers/DataTable';
import LeakModal from './Leak-Modal';

import { ROUTES, } from '../../config/constants';
import { IMAGERY_COLUMNS } from '../../config/data-table-columns';

class ImageryTable extends Component {

    state = {
        leak_modal_visible: false,
        modal_imagery: undefined,
        imagery_idx: 0,
    };

    render() {
        const { inspections, } = this.props;
        const { leak_modal_visible, modal_imagery, imagery_idx, } = this.state;

        return (
            <div>
                {this._renderImageryTable.bind(this)(inspections)}
                <LeakModal 
                    imagery={modal_imagery}
                    image_idx={imagery_idx}
                    onClose={() => this.setState({ leak_modal_visible: false })}
                    onOk={() => this.setState({ leak_modal_visible: false })}
                    modalVisible={leak_modal_visible} />
            </div>
        );
    }

    onSelectChange = (selectedRowKeys, selectedRows) => {
        // console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
 
    /**
     * this method assumes that in the representation of the user
     * table on screen `second` field is `user_id`
     */
    onSelect(_record, selected, _selectedRows, nativeEvent) {
        const { inspections } = this.props;
        const { selectedRows } = this.state;
        const tr = ReactDOM.findDOMNode(nativeEvent.target).parentNode.parentNode.parentNode.parentNode.parentNode;
        const username = tr.childNodes[1].textContent;

        const user_id = inspections.find(insp => insp._id === username)._id;

        if (selected) {
            const user_id_exists = selectedRows.find(uid => uid === user_id);
            if (!user_id_exists)
                this.setState({ 
                    selectedRows: [ ...selectedRows, user_id ]
                });
        } else {
            this.setState({ 
                selectedRows: selectedRows.filter(uid => uid !== user_id)
            });
        }
    }
 
    _renderImageryTable(inspections) {
        const { selectedRowKeys, inspection_loading, } = this.state;
        const { company_name, site_name, facility_name, date, } = this.props;

        // search for images by company name, site name, facility name and date.
        const imageries = inspections.reduce((acc, i) => {
            if (i.company.name === company_name && 
                    i.site.name === site_name &&
                    i.facility.name === facility_name &&
                    i.inspection.date === date)
                acc.push(i);

            return acc;
        }, []);

        return (
            <DataTable
                rows={imageries}
                columns={IMAGERY_COLUMNS.call(this)}
                rowClassName={ (record, index) => 'row-highlight' } 
                table_name='Imagery'
                loading={inspection_loading}
                headerJSX={this._renderHeader(imageries)}
            />
        );
    }

    _imageryClickHandler(imagery, imagery_idx) {
        this.setState({ leak_modal_visible: true, modal_imagery: imagery, imagery_idx, });
    }
 
    _renderHeader(imageries) {
        const { company_name, facility_name, site_name, date, } = this.props;
        const [ first_imagery ] = imageries;

        return (
            <div className="col-md-12">
                <div className="pull-left">
                    <div style={{ marginTop: -30, }}>
                        <Breadcrumb separator=">">
                            <Breadcrumb.Item style={{ textDecoration: 'underline' }}>
                                <Link to={ROUTES.INSPECTION_LAYOUT}>Inspections</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>{company_name}</Breadcrumb.Item>
                            <Breadcrumb.Item>{site_name}</Breadcrumb.Item>
                            <Breadcrumb.Item>{facility_name}</Breadcrumb.Item>
                            <Breadcrumb.Item>{date}</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>

                    <div style={{ margin: '20px 0'  }}>
                        <span style={{ display: 'block' }}>
                            Inspection Company: {first_imagery && first_imagery.inspector.company}
                        </span>
                        <span style={{ display: 'block' }}>
                            Inspector Name: {first_imagery && first_imagery.inspector.name}
                        </span>
                        <span style={{ display: 'block' }}>
                            MSS Certification #: {first_imagery && first_imagery.inspector.certification}
                        </span>
                    </div>

                </div>
            </div>
        );
    }
}


const mapStateToProps = ({ inspections }, ownProps) => {
    const { company_name, site_name, facility_name, date } = ownProps.location.state;

    return {
        inspections,
        company_name, 
        site_name, 
        date,
        facility_name,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({

    }, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ImageryTable));