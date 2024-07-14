import React from 'react';
import '../styles/Feed.scss';
import { formatDate } from '../utils/helper';

interface FeedCardProps {
  feeds: {
    title: string;
    url: string;
    image: string;
    date: string;
    body: string;
    source: string;
    author: string;
  }[];
}

const FeedCard: React.FC<FeedCardProps> = ({ feeds }) => {
  return (
    <React.Fragment>
      {feeds.length > 0 && feeds.map((feed) => (
        <div className="card" key={feed.url}>
          <div className="card-column card-column-1">
            <div className="card-header">
              <img src={`https://dev-storm-rest-api.pantheonsite.io/${feed.image}`} alt={feed.title} className="card-image" />
              <div className="card-header-text">
                <p className="card-date">{formatDate(feed.date)}</p>
                <h2 className="card-title">{feed.title}</h2>
              </div>
              <span className="card-source">{feed.source}</span>
            </div>
          </div>
          <div className="card-column card-column-2">
            <div
              className="card-body"
              dangerouslySetInnerHTML={{ __html: feed.body }}
            />
          </div>
          <div className="card-column card-column-3">
            <span className="card-author">{feed.author}</span>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};

export default FeedCard;
