import React from "react";
import { Breadcrumb } from "antd";
const BreadCrumb = ({ titles }) => {
    const items=titles.map((e,i)=>{
        return {
            title: e,
            i: i,  
        };
    })

  return (
    <Breadcrumb
      items={items}
    />
  );
};
export default BreadCrumb;
