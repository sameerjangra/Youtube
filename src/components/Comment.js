import React, { useState } from 'react';
import { formatTimeAgo } from '../utils/formatHelpers';

const Comment = ({ comment }) => {
  const [showReplies, setShowReplies] = useState(false);

  const {
    authorDisplayName,
    authorProfileImageUrl,
    textDisplay,
    publishedAt,
  } = comment.snippet.topLevelComment.snippet;

  const replies = comment.replies?.comments || [];

const formatComment = (text) => {
  const lineLength = 100;
  let result = '';

  for (let i = 0; i < text.length; i += lineLength) {
    result += text.slice(i, i + lineLength) + '<br/>';
  }

  return result;
};

  return (
    <div className="flex gap-3 mb-5 ">
      <img src={authorProfileImageUrl} alt="author" className="w-10 h-10 rounded-full" />
      <div>
        <div className="text-sm font-semibold ">{authorDisplayName}</div>
        <div
  className="text-sm text-gray-300"
  dangerouslySetInnerHTML={{ __html: formatComment(textDisplay) }}
></div>

        <div className="text-xs text-gray-500">{formatTimeAgo(publishedAt)}</div>

        {replies.length > 0 && (
          <div
            onClick={() => setShowReplies(!showReplies)}
            className="text-blue-400 text-sm cursor-pointer mt-2"
          >
            {showReplies ? 'Hide replies' : `View replies (${replies.length})`}
          </div>
        )}

        {showReplies && (
          <div className="ml-6 mt-2">
            {replies.map((reply) => (
              <div key={reply.id} className="flex gap-3 mb-3">
                <img src={reply.snippet.authorProfileImageUrl} className="w-8 h-8 rounded-full" />
                <div>
                  <div className="text-sm font-semibold">{reply.snippet.authorDisplayName}</div>
                  <div className="text-sm text-gray-300">{reply.snippet.textDisplay}</div>
                  <div className="text-xs text-gray-500">{formatTimeAgo(reply.snippet.publishedAt)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
