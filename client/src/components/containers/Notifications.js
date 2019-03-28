
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Notifications from 'react-notification-system-redux';

class Notification extends Component {

    render() {
        const { notifications } = this.props;

        const style = {
            NotificationItem: {
                DefaultStyle: {
                    margin: '10px 5px 2px 1px'
                }
            }
        };

        return (
            <Notifications
                notifications={notifications}
                style={style}
            />
        );
    }
}

Notification.contextTypes = {
    store: React.PropTypes.object
};

Notification.propTypes = {
    notifications: React.PropTypes.array
};

const mapStateToProps = ({ notifications }) => {
    return {
        notifications
    };
};

export default connect(mapStateToProps)(Notification);