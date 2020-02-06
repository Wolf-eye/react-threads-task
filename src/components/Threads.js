import React from 'react'
import Thread from './Thread'

export default function Threads(props) {
    return (
        <div className="block-wrapper flex-wrapper" onClick={(event) => props.handleClicks(event)}>
            {props.mappedThreads.map(element => {
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
            <div className={props.mappedThreads[0].score >= 6 ? "block-high-score" : "block-low-score"}>{props.mappedThreads.length} messages</div>
        </div>
    )
}