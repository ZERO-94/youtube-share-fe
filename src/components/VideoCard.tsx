// src/components/VideoCard.jsx
import React, { useContext, useState } from 'react';
import { Card, Button } from 'antd';
import {
  LikeOutlined,
  DislikeOutlined,
  LikeFilled,
  DislikeFilled,
} from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reactVideoAPI } from '../services/videoServices';
import { UserContext } from '../App';

const VideoCard = ({
  title,
  sharedBy,
  description,
  videoId,
  url,
  totalLikes,
  totalDislikes,
  userReacted,
}) => {
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  const mutation = useMutation({
    mutationFn: async (data: { videoId: string; type: 'like' | 'dislike' }) => {
      await reactVideoAPI(data.videoId, data.type);
    },
    onSettled: async () => {
      queryClient.refetchQueries({
        queryKey: ['videos'],
      });
    },
  });

  const handleLike = () => {
    mutation.mutate({ videoId, type: 'like' });
  };

  const handleDislike = () => {
    mutation.mutate({ videoId, type: 'dislike' });
  };

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
          <div className="flex justify-between">
            <a className="text-red-600 font-bold text-lg" href={url}>
              {title}
            </a>
            {user && (
              <div className="">
                {userReacted !== 'dislike' && (
                  <Button
                    type="text"
                    icon={
                      userReacted === 'like' ? (
                        <LikeFilled className="text-blue-500" />
                      ) : (
                        <LikeOutlined />
                      )
                    }
                    onClick={handleLike}
                  ></Button>
                )}
                {userReacted !== 'like' && (
                  <Button
                    type="text"
                    icon={
                      userReacted === 'dislike' ? (
                        <DislikeFilled className="text-red-500" />
                      ) : (
                        <DislikeOutlined />
                      )
                    }
                    onClick={handleDislike}
                  ></Button>
                )}
              </div>
            )}
          </div>

          <div className="text-gray-600">Shared by: {sharedBy}</div>

          <div className="flex items- gap-4">
            <div>
              <LikeOutlined /> {totalLikes}
            </div>
            <div>
              <DislikeOutlined /> {totalDislikes}
            </div>
          </div>
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
