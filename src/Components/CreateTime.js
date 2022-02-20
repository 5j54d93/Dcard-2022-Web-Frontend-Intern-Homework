import React, { memo } from 'react';

export default memo(function CreateTime(props) {
  const createTime = new Date(props.created_at);
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    props.displayTime
      ? <>{createTime.getDate() + 1} {monthNames[createTime.getMonth()]} {createTime.getFullYear()} {('0' + createTime.getHours()).slice(-2)}: {('0' + createTime.getMinutes()).slice(-2)}</>
      : <>{createTime.getDate() + 1} {monthNames[createTime.getMonth()]} {createTime.getFullYear()}</>
  );
})
