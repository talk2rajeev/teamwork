import React, { useState } from 'react';
import * as Types from '../../../utils/types/types';
import './style.css';

const wiStatusMap = {
  new: {
    status: 'new',
    value: 1,
  },
  inProgress: {
    status: 'inProgress',
    value: 2,
  },
  reviewInProgress: {
    status: 'reviewInProgress',
    value: 3,
  },
  qaInProgress: {
    status: 'qaInProgress',
    value: 4,
  },
  closed: {
    status: 'closed',
    value: 6,
  },
};

interface UserStoryBoardViewProps {
  userStories: Types.UserStory[];
  updateUserStory: (
    reqUserStoryId: string,
    reqProductId: string,
    reqSprintId: string,
    statusId: string
  ) => void;
}

const UserStoryBoardView: React.FC<UserStoryBoardViewProps> = ({
  userStories,
  updateUserStory,
}) => {
  const [dragId, setDragId] = useState<number>(0);
  const newStories = userStories.filter((u) => u.status === 'New');
  const inProgressStories = userStories.filter(
    (u) => u.status === 'In-progress'
  );
  const readyForReviewStories = userStories.filter(
    (u) => u.status === 'Ready for review'
  );
  const qaProgressStories = userStories.filter(
    (u) => u.status === 'Ready for QA'
  );
  const closedStories = userStories.filter((u) => u.status === 'Closed');

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    const targetElement = event.currentTarget as HTMLDivElement;
    const { id, productid, sprintid } = targetElement.dataset;
    if (id && productid && sprintid) {
      event.dataTransfer.setData('text/plain', id);
      event.dataTransfer.setData('text/plain1', productid);
      event.dataTransfer.setData('text/plain2', sprintid);
    }
    setDragId(Number(id));
  };

  const handleDragEnd = () => {
    setDragId(0);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const itemId = event.dataTransfer.getData('text/plain');
    const productid = event.dataTransfer.getData('text/plain1');
    const sprintid = event.dataTransfer.getData('text/plain2');

    const targetElement = event.currentTarget as HTMLDivElement;
    const { statustype, statusid } = targetElement.dataset;

    // console.log(
    //   'itemId ',
    //   itemId,
    //   'dropped to ',
    //   statustype,
    //   ' with statusid ',
    //   statusid
    // );
    if (itemId && statusid && productid && sprintid)
      onDrop(itemId, statusid, productid, sprintid);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onDrop = (
    itemId: string,
    statusId: string,
    productid: string,
    sprintid: string
  ) => {
    console.log(itemId, ' dropped to ', statusId, productid, sprintid);
    updateUserStory(itemId, productid, sprintid, statusId);
  };

  return (
    <div>
      <div
        className="grid grid-cols-5 gap-4 userstory-continer-box"
        style={{ minHeight: '50vh', overflow: 'auto' }}
      >
        <div className="text-center border-x p-2">
          <span className="font-bold block mb-3">New</span>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            data-statustype={wiStatusMap.new.status}
            data-statusid={wiStatusMap.new.value}
          >
            {newStories.map((s) => (
              <div
                className={`bg-white border border-slate-200 rounded p-2 mb-2 cursor-pointer hover:bg-slate-50 hover:border-slate-300 ${dragId === s.userStoryId ? 'dragging' : ''}`}
                key={s.userStoryId}
                draggable
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                data-id={s.userStoryId}
                data-productid={s.productId}
                data-sprintid={s.sprintId}
                // data-status={s.status}
                // data-statusid={s.statusId}
              >
                <div className="text-center">{s.title}</div>
                <div className="flex justify-between mt-3">
                  <div>WI-{s.userStoryId}</div>
                  <div>
                    <span className="inline-block bg-slate-400 text-white rounded px-1">
                      {s.userStoryPoint}
                    </span>{' '}
                    &nbsp; {s.assignedToFname}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className="text-center border-x p-2"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          data-statustype={wiStatusMap.inProgress.status}
          data-statusid={wiStatusMap.inProgress.value}
        >
          <span className="font-bold block mb-3">In-Progress</span>
          {inProgressStories.map((s) => (
            <div
              className={`bg-white border-x border-y border-slate-200 rounded p-2 mb-2 cursor-pointer hover:bg-slate-50 hover:border-slate-300 ${dragId === s.userStoryId ? 'dragging' : ''}`}
              key={s.userStoryId}
              draggable
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              data-id={s.userStoryId}
              data-productid={s.productId}
              data-sprintid={s.sprintId}
              //   data-status={s.status}
              //   data-statusid={s.statusId}
            >
              <div className="text-center">{s.title}</div>
              <div className="flex justify-between mt-3">
                <div>w-{s.userStoryId}</div>
                <div>
                  <span className="inline-block bg-slate-400 text-white rounded px-1">
                    {s.userStoryPoint}
                  </span>{' '}
                  &nbsp; {s.assignedToFname}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          className="text-center border-x"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          data-statustype={wiStatusMap.reviewInProgress.status}
          data-statusid={wiStatusMap.reviewInProgress.value}
        >
          <span className="font-bold block mb-3">Review in-progresss</span>
        </div>
        <div
          className="text-center border-x"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          data-statustype={wiStatusMap.qaInProgress.status}
          data-statusid={wiStatusMap.qaInProgress.value}
        >
          <span className="font-bold block mb-3">QA in-progress</span>
        </div>
        <div
          className="text-center border-x"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          data-statustype={wiStatusMap.closed.status}
          data-statusid={wiStatusMap.closed.value}
        >
          <span className="font-bold block mb-3">Closed</span>
        </div>
      </div>
    </div>
  );
};

export default UserStoryBoardView;
