import { RadioGroup } from '@headlessui/react';
import { useTaskContext } from '../context/TaskContext';
import { TaskFilter as FilterType } from '../types/Task';
import { useCallback } from 'react';
import { debounce } from 'lodash';

const TaskFilter: React.FC = () => {
  const { state, dispatch } = useTaskContext();

  const debouncedDispatch = useCallback(
    debounce((value: FilterType) => {
      dispatch({ type: 'SET_FILTER', payload: value });
    }, 300),
    []
  );

  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All Tasks' },
    { value: 'incomplete', label: 'Incomplete' },
    { value: 'complete', label: 'Complete' }
  ];

  return (
    <RadioGroup
      value={state.filter}
      onChange={(value: FilterType) => debouncedDispatch(value)}
      className="flex space-x-2"
    >
      {filters.map(filter => (
        <RadioGroup.Option
          key={filter.value}
          value={filter.value}
          className={({ checked }) =>
            `btn cursor-pointer ${
              checked
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`
          }
        >
          {({ checked }) => (
            <span className={checked ? 'font-medium' : ''}>{filter.label}</span>
          )}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
};

export default TaskFilter; 