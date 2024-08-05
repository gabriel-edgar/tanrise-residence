import { EPostProductData } from "@data";
import Post, { modes } from "@screens/Post";
import React from "react";

const EPost = () => {
    return <Post mode={modes.bars} posts={EPostProductData} />;
};

export default EPost;
