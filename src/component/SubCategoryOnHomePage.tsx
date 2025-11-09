import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import SubCategoryOnHomePageItem from "./SubCategoryOnHomePageItem";

const SubCategoryOnHomePage = () => {
  const context = useContext(AppContext);
  const groupedByCategory: any = {};

  context?.posts.forEach(post => {
    const category = post.category;

    if (!groupedByCategory[category]) {
      groupedByCategory[category] = [];
    }
    if (groupedByCategory[category].length < 9) {
      groupedByCategory[category].push(post);
    }
  });

  console.log(groupedByCategory);


  return (
    <>
      {Object.entries(groupedByCategory).map(([category, posts]: [any, any]) => (
        posts?.length>3?
        <SubCategoryOnHomePageItem category={category} posts={posts} />: null

      ))}
    </>
  )
}


export default SubCategoryOnHomePage
