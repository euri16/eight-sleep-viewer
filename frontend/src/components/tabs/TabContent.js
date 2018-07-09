import React, { PureComponent } from "react";
import {Grid, Row, Col} from 'react-bootstrap'
import styles from "../App.css"

class TabContent extends PureComponent {
    render() {
        return (
            <Grid className={styles.tabContent}>
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