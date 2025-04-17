import UserOnline from './UserSocial';
import React from 'react';
import CalendarSection from './CalendarSection';

function ActivityPanel() {
  return (
    <>
      <div>
        <CalendarSection />
        <UserOnline />
      </div>
    </>
  );
}

export default React.memo(ActivityPanel);