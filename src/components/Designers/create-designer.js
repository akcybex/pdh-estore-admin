import React, { Component,Fragment } from 'react'
import Breadcrumb from '../common/breadcrumb';
import Tabset_user from './tabset-designer';

export class Create_designer extends Component {
    render() {
        return (
            <Fragment>
                <Breadcrumb title="Create Designer" parent="Designers" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5> Add Designer</h5>
                                </div>
                                <div className="card-body">
                                    <Tabset_user />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Create_designer
