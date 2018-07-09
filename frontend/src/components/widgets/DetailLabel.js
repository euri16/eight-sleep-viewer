import React, { PureComponent } from "react";
import { Popover, OverlayTrigger, Glyphicon, Button } from 'react-bootstrap'
import styles from '../App.css';

class DetailLabel extends PureComponent {
    render() {
        var popover = (
            <Popover id="popover-trigger-hover-focus" title="Deep Sleep">
                <strong>{this.props.popOverTitle}</strong><br />
                {this.props.popOverText} {' '}
                {this.props.learnMoreUrl &&
                    <a href={this.props.learnMoreUrl} target="_blank">Learn more.</a>
                }
            </Popover>
        );
        return (
            <div>
                <span>
                    <span className={styles.detailTitle}>{this.props.text}</span>{' '}
                    <OverlayTrigger
                        trigger={'focus'}
                        placement="bottom"
                        overlay={popover}>
                        <Button className={styles.tooltipButton} bsSize="small">
                            <Glyphicon glyph="question-sign" />
                        </Button>
                    </OverlayTrigger>
                </span><br/>
                <span className={`${styles.detailValue} ${this.props.valueStyle || styles.successDetailValue}`}>{this.props.value}</span>
                <span className={styles.valueLabel}>{this.props.valueLabel}</span>
            </div>
        )
    }
}
export default DetailLabel