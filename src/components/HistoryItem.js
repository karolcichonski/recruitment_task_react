import React from 'react';

function HistoryItem({date, avatarUrl, profileUrl, login, eventUrl, eventType, repoUrl, repoName, isPrimary }) {
    let histItemClass = "timeline-item";
    let histMarkerClass ="timeline-marker";

    if (isPrimary==true) {
        histItemClass += " is-primary";
        histMarkerClass += " is-primary";
    }

    return (
      <div id="timeline-item0" className={histItemClass}>
        <div className={histMarkerClass} />
        <div id="timeline0" className="timeline-content">
          <p className="heading">{date}</p>
          <div className="content">
            <span className="gh-username">
              <img src={avatarUrl} alt="avatar" />
              <a href={profileUrl}>{" " + login + " "}</a>
            </span>
            <a href={eventUrl}>{eventType + " "}</a>
            <span>Pull Request</span>
            <p className="repo-name">
              <a href={repoUrl}>{repoName}</a>
            </p>
          </div>
        </div>
      </div>
    );
}

export default HistoryItem;