import React from 'react';
import { Card, Image } from 'antd';

const VideoCard = ({
  title,
  sharedBy,
  description,
  thumbnail,
  videoId,
  url,
}) => {
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <Card className="mb-4">
      <div className="flex">
        <div className="flex-shrink-0 flex flex-col justify-center">
          <div className="relative pb-56.25%">
            <iframe
              className="w-64 aspect-video"
              src={embedUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={title}
            ></iframe>
          </div>
        </div>
        <div className="flex-grow justify-start text-left p-4 overflow-hidden">
          <a className="text-red-600 font-bold text-lg" href={url}>
            {title}
          </a>
          <div className="text-gray-600">Shared by: {sharedBy}</div>
          <div className="text-gray-800 line-clamp-4">
            <strong>Description:</strong>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VideoCard;
