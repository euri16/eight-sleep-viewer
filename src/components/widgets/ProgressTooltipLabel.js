import React, { PureComponent } from "react";
import { Popover, OverlayTrigger, ProgressBar, Glyphicon, Button } from 'react-bootstrap'
import styles from '../App.css';

class ProgressTooltipLabel extends PureComponent {
    render() {
        var deepSleepPopover = (
            <Popover id="popover-trigger-hover-focus" title="Deep Sleep">
                <strong>{this.props.popOverTitle}</strong><br />
                {this.props.popOverText} {' '}
                {this.props.learnMoreUrl &&
                    <a href={this.props.learnMoreUrl} target="_blank">Learn more.</a>
                }
            </Popover>
        );
        return (
            <span>
                {this.props.leftIcon &&
                    <span>
                        <Glyphicon className="tooltip-label-icon warning" glyph={this.props.leftIcon} />{' '}
                    </span>
                }
                {this.props.text}{' '}
                <OverlayTrigger
                    trigger={'focus'}
                    placement="bottom"
                    overlay={deepSleepPopover}>

                    <Button className={styles.tooltipButton} bsSize="small">
                        <Glyphicon glyph="question-sign" />
                    </Button>
                </OverlayTrigger>
                {this.props.progress &&
                    <ProgressBar striped className={styles.tooltipLabelProgressBar} 
                    bsStyle={this.props.progressStyle} now={this.props.progress} />
                }
            </span>
        )
    }
}
export default ProgressTooltipLabel