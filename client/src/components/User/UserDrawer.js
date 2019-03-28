
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Drawer, Form, Button, Col, Row, Input, Select, Spin, } from 'antd';

import { 
    userActionCreators,
    miscActionCreators,
} from '../../action-creators/index.action-creator';

import { showErrorNotification } from '../../action-creators/index.action-creator';
import { USER_ROLES } from '../../config/constants';

const { Option } = Select;

class UserDrawer extends Component {

    state = {
        selected_user_role: undefined,
        api_loading: false,
        companies_api_loading: false,
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { title, visible, onClose, user, companies, action, } = this.props;
        const { api_loading, companies_api_loading, selected_user_role, } = this.state;

        return (
            <Drawer
                title={title}
                placement="right"
                closable={true}
                width={720}
                maskClosable={false}
                destroyOnClose={true}
                style={{
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                }}
                onClose={onClose}
                visible={visible}>
                
                <Form layout="vertical">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Username">
                                {getFieldDecorator('username', {
                                    rules: [{ message: 'Please input username!', required: true, }],
                                    initialValue: user && user.username
                                })(
                                    <Input
                                        name="username" placeholder="UserName" />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Full Name">
                            {getFieldDecorator('name', {
                                    rules: [{ message: 'Please input full name!', required: true, }],
                                    initialValue: user && user.name
                                })(
                                <Input  
                                    name="name" placeholder="Full Name" />
                            )}
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Email Id">
                                {getFieldDecorator('email', {
                                    rules: [{ message: 'Please input email id!', required: true, }],
                                    initialValue: user && user.email
                                })(
                                    <Input 
                                        name="email" placeholder="Email Id" />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="User Role">
                                {getFieldDecorator('role', {
                                    rules: [{ type: 'string', message: 'Please select role!', required: true, }],
                                    initialValue: user && user.role
                                })(
                                    <Select name="role"
                                        onChange={this.onRoleChange.bind(this)} placeholder="User's Role">
                                        {Object.values(USER_ROLES).map(role => (
                                            <Option value={role}>{role}</Option>
                                        ))}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Companies">
                                {getFieldDecorator('companies', {
                                    rules: [{ type: 'array', message: 'Please select company(s)!', required: selected_user_role === USER_ROLES.CLIENT_USER, }],
                                    initialValue: user && user.companies,
                                })(
                                    <Select name="company"
                                        mode="tags"
                                        disabled={
                                            selected_user_role !== USER_ROLES.CLIENT_USER && 
                                            this.props.form.getFieldValue('role') !== USER_ROLES.CLIENT_USER
                                        }
                                        notFoundContent={companies_api_loading ? <Spin size="small" /> : null}
                                        placeholder="User's Companies">
                                        {companies.map(c => (
                                            <Option value={c}>{c}</Option>
                                        ))}  
                                    </Select>
                                )}  
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Password">
                                {getFieldDecorator('password', {
                                    rules: [{ message: 'Please input password!', required: action === 'adding', }],
                                })(
                                    <Input type="password" name="password" placeholder="Password" />    
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Confirm Password">
                                {getFieldDecorator('confirm_password', {
                                    rules: [
                                        { message: 'Please input confirm password!', required: action === 'adding', },
                                        { validator: this._passwordValidator.bind(this) }
                                    ],
                                })(
                                <Input type="password" name="confirm_password" placeholder="Confirm Password" />
                            )}
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    <Row gutter={16}>
                        <Col span={20} push={18} >
                            <Button loading={api_loading} type="primary" onClick={this.onSubmit.bind(this)}>Submit</Button>
                            <Button style={{ marginLeft: 5 }} type="danger" onClick={onClose}>Cancel</Button>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        );
    }

    _passwordValidator(rule, value, cb) {
        const { password, } = this.props.form.getFieldsValue();
        const confirm_password = value;
        
        if (password !== confirm_password)
            return cb('Passwords don\'t match');
        
        return cb();
    }

    onRoleChange(value) {
        this.setState({
            selected_user_role: value,
        });
    }

    _formLoading(is_loading) {
        return new Promise(resolve => {
            this.setState({ api_loading: is_loading }, () => resolve());
        });
    }

    onSubmit() {
        const { action, onClose } = this.props;
        const { createUser, updateUser, } = this.props;

        this.props.form.validateFields((err, values) => {
            if (err)
                return;

            if (action === 'adding') {
                const new_user = values;

                console.log('new user', new_user);

                this._formLoading(true)
                .then(() => createUser(new_user))
                .then(() => this._formLoading(false))
                .then(() => onClose())

                // clearing state and updating data
                .then(() => this.setState({ selected_user_role: undefined, }))     // clear state
                .then(() => this._fetchCompanies());     // update companies list in redux
            } else {
                const updated_user = Object.assign({}, { _id: this.props.user._id }, values);
                if (!updated_user.password)
                    delete updated_user.password;

                console.log('updated user', updated_user);

                this._formLoading(true)
                .then(() => updateUser(updated_user))
                .then(() => this._formLoading(false))
                .then(() => onClose())

                // clearing state and updating data
                .then(() => this.setState({ selected_user_role: undefined, }))     // clear state
                .then(() => this._fetchCompanies());     // update companies list in redux
            }
        });
    }

    componentDidMount() {
        this._fetchCompanies();
    }

    _fetchCompanies() {
        const { getCompanies, } = this.props;
        
        this.setState({ companies_api_loading: true, }, () => {
            getCompanies()
            .then(() => this.setState({ companies_api_loading: false, }));
        });   
    }

}   

const mapStateToProps = ({ user, misc, }) => {
    const { users, } = user;
    const { companies, } = misc;

    return {
        users,
        companies,
    };
};

const mapDispatchToProps = dispatch => {
    const { updateUser, createUser, } = userActionCreators;
    const { getCompanies, } = miscActionCreators;

    return bindActionCreators({
        createUser,
        updateUser,
        getCompanies,
        showErrorNotification,
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(UserDrawer));