
import React, { Component } from 'react';
import { Modal, } from 'antd';

import LeakTable from './Leak-table';


export default class LeakModal extends Component {

    render() {
        const { imagery, image_idx } = this.props;
        const { modalVisible, onClose, onOk } = this.props;

        return (
            <Modal  title={`Image #${image_idx} and Quantification`}
                style={{ top: 20 }}
                width={1200}
                closable={true}
                destroyOnClose={true}
                onOk={onOk}
                onCancel={onClose}
                visible={modalVisible}>

                <div className="row">
                    <div className="col-md-7">                    
                        <img height="400" width="650" src={imagery && imagery.image_url} />
                    </div>

                    <div className="col-md-5">
                        <LeakTable imagery={imagery} />
                    </div>
                </div>

            </Modal>
        );
    }

}