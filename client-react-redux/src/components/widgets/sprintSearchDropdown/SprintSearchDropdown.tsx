import React, { FC, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../appStore/hooks';
import { Select } from 'antd';
import {
  searchSprintAsync,
  springReducer,
  selectSprint,
} from '../../../slices/sprint/sprintSlice';
import { useDebounce } from '../../../hooks/debounce/debounce';
import * as Types from '../../../utils/types/types';

interface SprintSearchPropsInterface {}

const SprintSearchDropdown: FC<SprintSearchPropsInterface> = ({}) => {
  const dispatch = useAppDispatch();
  const sprintState = useAppSelector(springReducer);

  const [sprintSearchPattern, setSprintSearchPattern] = useState<string>('');

  const debouncedUserSearchString = useDebounce(sprintSearchPattern, 500);

  useEffect(() => {
    if (debouncedUserSearchString) {
      dispatch(searchSprintAsync(debouncedUserSearchString));
    }
  }, [debouncedUserSearchString]);

  const onChange = (value: number) => {
    const sprint = sprintState.sprint.sprintList.find(
      (s) => s.sprintId === value
    );
    if (sprint) {
      dispatch(selectSprint(sprint));
    }
  };

  const onSprintSearch = (value: string) => {
    setSprintSearchPattern(value);
  };

  const clear = () => {
    setSprintSearchPattern('');
  };

  const springOptions = sprintState.sprint.sprintList.map((s) => ({
    value: s.sprintId,
    label: `${s.sprintName}`,
  }));

  return (
    <div className="w-64">
      <Select
        onChange={onChange}
        onSearch={onSprintSearch}
        onBlur={clear}
        variant="outlined"
        showSearch
        allowClear
        autoClearSearchValue
        loading={sprintState.sprint.status === 'loading'}
        className="w-full"
        placeholder="Search Sprint"
        optionFilterProp="label"
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? '')
            .toLowerCase()
            .localeCompare((optionB?.label ?? '').toLowerCase())
        }
        options={springOptions}
      />
    </div>
  );
};

export default SprintSearchDropdown;
