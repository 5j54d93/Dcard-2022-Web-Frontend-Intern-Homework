import React from "react";

export default function CreateTime(props) {
  const createTime = new Date(props.created_at);
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', "May", 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  if (props.displayTime === true) {
    return (
      <>
        {createTime.getDate() + 1} {monthNames[createTime.getMonth()]} {createTime.getFullYear()} {('0' + createTime.getHours()).slice(-2)}:{('0' + createTime.getMinutes()).slice(-2)}
      </>
    );
  } else {
    return (
      <>
        {createTime.getDate() + 1} {monthNames[createTime.getMonth()]} {createTime.getFullYear()}
      </>
    );
  }
}
