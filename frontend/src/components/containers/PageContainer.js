import React, { PureComponent } from "react";
import { Grid, Row, Navbar } from "react-bootstrap"

class PrimaryContainer extends PureComponent {
    render() {
        return (
            <Grid>
                <Row>
                    <Navbar>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <a href="#home">Eight Sleep - Data Viewer</a>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                    </Navbar>
                </Row>
                <Row>
                    {this.props.children}
                </Row>
            </Grid>
        )
    }
}
export default PrimaryContainer