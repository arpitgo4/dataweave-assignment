
import React from 'react';
import { Link } from 'react-router';
import { Button, Switch, Icon, Popconfirm, } from 'antd';
import convert from 'convert-units';

import { ROUTES, USER_ROLES, } from '../config/constants';

import { string_sorter, } from '../config/utils';


export const USER_COLUMNS = function(componentRef) {
    const { logged_in_user, } = componentRef.props;

    return [
        { 
            title: 'Username',
            key: 'username', 
            dataIndex: 'username',
            sorter: (a, b) => string_sorter(a.username, b.username),
        },
        {
            title: 'Companies',
            key: 'companies',
            dataIndex: 'companies',
            render: companies => companies.length != 0 ? companies.join(',') : 'N/A', 
        },
        {
            title: 'Role',
            key: 'role',
            dataIndex: 'role',
            sorter: (a, b) => string_sorter(a.role, b.role)
        },
        { 
            title: 'Name', 
            key: 'name',
            dataIndex: 'name',
            sorter: (a, b) => string_sorter(a.name, b.name)
        },
        { 
            title: 'Email Id',
            key: 'email', 
            dataIndex: 'email',
            render: email_id => <a href={`mailto:${email_id}`}>{email_id}</a>,
            sorter: (a, b) => string_sorter(a.email, b.email) 
        },
        {
            title: 'Actions',
            key: 'actions',
            render: user => (
                <div>
                    <Button icon="edit" size="small" type="primary" style={{ marginRight: 10 }}
                            onClick={((user) => () => componentRef.onEditClick(user))(user)}>Edit</Button>
                    {
                        logged_in_user._id === user._id ? null : (
                            <Popconfirm title="Are you sure?" 
                                icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                                onConfirm={((user) => () => componentRef.onRemoveClick(user))(user)} 
                                okText="Yes" cancelText="No">
                                <Button icon="delete" size="small" type="danger" style={{ }}>Delete</Button>
                            </Popconfirm>
                        )
                    }
                </div>
            )
        },
    ];
}


export const INSPECTION_COLUMNS = function() {
    const { logged_in_user, } = this.props;
    const { selected_site_format, selected_facility_format, } = this.props.inspection_filters;

    const columns = [
        { 
            title: 'Company',
            key: Math.random() * 10, 
            dataIndex: 'company.name',
            sorter: (a, b) => string_sorter(a.company.name, b.company.name),
        },
        { 
            title: `Site (${selected_site_format || 'name'})`,
            key: Math.random() * 10, 
            dataIndex: `site.${selected_site_format || 'name'}`,
            sorter: (a, b) => string_sorter(a.site.name, b.site.name),
        },
        { 
            title: `Facility (${selected_facility_format || 'name'})`,
            key: Math.random() * 10, 
            dataIndex: `facility.${selected_facility_format || 'name'}`,
            sorter: (a, b) => string_sorter(a.facility.name, b.facility.name),
        },
        { 
            title: 'Inspection Date',
            key: Math.random() * 10, 
            render: obj => (
                <Link to={{
                    pathname: ROUTES.IMAGERY_LAYOUT,
                    state: {
                        company_name: obj.company.name,
                        facility_name: obj.facility.name,
                        site_name: obj.site.name,
                        date: obj.inspection.date,
                    }
                }}>{obj.inspection.date}</Link>
            ),
            sorter: (a, b) => string_sorter(a.inspection.date, b.inspection.date),
        },
    ];

    if (logged_in_user && logged_in_user.role === USER_ROLES.ADMIN_GUEST)
        columns.push({
            title: 'Guest Visible',
            key: Math.random() * 100,
            dataIndex: 'guest_visible',
            render: (guest_visible, inspection) => (
                            <Switch
                                defaultChecked={guest_visible}
                                onChange={((_id) => (checked) => this._markInspectionForGuest(_id, checked))(inspection._id)}></Switch>), 
        });

    return columns;
};

export const IMAGERY_COLUMNS = function() {
    return [
        { 
            title: 'Image #',
            key: Math.random() * 100, 
            render: (text, record, index) => <span>{`#${index+1}`}</span>,
            sorter: (a, b) => string_sorter(a.company.name, b.company.name),
        },
        { 
            title: 'Image Name',
            key: Math.random() * 100, 
            dataIndex: 'inspection.name',
            sorter: (a, b) => string_sorter(a.inspection.name, b.inspection.name),
        },
        { 
            title: 'Inspection Timestamp',
            key: Math.random() * 100, 
            render: ({ inspection }) => <span>{`${inspection.date} ${inspection.time}`}</span>,
            sorter: (a, b) => string_sorter(`${a.inspection.date} ${a.inspection.time}`, `${b.inspection.date} ${b.inspection.time}`),
        },
        { 
            title: 'Leaks #',
            key: Math.random() * 100, 
            dataIndex: 'inspection',
            render: (imagery, _, idx) => (
                <span
                    onClick={((imagery, idx) => () => this._imageryClickHandler(imagery, idx+1))(imagery, idx)}>
                    <Link>{imagery.leaks.length}</Link>
                </span>
            ),
            sorter: (a, b) => string_sorter(a.inspection.leaks.length, b.inspection.leaks.length),
        },
    ];
};


export const LEAK_COLUMNS = function() {
    return [
        { 
            title: 'Leak #',
            key: Math.random() * 100,
            render: (text, record, index) => <span>{`#${index+1}`}</span>,
            sorter: (a, b) => string_sorter(a.number, b.number),
        },
        { 
            title: 'Pressure',
            key: Math.random() * 100, 
            dataIndex: 'pressure',
            render: p => p.toFixed(4),
            sorter: (a, b) => string_sorter(a.pressure, b.pressure),
        },
        { 
            title: 'Mass Rate',
            key: Math.random() * 100, 
            dataIndex: 'mass_rate',
            render: m => m.toFixed(4),
            sorter: (a, b) => string_sorter(a.mass_rate, b.mass_rate),
        },
        { 
            title: 'Vol Rate',
            key: Math.random() * 100, 
            dataIndex: 'vol_rate',
            render: v => v.toFixed(4),
            sorter: (a, b) => string_sorter(a.vol_rate, b.vol_rate),
        },
    ];
};