import { useQuery } from '@tanstack/react-query';
import { getVideosAPI } from '../services/videoServices';
import VideoCard from './VideoCard';

export default function YoutubeList() {
  const { data } = useQuery({
    queryKey: ['videos'],
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
          />
        ))}
      </ul>
    </div>
  );
}
