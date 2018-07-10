import React from 'react';
import { performHttpCall } from "../../helpers/Helpers"

class HttpFetcher extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            isLoading: false,
            error: null,
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        const success = (data) => this.setState({ data: data, isLoading: false })
        const error = (error) => this.setState({ error, isLoading: false })
        performHttpCall(this.props.url, "GET", success, error)
    }

    render() {
        return this.props.children(this.state);
    }
}

export default HttpFetcher