import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';


const QuoteMachine = (props) => (
    <Card>
        <CardContent>
            <span id="text">
                <Typography>"{props.selectedQuote.quote}"</Typography>
            </span>
            <span id="author">
                <Typography>- {props.selectedQuote.author}</Typography>
            </span>
        </CardContent>
        <CardActions>
            <Button id="new-quote" size="small" onClick={props.newQuoteIndex}>New Quote</Button>
            <IconButton 
                id='tweet-quote'
                target='_blank'
                href={encodeURI(`https://twitter.com/intent/tweet?text=${props.selectedQuote.quote}`)}
            >
                <FontAwesomeIcon icon={faTwitter} size="md"></FontAwesomeIcon>
            </IconButton>
        </CardActions>
    </Card>
)


export default QuoteMachine;