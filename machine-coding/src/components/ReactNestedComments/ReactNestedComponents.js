import React, { useState } from "react";
import ReplyComment from "./ReplyComment";
import "./ReactNestedComponents.css";
import commentsData from "./commentsData.json";
import { all } from "axios";

const CommentBox = ({ comment, allComments, addComment, deleteComment }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);

  const handleClick = () => {
    setShowReplyBox(!showReplyBox);
  };

  return (
    <div className="comment-container">
      <div className="comment-header">
        <p className="comment-value">{comment.value}</p>
        <div className="comment-actions">
          <button className="reply-btn" onClick={handleClick}>
            {showReplyBox ? "Cancel" : "Reply"}
          </button>
          <button
            className="delete-btn"
            onClick={() => deleteComment(comment.id)}
          >
            Delete
          </button>
        </div>
      </div>

      {showReplyBox && (
        <ReplyComment
          setShowReplyBox={setShowReplyBox}
          addComment={addComment}
          id={comment.id}
        />
      )}
      <div className="nested-comments">
        {comment.children.map((childId) => {
          return (
            <CommentBox
              key={childId}
              comment={allComments[childId]}
              allComments={allComments}
              addComment={addComment}
              deleteComment={deleteComment}
            />
          );
        })}
      </div>
    </div>
  );
};

const ReactNestedComponents = () => {
  const [comments, setComments] = useState(commentsData.comments);
  const comment = comments[1];
  const allComments = comments;

  const addComment = (value, parentId) => {
    const newId = Date.now();
    const newComment = { id: newId, value, parentId, children: [] };
    setComments((prevComments) => {
      const updatedComment = { ...prevComments, [newId]: newComment };
      updatedComment[parentId].children.push(newId);
      return updatedComment;
    });
  };

  const deleteComment = (id) => {
    const parentId = comments[id].parentId;
    setComments((prevComments) => {
      const updatedComments = { ...prevComments };
      updatedComments[parentId].children = updatedComments[
        parentId
      ].children.filter((childId) => {
        return childId !== id;
      });
      const queue = [id];
      while (queue.length > 0) {
        const nodeToDelete = queue.shift();
        queue.push(...updatedComments[nodeToDelete].children);
        delete updatedComments[nodeToDelete];
      }
      return updatedComments;
    });
  };

  return (
    <div>
      <CommentBox
        comment={comment}
        allComments={allComments}
        addComment={addComment}
        deleteComment={deleteComment}
      />
    </div>
  );
};
export default ReactNestedComponents;
