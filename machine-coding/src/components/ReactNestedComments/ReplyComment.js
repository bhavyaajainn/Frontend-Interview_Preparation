import React, { useState } from "react";
import "./ReactNestedComponents.css";

const ReplyComment = ({ setShowReplyBox, addComment, id }) => {
  const [reply, setReply] = useState("");
  const handlePostReply = () => {
    addComment(reply, id);
    setReply("");
    setShowReplyBox(false);
  };
  return (
    <div>
      <textarea
        className="reply-textarea"
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        placeholder="Write your reply here..."
      ></textarea>
      <button className="post-reply-btn" onClick={handlePostReply}>
        Post Reply
      </button>
    </div>
  );
};

export default ReplyComment;
