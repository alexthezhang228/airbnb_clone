/*
 * @Author: alexthezhang228 110424337+alexthezhang228@users.noreply.github.com
 * @Date: 2023-08-13 16:27:51
 * @LastEditors: alexthezhang228 110424337+alexthezhang228@users.noreply.github.com
 * @LastEditTime: 2023-08-13 18:18:27
 * @FilePath: /airbnb_clone/client/src/pages/Perk.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'

import {PiTelevisionSimpleBold} from 'react-icons/pi'
import {FaDog} from 'react-icons/fa'
import {BsHouseDoorFill,BsBusFront} from 'react-icons/bs'
import {AiOutlineWifi,AiOutlineCar}  from 'react-icons/ai'

const Perks = ({selected,onChange}) => {

  function handleCheckbox(e) {
    const {checked,name} = e.target;
    if (checked) {
      onChange([...selected,name]);
    } else {
      onChange([...selected.filter(selectedName => selectedName !== name)]);
    }
  }

  return (
    <div>
      <h2 className='text-2xl mt-4'>Perks</h2>
          <div className='grid grid-cols-3 md:grid-cols-4  lg:grid-cols-6 mt-1'>
            <label className='flex gap-1 items-center'>
              <input type='checkbox' name='Private entrance' onChange={handleCheckbox} checked={selected.includes('Private entrance')} ></input>
              <BsHouseDoorFill/>
              <span>Private entrance</span>
            </label>
            <label className='flex gap-1 items-center'>
              <input type='checkbox' name='Wifi' onChange={handleCheckbox} checked={selected.includes('Wifi')}></input>
              <AiOutlineWifi/>
              <span>Wifi</span>
            </label>
            <label className='flex gap-1 items-center'>
              <input type='checkbox' name='Free parking' onChange={handleCheckbox} checked={selected.includes('Free parking')}></input>
              <AiOutlineCar/>
              <span>Free parking</span>
            </label>
            <label className='flex gap-1 items-center'>
              <input type='checkbox' name='TV' onChange={handleCheckbox} checked={selected.includes('TV')}></input>
              <PiTelevisionSimpleBold/>
              <span>TV</span>
            </label>
            <label className='flex gap-1 items-center'>
              <input type='checkbox' name='Pets' onChange={handleCheckbox} checked={selected.includes('Pets')}></input>
              <FaDog/>
              <span>Pets</span>
            </label>
            <label className='flex gap-1 items-center'>
              <input type='checkbox' name='Transportation' onChange={handleCheckbox} checked={selected.includes('Transportation')}></input>
              <BsBusFront/>
              <span>Transportation</span>
            </label>
          </div>
    </div>
  )
}

export default Perks