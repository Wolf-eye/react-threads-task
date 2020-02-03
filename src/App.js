import React, { Component } from 'react';
import './App.scss';
import Thread from './components/Thread';

class App extends Component {

  state = {
    threads: [],
    isLoaded: false,
    expanded: false,
    error: undefined
  }

  handleClick = (e, node) => {
    e.stopPropagation();
    //const clickedThread = e.target.getAttribute('data-id');
    if (!e.currentTarget.classList.contains('expanded')) {
      e.currentTarget.classList.add("expanded");
      e.currentTarget.removeChild(e.currentTarget.lastChild)
      e.currentTarget.replaceWith(...e.currentTarget.childNodes)
    }
  }

  componentDidMount() {
    //fetching the data from the faked json API
    //const json_db = "http://localhost:3001/threads";
    const json_db = "https://cors-anywhere.herokuapp.com/https://my-json-server.typicode.com/Wolf-eye/react-threads-task/threads"
    fetch(json_db)
      .then(resolve => {
        //add some error handling, for example when server can't be found
        if (resolve.status !== 200) {
          this.setState({
            error: new Error("Something shit happens")
          })
        } else {
          return resolve.json()
        }
      })
      //.then(resolve => resolve.json())
      .then(data => {
        data.map(threads => {
          //console.log(threads)
          return this.setState({
            threads: [...this.state.threads, threads],
            isLoaded: true
          })
        })
      })
      // throw an error if api call can't be fetched
      .catch(error => {
        console.log(error.message)
      });
  }

  render() {

    let { isLoaded } = this.state;
    const thread = this.state.threads.map(thread => {

      if (thread.length > 1) {
        return (
          // return wrapped block of threads, when messages in the array are more than one
          <div
            key={thread[0].id + "_wrapper"}
            //className={`block-wrapper flex-wrapper ${this.state.expanded === thread[0].thread_id ? 'expanded' : ''}`}
            className={`block-wrapper flex-wrapper ${this.state.expanded ? 'expanded' : ''}`}
            onClick={this.handleClick}
          >
            {thread.map(element => {
              return (
                <Thread
                  id={element.thread_id}
                  key={element.id}
                  subject={element.subject}
                  question={element.question}
                  text={element.text}
                  createdAt={element.created_at}
                  team={element.team}
                  score={element.score}
                />
              )
            })}
            <div className={thread[0].score >= 6 ? "block-high-score" : "block-low-score"}>{thread.length} messages</div>
          </div>
        )
      } else {
        // return a single thread
        return thread.map(element => {
          return (
            <Thread
              key={element.id}
              subject={element.subject}
              question={element.question}
              text={element.text}
              createdAt={element.created_at}
              team={element.team}
              score={element.score}
            />
          )
        })
      }
    })

    if (!isLoaded) {
      if(this.state.error){
        return <div>Error: {this.state.error.message}</div>
      }
      return <div>Loading...</div>
    } else {
      return (
        <>
          <div className="flex-container">
            {thread}
          </div>
          {/* <div>{this.state.error}</div> */}
        </>
      )
    };
  }
}

export default App;
