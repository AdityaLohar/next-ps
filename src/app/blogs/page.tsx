import React from "react";
import he from "he";

const getAllPosts = async (id) => {
  const res = await fetch(
    `https://public-api.wordpress.com/wp/v2/sites/productspaceorgin.wordpress.com/posts?slug=${id}`
  );

  const data = await res.json();

  return data[0];
};

const getAllTags = async (post) => {
  const res = await fetch(
    `https://public-api.wordpress.com/wp/v2/sites/productspaceorgin.wordpress.com/categories?post=${post.id}`
  );

  const data = await res.json();
  const tagData = data.map((entry) => he.decode(entry?.name));

  console.log(tagData);

  return tagData;
};

const BlogPage = async () => {
  const post = await getAllPosts(
    "case-study-decoding-flipkarts-big-billion-days-strategy"
  );

  let tags;
  if(post) {
    tags = await getAllTags(post);
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    }).format(date);
    return formattedDate;
  };


  if (!post) {
    return <div>Error loading post.</div>;
  }

  return (
    <div>
      <div className="px-4 flex flex-col items-center pt-4 lg:pt-16 pb-8 lg:pb-16 font-inter bg-white">
          <div className="max-w-4xl w-full flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <h1
                className="text-[24px] lg:text-[36px] font-sans font-bold"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              ></h1>

              <div className="text-[16px] text-[#667085]">
                {formatDate(post.date)}
              </div>

              <div className="flex flex-wrap gap-1">
                {tags.map((tag, index) => (
                  <p
                    key={index}
                    className="bg-[#E7F7FC] border border-[#013B4D3D] text-black p-2 rounded-lg"
                  >
                    {tag}
                  </p>
                ))}
              </div>
            </div>

            <div
              className="prose prose-lg text-[16px] lg:text-[18px] max-w-4xl mx-auto"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />
          </div>
        
      </div>
    </div>
  );
};

export default BlogPage;
