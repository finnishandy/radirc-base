import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';

class Chat extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { messages } = this.props;
    console.log('messages', messages);
    return (
      <div>
        { messages.messages.map((message, i) => {
          return <p key={i}>{message.msg}</p>
        })}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    messages: state.privMessages
  };
}

export default connect(mapStateToProps)(Chat);
