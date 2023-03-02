import React from "react";
import { ReactComponent as Heart } from '../../../../../assets/images/heart.svg'
import { ReactComponent as LocationImg } from '../../../../../assets/images/location.svg'
import { ReactComponent as Music } from '../../../../../assets/images/music.svg'
import { ReactComponent as Tick } from '../../../../../assets/images/tick.svg'
import { ReactComponent as Star } from '../../../../../assets/images/star.svg'
import { ReactComponent as Alert } from '../../../../../assets/images/alert.svg'


const iconTypes = {
  heart: Heart,
  location:LocationImg,
  music:Music,
  tick:Tick,
  star:Star,
  alert:Alert
};

const StepIcon = ({ name, ...props }) => {
  let Icon = iconTypes[name];
  return <Icon {...props} />;
};

export default StepIcon;
