import React, { PureComponent } from "react";
import { Label } from 'react-bootstrap'
var Rating = require('react-rating');

function StyledScore(props) {
    return (<b>Sleep Score <Label bsStyle={props.style}>{props.score} /5</Label></b>)
}

class SleepScore extends PureComponent {
    render() {
        const score = this.props.score
        const formattedScore = this.formattedScore(score)
        console.log(score)
        return (
            <span>
                <StyledScore score={formattedScore} style={this.currentStyle(score)} /><br />
                <Rating
                    emptySymbol="glyphicon glyphicon-star-empty"
                    fullSymbol="glyphicon glyphicon-star"
                    fractions={9}
                    readonly
                    initialRating={formattedScore} />
            </span>
        )
    }

    formattedScore(score) {
        return (score/10)/2
    }

    currentStyle(score) {
        return score >= process.env.REACT_APP_MIN_ACCEPTABLE_SCORE ? "success" : "warning"
    }
}
export default SleepScore