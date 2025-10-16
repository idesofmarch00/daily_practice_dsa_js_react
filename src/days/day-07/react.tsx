import { useState } from "react";

export const meta = {
  id: "day-07-react",
  title: "Like Button",
  prompt: "Build a like button that toggles liked state and count.",
};

export function Solution() {
  const [liked, setLiked] = useState(false);
  const likes = liked ? 101 : 100;

  return (
    <div className="demo-surface">
      <button className="demo-button" onClick={() => setLiked((value) => !value)}>
        {liked ? "Liked" : "Like"}
      </button>
      <span className="badge">{likes} likes</span>
    </div>
  );
}
