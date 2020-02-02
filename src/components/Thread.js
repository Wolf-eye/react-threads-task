import React from 'react'

export default function Thread(props) {
    return (
        <div className="flex-wrapper" data-id={props.id}>
            <div className="left-half">
                <p className={props.score >= 6 ? "high-score" : "low-score"}>{props.subject}</p>
                <p className="question">{props.question}</p>
                <p className="text">{props.text}</p>
            </div>
            <div className="right-half">
                <p>{props.team}</p>
                {/* return the Date time in correct format */}
                <p className="date">{`${new Date(props.createdAt).toDateString().split(' ').slice(1).join(' ')}`}</p>
            </div>
        </div>
    )
}
