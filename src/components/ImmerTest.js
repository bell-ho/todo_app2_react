import React, { useCallback, useRef, useState } from 'react';
import produce from 'immer';

const ImmerTest = () => {
  const nextId = useRef(1);
  const input1 = useRef(null);

  const [form, setForm] = useState({ name: '', username: '' });
  const [data, setData] = useState({
    arr: [],
    uselessValue: null,
  });
  // input 수정 함수

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(
      produce((draft) => {
        draft[name] = value;
      }),
    );
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const info = {
        id: nextId.current,
        username: form.name,
        name: form.username,
      };

      setData(
        produce((draft) => {
          draft.arr.push(info);
        }),
      );

      setForm({
        name: '',
        username: '',
      });

      nextId.current += 1;
      input1.current.focus();
    },
    [form.name, form.username],
  );

  const onRemove = useCallback((id) => {
    setData(
      produce((draft) => {
        draft.arr.splice(
          draft.arr.findIndex((info) => info.id === id),
          1,
        );
      }),
    );
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          ref={input1}
          name="username"
          placeholder="아이디"
          value={form.username}
          onChange={onChange}
        />
        <input
          name="name"
          placeholder="이름"
          value={form.name}
          onChange={onChange}
        />
        <button type="submit">등록</button>
      </form>
      <div>
        <ul>
          {data.arr.map((info) => (
            <li key={info.id} onClick={() => onRemove(info.id)}>
              {info.username} ({info.name})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ImmerTest;
