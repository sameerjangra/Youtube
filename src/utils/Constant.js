export const GOOGLE_API_KEY = "AIzaSyBTI_pTSMUNAGpYRTNycSMTYuCH85JOMAE";
export const YOUTUBE_API = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=50&regionCode=IN&key=${GOOGLE_API_KEY}`;
export const YOUTUBE_SEARCH_SUGGESTION_API = "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";

export const  YOUTUBE_SEARCH_API =`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&key=${GOOGLE_API_KEY} &q=`;

// https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=coding+tutorials&key=AIzaSyBTI_pTSMUNAGpYRTNycSMTYuCH85JOMAE

export const RELATED_VIDEO_API = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&key=${GOOGLE_API_KEY}&relatedToVideoId=`;

export const COMMENT_API = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&maxResults=68&key=${GOOGLE_API_KEY}`;
