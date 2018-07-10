import React, { PureComponent } from "react";
import { Alert, Button } from "react-bootstrap"

class AlertDismissable extends PureComponent {
    constructor(props, context) {
        super(props, context);

        this.handleDismiss = this.handleDismiss.bind(this);
        this.handleShow = this.handleShow.bind(this);

        this.state = {
            show: true
        };
    }

    handleDismiss() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleReload() {
        window.location.reload();
    }

    render() {
        if (this.state.show) {
            return (
                <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
                    <h4>Oh snap! You got an error!</h4>
                    <p>Something went wrong, check your network connection and try again.</p>
                    <p>
                        <Button bsStyle="danger" onClick={this.handleReload}>Reload the page</Button>
                        <span> or </span>
                        <Button onClick={this.handleDismiss}>Hide Alert</Button>
                    </p>
                </Alert>
            );
        }

        return <div></div>;
    }
}

export default AlertDismissable;