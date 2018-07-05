import React, { PureComponent } from "react";
import {Grid, Row, Col} from 'react-bootstrap'

class TabContent extends PureComponent {
    render() {
        console.log(this.props.left)
        return (
            <Grid>
                <Row>
                    <Col md={this.props.mdLeftWidth} sm={this.props.smLeftWidth}>
                        {this.props.left}
                    </Col>
                    <Col md={this.props.mdRightWidth} sm={this.props.smRightWidth}>
                        {this.props.right}
                    </Col>
                </Row>
            </Grid>
        )
    }
}
export default TabContent