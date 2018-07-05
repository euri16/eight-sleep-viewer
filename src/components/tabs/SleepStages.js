import React, { PureComponent } from "react";
import TabContent from './TabContent'
import CustomHorizontalBar from "../charts/CustomHorizontalBar";
import { Label, ProgressBar, OverlayTrigger, Button, Popover } from "react-bootstrap"
var Rating = require('react-rating');

class SleepStages extends PureComponent {
    render() {
        var deepSleepPopover = (
            <Popover id="popover-trigger-hover-focus" title="Deep Sleep">
                <strong>Are you sleeping well?</strong><br/>
                We detected a low percentage of deep sleep on your night. {' '}
                <a href={process.env.REACT_APP_DEEP_SLEEP_URL} target="_blank">Learn more.</a>
            </Popover>
        );
        var MinSleepPopover = (
            <Popover id="popover-trigger-hover-focus" title="Minimum Sleep">
                <strong>Are you sleeping enough?</strong><br/>
                We tracked that you slept less hours than recommended. {' '}
                <a href={process.env.REACT_APP_MIN_SLEEP_URL} target="_blank">Learn more.</a>
            </Popover>
        );
        var TntPopover = (
            <Popover id="popover-trigger-hover-focus" title="Minimum Sleep">
                <strong>You tossed or turned 12 times?</strong><br/>
                Toss and turns can affect sleep time. {' '}
                <a href={process.env.REACT_APP_TNT_URL} target="_blank">Learn more.</a>
            </Popover>
        );

        var details = <div>
            <br />
            <h4>
                Sleep Score <Label bsStyle="warning">75</Label> {' '}
                <Rating
                    emptySymbol="glyphicon glyphicon-star-empty"
                    fullSymbol="glyphicon glyphicon-star"
                    fractions={9}
                    readonly
                    initialRating={3.6} />
            </h4>
            <h5>You had a turbulent night! {' '}
                <OverlayTrigger
                    trigger={'focus'}
                    placement="bottom"
                    overlay={TntPopover}>
                    <Label bsStyle="primary"><a href="#">?</a></Label>
                </OverlayTrigger>
            </h5>
            <br />
            <h4>You had 8.3 hours of sleep {' '}
                <OverlayTrigger
                    trigger={'focus'}
                    placement="bottom"
                    overlay={MinSleepPopover}>
                    <Label bsStyle="default"><a href="#">?</a></Label>
                </OverlayTrigger>
            </h4>
            <ProgressBar striped bsStyle="success" now={100} />
            <h4>You had 15% of deep sleep {' '}
                <OverlayTrigger
                    trigger={'focus'}
                    placement="bottom"
                    overlay={deepSleepPopover}>
                    <Label bsStyle="default"><a href="#">?</a></Label>
                </OverlayTrigger>
            </h4>
            <ProgressBar striped bsStyle="danger" now={25} />
        </div>
        return (
            <TabContent
                left={<CustomHorizontalBar />}
                right={details}
                smLeftWidth={7}
                smRightWidth={5}
                mdLeftWidth={7}
                mdRightWidth={5} />
        )
    }
}
export default SleepStages