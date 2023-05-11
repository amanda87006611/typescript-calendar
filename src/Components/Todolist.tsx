import { useState } from "react";

import styles from "./style/todo.module.scss";
// import axios from "axios";

import TextField from "./Utility/TextField";
import Calendar from "./Utility/Calendar";

import { BsPlusSquare } from "react-icons/bs";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import { Configuration, OpenAIApi } from "openai";

const Todolist = () => {
  const [todoValue, setTodoValue] = useState<any>("");
  const [response, setResponse] = useState<any>("");

  // const [lineNotifyPosts, setLineNotifyPosts] = useState([]);

  const configuration = new Configuration({
    organization: "org-oDyMYE9LdXp6PMWOetgRsC2Q",
    apiKey: "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",
  });

  // useEffect(() => {
  //   const NotifyPost = async () => {
  //     try {
  //       const settings = {
  //         method: "POST",
  //         url: "https://notify-api.line.me/api/notify",
  //         headers: {
  //           "Content-Type": "application/x-www-form-urlencoded",
  //           Authorization: "Bearer CCPYpJTNg38X7o97eqmMsjaLckFjq60LhcPIEFUh59b",
  //         },
  //         data: { message: "測試提醒。" },
  //       };
  //       const res = await axios(settings);
  //       return res;
  //     } catch (err) {
  //       console.log("errRes", err);
  //     }
  //   };
  //   NotifyPost();
  // }, []);

  //test props (events)
  let events = [
    {
      date: new Date("Mon May 08 2023 00:00:00 GMT+0800 (台北標準時間)"),
      events: [
        {
          start_time: new Date(
            "Mon May 08 2023 15:00:05 GMT+0800 (台北標準時間)"
          ),
          end_time: new Date(
            "Mon May 08 2023 18:00:05 GMT+0800 (台北標準時間)"
          ),
          title: "學習REACT TYPESCRIPT",
          category: "Task",
        },
        {
          start_time: new Date(
            "Mon May 08 2023 15:00:05 GMT+0800 (台北標準時間)"
          ),
          end_time: new Date(
            "Mon May 08 2023 18:00:05 GMT+0800 (台北標準時間)"
          ),
          title: "顏色標題測試",
          category: "Travel",
        },
      ],
    },
    {
      date: new Date("Mon May 10 2023 00:00:00 GMT+0800 (台北標準時間)"),
      events: [
        {
          start_time: new Date(
            "Mon May 08 2023 08:00:05 GMT+0800 (台北標準時間)"
          ),
          end_time: new Date(
            "Mon May 08 2023 18:00:05 GMT+0800 (台北標準時間)"
          ),
          title: "會議",
          category: "Task",
        },
      ],
    },
  ];

  let categories = [
    { title: "Task", color: "#ff766e" },
    { title: "Travel", color: "#fc0" },
  ];

  const handleSendApi: () => void = async () => {
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: todoValue,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
      stop: [" Human:", " AI:"],
    });

    setResponse(response?.data?.choices[0]?.text);
  };

  return (
    <div className={styles.todoOuter}>
      <div className={styles.todoLeft}>
        <div className={styles.box}>
          <div className={styles.boxTitle}>Calender Categories</div>
          {categories?.map((item) => (
            <div className={styles.category}>
              <div
                className={styles.square}
                style={{ background: `${item.color}` }}></div>
              <span>{item.title}</span>
            </div>
          ))}
        </div>
        <div className={styles.box}>
          <div className={styles.boxTitle}>TODOs of This Week</div>
          <div className={styles.checkboxOuter}>
            <div className={styles.checkbox}>
              <MdCheckBoxOutlineBlank />
              <span>Design</span>
            </div>
            <div className={styles.checkbox}>
              <MdCheckBox />
              <span>Study</span>
            </div>
            <div className={styles.todoBtn}>
              <BsPlusSquare />
              <span>Todo</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.todoRight}>
        <TextField
          value={todoValue}
          type=''
          onChange={(e) => setTodoValue(e.target.value)}
          onBlur={() => function () {}}
          onKeyPress={() => function () {}}
          placeholder=''
          error={false}
          disabled={false}
        />
        <button onClick={() => handleSendApi()}>送出</button>
        <span>{response}</span>
        <Calendar events={events} categories={categories} />
      </div>
    </div>
  );
};

export default Todolist;
