
import React from 'react';
import { Button, Switch, Icon, Popconfirm, } from 'antd';

import { string_sorter, } from '../config/utils';


export const PRODUCT_COLUMNS = function(componentRef) {
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