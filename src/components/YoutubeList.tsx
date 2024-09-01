import { useQuery } from '@tanstack/react-query';
import { getVideosAPI } from '../services/videoServices';
import VideoCard from './VideoCard';
import { useContext } from 'react';
import { UserContext } from '../App';

export default function YoutubeList() {
  const { user } = useContext(UserContext);
  const { data } = useQuery({
    queryKey: ['videos', user?.email],
    queryFn: async () => {
      const res = await getVideosAPI();
      return res.data;
    },
  });

  return (
    <div>
      <ul>
        {data?.map((video) => (
          <VideoCard
            key={video._id}
            title={video.title}
            description={video.description}
            thumbnail={video.thumbnail}
            url={video.url}
            sharedBy={video.sharedBy?.email ?? 'N/A'}
            videoId={video.videoId}
            totalLikes={video.totalLikes}
            totalDislikes={video.totalDislikes}
            userReacted={video?.userReactionType}
          />
        ))}
      </ul>
    </div>
  );
}
