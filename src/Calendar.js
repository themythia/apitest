import React, { useEffect } from 'react';

const Calendar = () => {
  const gapi = window.gapi;
  console.log('gapi', gapi);
  const API_KEY = process.env.REACT_APP_API_KEY;
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const DISCOVERY_DOCS = [
    'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
  ];
  const SCOPES = 'https://www.googleapis.com/auth/calendar.events';

  useEffect(() => {
    gapi.load('client:auth2', () => {
      console.log('loaded client');

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });

      gapi.client.load('calendar', 'v3', () => console.log('loaded calendar!'));
    });
  }, []);

  const handleClick = () => {
    gapi.auth2.getAuthInstance().then(() => {
      const event = {
        summary: 'Awesome Event!',
        location: '800 Howard St., San Francisco, CA 94103',
        description: 'Really great refreshments',
        start: {
          dateTime: '2021-10-28T09:00:00-07:00',
          timeZone: 'America/Los_Angeles',
        },
        end: {
          dateTime: '2021-10-28T17:00:00-07:00',
          timeZone: 'America/Los_Angeles',
        },
        recurrence: ['RRULE:FREQ=DAILY;COUNT=2'],
        attendees: [
          { email: 'lpage@example.com' },
          { email: 'sbrin@example.com' },
        ],
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 },
            { method: 'popup', minutes: 10 },
          ],
        },
      };

      const request = gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event,
      });

      console.log('gapi.client.calendar', gapi.client.calendar);

      request.execute((event) => {
        console.log(event);
        window.open(event.htmlLink);
      });

      // get events
      gapi.client.calendar.events
        .list({
          calendarId: 'primary',
          timeMin: new Date().toISOString(),
          showDeleted: false,
          singleEvents: true,
          maxResults: 10,
          orderBy: 'startTime',
        })
        .then((response) => {
          const events = response.result.items;
          console.log('EVENTS: ', events);
        });
    });
  };

  return <button onClick={handleClick}>Add Event</button>;
};
export default Calendar;
