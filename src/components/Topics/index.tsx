import { FunctionComponent, useState } from 'react';

interface Iprops {
  topic: String;
  description?: String;
  due: String;
}

const Topic: FunctionComponent<Iprops> = (topics) => {
  const [open, setOpen] = useState<Boolean>(false);
  const { topic, description, due } = topics;

  return (
    <div>
      <h2>
        {topic}
        <button
          onClick={() => {
            setOpen(!open);
          }}
        >
          ^
        </button>
      </h2>
      {open && (
        <>
          <p>{description}</p>
          <p>{due}</p>
        </>
      )}
    </div>
  );
};

export default Topic;
