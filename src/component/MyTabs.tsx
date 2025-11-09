import { Tab, Tabs } from "react-bootstrap"
import '../App.css'
import SmallCard from "./SmallCard"
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
const MyTabs = () => {
    const context = useContext(AppContext);
    const { posts } = context!;

    const breakingNewsPosts = posts.filter(post => post.breaking_news === "1");
    const latestNewsPosts = posts.slice(5, 12);  
  return (
    <Tabs className="my-tabs" defaultActiveKey="latest" id="uncontrolled-tab-example" >
        <Tab eventKey="latest" title="Latest">
        {latestNewsPosts.length>0?<SmallCard data={latestNewsPosts}/>:
        <div style={{color:'#999', paddingLeft:'1rem', fontSize:'0.85rem'}}>No Latest News!</div>
        }
      </Tab>
      <Tab eventKey="breaking" title="Breaking">
        {breakingNewsPosts.length>0?<SmallCard data={breakingNewsPosts}/>:
        <div style={{color:'#999', paddingLeft:'1rem', fontSize:'0.85rem'}}>No Breaking News!</div>
        }
      </Tab>
      <Tab eventKey="Comments" title="Comments">
        <div style={{color:'#999', paddingLeft:'1rem', fontSize:'0.85rem'}}>No Comments!</div>
      </Tab>
    </Tabs>
  )
}

export default MyTabs
