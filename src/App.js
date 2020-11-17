import React, { Component } from 'react';
import QuoteMachine from './Components/quotemachine.js';
import { random } from 'lodash';
import 'typeface-roboto';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  container: {
      display: "flex",
      height: '100vh',
      alignItems: 'center'
  }
}

/**
 * Parent component that contains the whole app, and child components that are imported from elsewhere
 */

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      selectedIndex: null
    };
    //Must bind this to any method that uses this in the component
    this.selectIndex = this.selectIndex.bind(this);
    this.newQuoteIndex = this.newQuoteIndex.bind(this);
  }
  
  /**
   * Asyncronous method which retrieves the quotes from the listed gist,
   * Then parses the data pulled from the page from json to a normal array of objects,
   * And finally that data that was parsed is used to set the quotes state 
   * and passes the method newQuoteIndex as a callback function to be run once the promise
   * has been fulfilled.
   */
  componentDidMount() {
    fetch('https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json')
      .then(data => data.json())
      .then(quotes => this.setState({ quotes }, this.newQuoteIndex));
  }

  /**
   * Get function which returns the quote array position from state based on the selectedIndex state,
   * But only if the quotes array from state has been populated, and the selectedIndex state has 
   * generated a new index.
   */

  get selectedQuote() {
    if(!this.state.quotes.length || !Number.isInteger(this.state.selectedIndex)) {
      return undefined;
    }
    return this.state.quotes[this.state.selectedIndex]
  }

  /**
   * Method which generates a random integer which lies between 0 and the end position of the array,
   * But only if the quotes state array has been populated. Method is called in newQuoteIndex method.
   */

  selectIndex() {
    if (!this.state.quotes.length) {
      return;
    }
    return random(0, this.state.quotes.length - 1);
  }

  /**
   * Method which sets the selectedIndex state with the integer returned from selectIndex method.
   * Method is called in the componentDidMount asynchronous function as a callback, as well as the 
   * buttonClickHandler which is passed to the button component for its onClick even handling.
   */

  newQuoteIndex() {
    this.setState({ selectedIndex: this.selectIndex() })
  }

  render() {
    
    return (
      <Grid id="quote-box" className={this.props.classes.container} justify='center' container>
        <Grid xs={11} lg={8} justify='center' item>
          { this.selectedQuote ? 
          <QuoteMachine selectedQuote={this.selectedQuote} newQuoteIndex={this.newQuoteIndex} /> : 
          '' 
          }
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(App);
