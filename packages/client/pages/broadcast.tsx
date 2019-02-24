import React from 'react';

import Nav from '../src/components/nav';
// import LocalVideo from '../src/components/localVideo';

interface Props {}

const Broadcast: React.SFC<Props> = (): JSX.Element => (
  <div>
    <Nav />

    <div>
      <h3>TopicsCloud</h3>
      <span>choose from a list of the most popular topics</span>
      <div>list of topics</div>
    </div>

    <div>
      <p>If you cannot find the topic on the list you can find it or create a new one</p>
    </div>

    <div>
      <h3>FindOrCreateTopicForm</h3>
      <span>start typing create a topic</span>
      <div>topic creation input field</div>
    </div>
  </div>
);

export default Broadcast;
