import React from 'react';
import {BackgroundCustomize} from './BackgroundCustomize';
import {EditCanvas} from './EditCanvas';
export const SideBarContent = (props) => {
  return (
    <div >
      <BackgroundCustomize/>
      <EditCanvas/>
    </div>
  );
}

