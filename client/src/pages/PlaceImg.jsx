/*
 * @Author: alexthezhang228 110424337+alexthezhang228@users.noreply.github.com
 * @Date: 2023-08-16 14:07:16
 * @LastEditors: alexthezhang228 110424337+alexthezhang228@users.noreply.github.com
 * @LastEditTime: 2023-08-16 18:31:21
 * @FilePath: /airbnb_clone/client/src/pages/PlaceImg.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React from 'react'

const PlaceImg = ({place}) => {
  if (!place.photos?.length) {
    return (<div>eee</div>);
  }
  return (
    <>
    <img className='w-full h-full ' src={`http://localhost:4000/uploads/${place.photos[0]}`} alt=""/>
    </>
  );
}

export default PlaceImg